import { ImageResponse } from "next/og";
import { OgImageCard } from "@/lib/og-image";
import { getArticle } from "@/lib/strapi";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Article WeSoft";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const type = article?.resourceType === "video" ? "Vidéo" : article?.resourceType === "temoignage" ? "Témoignage" : "Article";
  return new ImageResponse(OgImageCard({ title: article?.seo?.metaTitle || article?.title || "Ressources WeSoft", eyebrow: type, variant: "article" }), size);
}
