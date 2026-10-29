"use client";

import { HeartHandshake, History, NotebookPen } from "lucide-react";
import { useEffect, useRef } from "react";

const ICONS = {
  notebook: NotebookPen,
  history: History,
  heart: HeartHandshake,
} as const;

type IconName = keyof typeof ICONS;
type Animation = "draw" | "float" | "pulse";

interface LandingAnimatedIconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  animation?: Animation;
  className?: string;
}

export function LandingAnimatedIcon({
  name,
  size = 27,
  strokeWidth = 1.5,
  animation = "draw",
  className,
}: LandingAnimatedIconProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const Icon = ICONS[name];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={[
        "landing-animated-icon",
        `landing-animated-icon-${animation}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={strokeWidth} />
    </span>
  );
}
