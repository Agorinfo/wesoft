import type { MetadataRoute } from "next";
import { fallbackPages } from "@/lib/fallback-content";
import { absoluteUrl } from "@/lib/seo";
import { getArticles } from "@/lib/strapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/articles"), changeFrequency: "weekly", priority: 0.9 },
    ...Object.keys(fallbackPages).map((slug) => ({
      url: absoluteUrl(`/${slug}`),
      changeFrequency: "monthly" as const,
      priority: slug === "contact" ? 0.8 : 0.3,
    })),
  ];

  const articles = await getArticles(100);
  return [
    ...staticPages,
    ...articles.map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: article.publishedDate ? new Date(article.publishedDate) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
