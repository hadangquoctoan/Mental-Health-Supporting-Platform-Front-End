"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#dong-hanh", label: "Cách sử dụng" },
  { href: "#sang-loc", label: "Sàng lọc" },
  { href: "#cau-hoi", label: "Câu hỏi thường gặp" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = headerRef.current;
    if (!nav) return;
    const hero = document.querySelector<HTMLElement>(".landing-hero");
    let frame = 0;

    const update = () => {
      frame = 0;
      const navBottom = nav.getBoundingClientRect().bottom;
      const heroBottom = hero
        ? hero.getBoundingClientRect().bottom
        : window.scrollY > 32
          ? 0
          : Number.POSITIVE_INFINITY;
      setScrolled(heroBottom <= navBottom);
    };

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function onOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");

    function onDesktopChange() {
      if (!desktop.matches) return;
      if (panelRef.current?.contains(document.activeElement)) {
        headerRef.current
          ?.querySelector<HTMLElement>(
            ".landing-desktop-nav a, .landing-nav-register, .landing-wordmark",
          )
          ?.focus();
      }
      setOpen(false);
    }

    desktop.addEventListener("change", onDesktopChange);
    return () => desktop.removeEventListener("change", onDesktopChange);
  }, []);

  return (
    <header
      className={scrolled ? "landing-nav is-scrolled" : "landing-nav"}
      ref={headerRef}
    >
      <div className="landing-nav-inner">
        <Link
          href="/"
          className="landing-wordmark"
          aria-label="Equilibra, trang chủ"
        >
          Equilibra
          <span className="landing-brand-dot" aria-hidden="true" />
        </Link>
        <nav className="landing-desktop-nav" aria-label="Điều hướng chính">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="landing-nav-actions">
          <Link href="/login" className="landing-nav-login">
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="landing-btn landing-btn-primary landing-nav-register"
          >
            Đăng ký
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="landing-menu-toggle"
            aria-expanded={open}
            aria-controls="landing-mobile-menu"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <nav
        id="landing-mobile-menu"
        ref={panelRef}
        className={
          open ? "landing-mobile-nav is-open" : "landing-mobile-nav"
        }
        aria-label="Điều hướng trên điện thoại"
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
      >
        <div className="landing-mobile-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="landing-mobile-register"
            onClick={() => setOpen(false)}
          >
            Đăng ký
          </Link>
          <a href="tel:115">Hỗ trợ khẩn cấp: gọi 115</a>
        </div>
      </nav>
    </header>
  );
}
