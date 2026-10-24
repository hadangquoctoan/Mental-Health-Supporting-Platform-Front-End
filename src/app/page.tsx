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
      url: new URL("/images/landing-forest.webp", siteUrl).href,
      width: 1200,
      height: 799,
      alt: "Ánh nắng xuyên qua tán rừng xanh, hình ảnh của Equilibra",
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
