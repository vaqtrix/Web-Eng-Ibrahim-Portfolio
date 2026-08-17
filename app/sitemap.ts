import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { publishedProjects } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, priority: 1 },
    { url: `${siteUrl}/ventures`, lastModified: now, priority: 0.8 },
    { url: `${siteUrl}/resume`, lastModified: now, priority: 0.6 },
    ...publishedProjects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
