export const LANDING_MEDIA_SLOTS = [
  "hero",
  "companion",
  "screening",
  "getting-started",
  "faq",
  "closing",
] as const;

export type LandingMediaSlot = (typeof LANDING_MEDIA_SLOTS)[number];

export interface LandingMediaAsset {
  id: string;
  video: string;
  poster: string;
  objectPosition: {
    desktop: string;
    mobile: string;
  };
}

export const LANDING_MEDIA: readonly LandingMediaAsset[] = [
  {
    id: "vid-1",
    video: "/media/videos/landing/demo/vid-1.mp4",
    poster: "/media/posters/landing/demo/vid-1.jpg",
    objectPosition: { desktop: "50% 45%", mobile: "45% 45%" },
  },
  {
    id: "vid-2",
    video: "/media/videos/landing/demo/vid-2.mp4",
    poster: "/media/posters/landing/demo/vid-2.jpg",
    objectPosition: { desktop: "55% 50%", mobile: "55% 45%" },
  },
  {
    id: "vid-4",
    video: "/media/videos/landing/demo/vid-4.mp4",
    poster: "/media/posters/landing/demo/vid-4.jpg",
    objectPosition: { desktop: "50% 45%", mobile: "50% 45%" },
  },
  {
    id: "vid-5",
    video: "/media/videos/landing/demo/vid-5.mp4",
    poster: "/media/posters/landing/demo/vid-5.jpg",
    objectPosition: { desktop: "50% 45%", mobile: "45% 45%" },
  },
  {
    id: "vid-6",
    video: "/media/videos/landing/demo/vid-6.mp4",
    poster: "/media/posters/landing/demo/vid-6.jpg",
    objectPosition: { desktop: "50% 42%", mobile: "45% 40%" },
  },
  {
    id: "vid-7",
    video: "/media/videos/landing/demo/vid-7.mp4",
    poster: "/media/posters/landing/demo/vid-7.jpg",
    objectPosition: { desktop: "55% 42%", mobile: "55% 40%" },
  },
];

export function shuffleLandingMedia<T>(
  items: readonly T[],
  random: () => number = Math.random,
): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}
