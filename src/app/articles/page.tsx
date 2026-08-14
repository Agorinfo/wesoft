import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {SectionRenderer} from "@/components/SectionRenderer";
import {getPage} from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("articles");
  return {
    title: page?.seo?.metaTitle || page?.title || "Ressources",
    description: page?.seo?.metaDescription || page?.excerpt || "Les actualités et ressources WeSoft.",
  };
}

export default async function ArticlesPage() {
  const page = await getPage("articles");
  if (!page) notFound();
  return <SectionRenderer blocks={page.blocks}/>;
}
