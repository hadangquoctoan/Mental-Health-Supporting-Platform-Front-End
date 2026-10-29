import type { Metadata } from "next";
import { LandingPage } from "@/components/features/landing/LandingPage";
import "./landing.css";

import {
  getSiteUrl,
  LANDING_DESCRIPTION,
  LANDING_TITLE,
  SITE_NAME,
} from "@/lib/site-config";

const siteUrl = getSiteUrl();
const socialImage = siteUrl
  ? {
      url: new URL("/media/posters/landing/demo/vid-2.jpg", siteUrl).href,
      width: 1920,
      height: 1080,
      alt: "Người chạy bộ trên bãi biển lúc hoàng hôn, hình ảnh của Equilibra",
    }
  : null;

export const metadata: Metadata = {
  title: LANDING_TITLE,
  description: LANDING_DESCRIPTION,
  applicationName: SITE_NAME,
  ...(siteUrl ? { alternates: { canonical: siteUrl.href } } : {}),
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    ...(siteUrl ? { url: siteUrl.href } : {}),
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    ...(socialImage ? { images: [socialImage.url] } : {}),
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    inLanguage: "vi-VN",
    ...(siteUrl ? { url: siteUrl.href } : {}),
    about: [
      { "@type": "Thing", name: "Theo dõi cảm xúc" },
      { "@type": "Thing", name: "Sàng lọc sức khỏe tâm thần" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPage />
    </>
  );
}
