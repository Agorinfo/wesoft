import { ImageResponse } from "next/og";
import { fallbackPages, mergePageWithFallback } from "@/lib/fallback-content";
import { OgImageCard, type OgVariant } from "@/lib/og-image";
import { getPage } from "@/lib/strapi";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "WeSoft, éditeurs de logiciels verticaux";

const variants: Record<string, { eyebrow: string; variant: OgVariant }> = {
  contact: { eyebrow: "Nous contacter", variant: "contact" },
  "mentions-legales": { eyebrow: "Informations légales", variant: "legal" },
  "politique-de-confidentialite": { eyebrow: "Vos données", variant: "legal" },
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmsPage = await getPage(slug);
  const page = fallbackPages[slug] ? mergePageWithFallback(cmsPage, fallbackPages[slug]) : cmsPage;
  const settings = variants[slug] || { eyebrow: "WeSoft", variant: "page" as const };
  return new ImageResponse(OgImageCard({ title: page?.seo?.metaTitle || page?.title || "WeSoft", ...settings }), size);
}
