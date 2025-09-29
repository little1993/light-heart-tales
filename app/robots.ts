import type { MetadataRoute } from "next";
import { canonicalUrl, siteUrl } from "@/src/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: canonicalUrl("/sitemap.xml"),
    host: siteUrl
  };
}
