import { ImageResponse } from "next/og";
import { OgImageCard } from "@/lib/og-image";
import { getPage } from "@/lib/strapi";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ressources WeSoft";

export default async function Image() {
  const page = await getPage("articles");
  return new ImageResponse(OgImageCard({ title: page?.seo?.metaTitle || page?.title || "Ressources", eyebrow: "Actualités & expertise", variant: "resources" }), size);
}
