import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/login", "/register", "/dashboard", "/screening", "/check-in",
        "/doctor", "/admin", "/api/",
      ],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
  };
}
