"use client";

import { useEffect, useRef } from "react";

export function LandingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    const root = document.querySelector<HTMLElement>(".landing-root");

    let active = false;
    let initialized = false;
    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;

    function canEnable() {
      return (
        finePointer.matches && !reducedMotion.matches && !forcedColors.matches
      );
    }

    function showCursor() {
      cursorRef.current?.classList.add("is-visible");
    }

    function hideCursor() {
      cursorRef.current?.classList.remove("is-visible");
    }

    function moveCursor(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!initialized) {
        ringX = targetX;
        ringY = targetY;
        initialized = true;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      showCursor();

      if (!frameId) {
        frameId = window.requestAnimationFrame(followPointer);
      }
    }

    function followPointer() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (
        Math.abs(targetX - ringX) > 0.1 ||
        Math.abs(targetY - ringY) > 0.1
      ) {
        frameId = window.requestAnimationFrame(followPointer);
      } else {
        frameId = 0;
      }
    }

    function handlePointerOver(event: PointerEvent) {
      if (!active) return;
      const target =
        event.target instanceof Element
          ? event.target.closest(
              "a, button, summary, label, [role='button']",
            )
          : null;
      cursorRef.current?.classList.toggle("is-hovering", Boolean(target));
    }

    function handlePointerDown() {
      cursorRef.current?.classList.add("is-pressed");
    }

    function handlePointerUp() {
      cursorRef.current?.classList.remove("is-pressed");
    }

    function handleVisibility() {
      if (document.visibilityState !== "visible") {
        initialized = false;
        hideCursor();
      }
    }

    function removeListeners() {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
      document.documentElement.removeEventListener("pointerenter", showCursor);
      document.removeEventListener("visibilitychange", handleVisibility);
    }

    function applyPreference() {
      const next = canEnable();
      if (next === active) return;

      active = next;
      root?.classList.toggle("landing-cursor-active", next);

      if (!next) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        initialized = false;
        hideCursor();
        cursorRef.current?.classList.remove("is-hovering", "is-pressed");
        removeListeners();
        return;
      }

      window.addEventListener("pointermove", moveCursor, { passive: true });
      window.addEventListener("pointerover", handlePointerOver, {
        passive: true,
      });
      window.addEventListener("pointerdown", handlePointerDown, {
        passive: true,
      });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
      document.documentElement.addEventListener("pointerleave", hideCursor);
      document.documentElement.addEventListener("pointerenter", showCursor);
      document.addEventListener("visibilitychange", handleVisibility);
    }

    applyPreference();
    finePointer.addEventListener("change", applyPreference);
    reducedMotion.addEventListener("change", applyPreference);
    forcedColors.addEventListener("change", applyPreference);

    return () => {
      finePointer.removeEventListener("change", applyPreference);
      reducedMotion.removeEventListener("change", applyPreference);
      forcedColors.removeEventListener("change", applyPreference);
      removeListeners();
      window.cancelAnimationFrame(frameId);
      root?.classList.remove("landing-cursor-active");
    };
  }, []);

  return (
    <div ref={cursorRef} className="landing-cursor" aria-hidden="true">
      <span ref={ringRef} className="landing-cursor-ring" />
      <span ref={dotRef} className="landing-cursor-dot" />
    </div>
  );
}
