"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LandingScrollEnhance() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".landing-root");
    if (!root) return;
    const html = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const headings = Array.from(
      root.querySelectorAll<HTMLElement>("main section h2"),
    );
    let stopMotion = () => {};

    function configureMotion() {
      stopMotion();
      if (preference.matches) return;

      const lenis = new Lenis({
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: false,
      });
      html.classList.add("landing-smooth");
      let rafId = 0;
      function frame(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(frame);
      }
      rafId = requestAnimationFrame(frame);

      function onAnchorClick(event: MouseEvent) {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        if (!(event.target instanceof Element)) return;
        const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        let id: string;
        try {
          id = decodeURIComponent(href.slice(1));
        } catch {
          return;
        }
        const target = document.getElementById(id);
        if (!target || !root?.contains(target)) return;
        event.preventDefault();
        const nav = root.querySelector<HTMLElement>(".landing-nav");
        const navTop = nav ? parseFloat(getComputedStyle(nav).top) : 0;
        lenis.scrollTo(target, {
          offset: -((nav?.offsetHeight ?? 76) + navTop + 16),
          duration: 0.85,
          onComplete: () => {
            if (window.location.hash !== href)
              history.pushState(null, "", href);
            if (!target.hasAttribute("tabindex"))
              target.setAttribute("tabindex", "-1");
            window.setTimeout(() => {
              target.focus({ preventScroll: true });
            }, 0);
          },
        });
      }
      root?.addEventListener("click", onAnchorClick);

      const observer =
        typeof IntersectionObserver === "undefined"
          ? null
          : new IntersectionObserver(
              (entries) => {
                for (const entry of entries) {
                  if (!entry.isIntersecting) continue;
                  entry.target.classList.add("is-in");
                  observer?.unobserve(entry.target);
                }
              },
              { threshold: 0.15 },
            );
      if (observer)
        headings.forEach((heading, index) => {
          if (heading.getBoundingClientRect().top <= window.innerHeight) return;
          heading.classList.add("landing-reveal");
          if (index % 2 === 1)
            heading.classList.add("landing-reveal-horizontal");
          observer.observe(heading);
        });

      stopMotion = () => {
        cancelAnimationFrame(rafId);
        observer?.disconnect();
        root?.removeEventListener("click", onAnchorClick);
        lenis.destroy();
        html.classList.remove("landing-smooth");
        headings.forEach((heading) =>
          heading.classList.remove(
            "landing-reveal",
            "landing-reveal-horizontal",
            "is-in",
          ),
        );
      };
    }

    configureMotion();
    preference.addEventListener("change", configureMotion);
    return () => {
      preference.removeEventListener("change", configureMotion);
      stopMotion();
    };
  }, []);

  return null;
}
