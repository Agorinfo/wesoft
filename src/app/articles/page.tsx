import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {SectionRenderer} from "@/components/SectionRenderer";
import {PageBreadcrumb} from "@/components/PageBreadcrumb";
import {getPage} from "@/lib/strapi";
import { mediaUrl } from "@/lib/media";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("articles");
  const title = page?.seo?.metaTitle || page?.title || "Ressources";
  const description = page?.seo?.metaDescription || page?.excerpt || "Les actualités et ressources WeSoft.";
  const image = page?.seo?.shareImage?.url ? mediaUrl(page.seo.shareImage.url) : "/articles/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: "/articles" },
    openGraph: { type: "website", url: "/articles", title, description, images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ArticlesPage() {
  const page = await getPage("articles");
  if (!page) notFound();
  const hero = page.blocks?.find((block) => block.__component === "sections.hero");
  return <>{hero && <PageBreadcrumb current={page.title} background={typeof hero.background === "string" ? hero.background : undefined}/>}<SectionRenderer blocks={page.blocks} hasBreadcrumb={Boolean(hero)} removeHeroBottomPadding/></>;
}
