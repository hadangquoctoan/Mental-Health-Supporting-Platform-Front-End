"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LANDING_MEDIA,
  LANDING_MEDIA_SLOTS,
  shuffleLandingMedia,
  type LandingMediaAsset,
  type LandingMediaSlot,
} from "@/lib/media/catalog";

type VisibilityEntry = {
  ratio: number;
  near: boolean;
};

type MediaMapping = Record<LandingMediaSlot, LandingMediaAsset>;

const DEFAULT_MAPPING = Object.fromEntries(
  LANDING_MEDIA_SLOTS.map((slot, index) => [slot, LANDING_MEDIA[index]]),
) as MediaMapping;

interface LandingMediaContextValue {
  ready: boolean;
  systemMotionAllowed: boolean;
  getAsset: (slot: LandingMediaSlot) => LandingMediaAsset;
  shouldLoad: (slot: LandingMediaSlot) => boolean;
  isPlaying: (slot: LandingMediaSlot) => boolean;
  reportVisibility: (slot: LandingMediaSlot, ratio: number, near: boolean) => void;
}

const LandingMediaContext = createContext<LandingMediaContextValue | null>(null);

type NetworkInformation = {
  saveData?: boolean;
};

export function LandingMediaProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [mapping, setMapping] = useState<MediaMapping>(DEFAULT_MAPPING);
  const [systemMotionAllowed, setSystemMotionAllowed] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [visibility, setVisibility] = useState<
    Partial<Record<LandingMediaSlot, VisibilityEntry>>
  >({});

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    const saveData = Boolean(connection?.saveData);

    function applyMotionPreference() {
      setSystemMotionAllowed(!motionPreference.matches && !saveData);
    }

    function applyPageVisibility() {
      setPageVisible(document.visibilityState === "visible");
    }

    const frameId = window.requestAnimationFrame(() => {
      const shuffled = shuffleLandingMedia(LANDING_MEDIA);
      setMapping(
        Object.fromEntries(
          LANDING_MEDIA_SLOTS.map((slot, index) => [slot, shuffled[index]]),
        ) as MediaMapping,
      );
      setReady(true);
      applyMotionPreference();
      applyPageVisibility();
    });

    motionPreference.addEventListener("change", applyMotionPreference);
    document.addEventListener("visibilitychange", applyPageVisibility);

    return () => {
      window.cancelAnimationFrame(frameId);
      motionPreference.removeEventListener("change", applyMotionPreference);
      document.removeEventListener("visibilitychange", applyPageVisibility);
    };
  }, []);

  const reportVisibility = useCallback(
    (slot: LandingMediaSlot, ratio: number, near: boolean) => {
      setVisibility((previous) => {
        const roundedRatio = Math.round(ratio * 10) / 10;
        const current = previous[slot];
        if (current?.ratio === roundedRatio && current.near === near) {
          return previous;
        }
        return {
          ...previous,
          [slot]: { ratio: roundedRatio, near },
        };
      });
    },
    [],
  );

  const videoEnabled = ready && systemMotionAllowed && pageVisible;

  const activeSlots = useMemo(() => {
    if (!videoEnabled) return new Set<LandingMediaSlot>();

    return new Set(
      LANDING_MEDIA_SLOTS.filter(
        (slot) => (visibility[slot]?.ratio ?? 0) >= 0.1,
      )
        .sort(
          (first, second) =>
            (visibility[second]?.ratio ?? 0) -
            (visibility[first]?.ratio ?? 0),
        )
        .slice(0, 2),
    );
  }, [videoEnabled, visibility]);

  const value = useMemo<LandingMediaContextValue>(
    () => ({
      ready,
      systemMotionAllowed,
      getAsset: (slot) => mapping[slot],
      shouldLoad: (slot) =>
        ready &&
        systemMotionAllowed &&
        (slot === "hero" || Boolean(visibility[slot]?.near)),
      isPlaying: (slot) => activeSlots.has(slot),
      reportVisibility,
    }),
    [
      activeSlots,
      mapping,
      ready,
      reportVisibility,
      systemMotionAllowed,
      visibility,
    ],
  );

  return (
    <LandingMediaContext.Provider value={value}>
      {children}
    </LandingMediaContext.Provider>
  );
}

export function useLandingMedia(): LandingMediaContextValue {
  const context = useContext(LandingMediaContext);
  if (!context) {
    throw new Error("useLandingMedia must be used within LandingMediaProvider.");
  }
  return context;
}
