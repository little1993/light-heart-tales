import type { MetadataRoute } from "next";
import { StoryScene } from "@/components/Story";
import storyData from "@/src/story.json";
import { canonicalUrl } from "@/src/lib/seo";

const story = storyData as StoryScene[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl("/"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: canonicalUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: canonicalUrl("/parents-guide"),
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];

  const storyRoutes: MetadataRoute.Sitemap = story.map((scene) => ({
    url: scene.id === story[0]?.id ? canonicalUrl("/") : canonicalUrl(`/scene/${scene.id}`),
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: scene.id === story[0]?.id ? 0.9 : 0.8
  }));

  const mergedRoutes = [...staticRoutes, ...storyRoutes];
  const uniqueRoutes: MetadataRoute.Sitemap = [];
  const seenUrls: Record<string, true> = {};

  for (const route of mergedRoutes) {
    if (seenUrls[route.url]) {
      continue;
    }

    seenUrls[route.url] = true;
    uniqueRoutes.push(route);
  }

  return uniqueRoutes;
}
