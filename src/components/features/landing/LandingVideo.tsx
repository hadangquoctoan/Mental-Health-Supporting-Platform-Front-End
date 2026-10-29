"use client";

import { Play } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useLandingMedia } from "@/components/features/landing/LandingMediaProvider";
import type { LandingMediaSlot } from "@/lib/media/catalog";

type LandingVideoVariant = "hero" | "section" | "background";

interface LandingVideoProps {
  slot: LandingMediaSlot;
  variant?: LandingVideoVariant;
  className?: string;
}

export function LandingVideo({
  slot,
  variant = "section",
  className,
}: LandingVideoProps) {
  const {
    getAsset,
    shouldLoad,
    isPlaying,
    reportVisibility,
    systemMotionAllowed,
  } = useLandingMedia();
  const asset = getAsset(slot);
  const load = shouldLoad(slot);
  const playing = isPlaying(slot);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      reportVisibility(slot, 1, true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        reportVisibility(slot, entry.intersectionRatio, entry.isIntersecting);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "600px 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reportVisibility, slot]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!load) {
      video.pause();
      if (video.hasAttribute("src")) {
        video.removeAttribute("src");
        video.load();
      }
      return;
    }

    if (!playing) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    }
  }, [load, playing]);

  useEffect(
    () => () => {
      videoRef.current?.pause();
    },
    [],
  );

  function playManually() {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    }
  }

  const mediaStyle = {
    "--landing-media-position": asset.objectPosition.desktop,
    "--landing-media-position-mobile": asset.objectPosition.mobile,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={[
        "landing-video",
        `landing-video-${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot={slot}
      style={{
        ...mediaStyle,
        backgroundImage: `url(${asset.poster})`,
      }}
    >
      <video
        ref={videoRef}
        className={failed ? "is-failed" : undefined}
        src={load ? asset.video : undefined}
        poster={asset.poster}
        muted
        loop
        playsInline
        preload={load ? (slot === "hero" ? "auto" : "metadata") : "none"}
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onError={() => setFailed(true)}
        onLoadedData={() => setFailed(false)}
      />
      {slot === "hero" && blocked && systemMotionAllowed ? (
        <button
          type="button"
          className="landing-video-play"
          onClick={playManually}
        >
          <Play size={17} aria-hidden="true" />
          Phát video
        </button>
      ) : null}
    </div>
  );
}
