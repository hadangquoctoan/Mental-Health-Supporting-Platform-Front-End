"use client";

import { useEffect, useState } from "react";
import { BrandLoading } from "@/components/ui/BrandLoading";

export function LandingLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const image = document.querySelector<HTMLImageElement>(
      ".landing-hero-photo",
    );
    const imageReady = image?.decode().catch(() => {}) ?? Promise.resolve();
    Promise.all([document.fonts.ready, imageReady]).then(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) return;
    const content = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".landing-root > header, .landing-root > main, .landing-root > footer, .landing-skip-link",
      ),
    );
    const previous = content.map((element) => element.inert);
    content.forEach((element) => {
      element.inert = true;
    });
    return () => {
      content.forEach((element, index) => {
        element.inert = previous[index];
      });
    };
  }, [loading]);

  if (!loading) return null;
  return (
    <>
      <div className="landing-loading-overlay">
        <BrandLoading onContinue={() => setLoading(false)} />
      </div>
      <noscript>
        <style>
          {".landing-loading-overlay { display: none !important; }"}
        </style>
      </noscript>
    </>
  );
}
