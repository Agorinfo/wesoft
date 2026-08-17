import Link from "next/link";
import { ResourcesGrid } from "@/components/ResourcesGrid";
import { getArticles } from "@/lib/strapi";
import type { PageBlock } from "@/types/content";
import { CONTENT, sectionClass, SectionHeading, text } from "./shared";

export async function ArticleListSection({ block }: { block: PageBlock }) {
  const articles = await getArticles(Number(block.limit) || 6);
  return <section className={sectionClass(block)}><div className={CONTENT}>
    <nav className="mb-9 flex items-center gap-2 text-xs text-(--muted)" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span>›</span><strong className="font-semibold text-(--blue)">Ressources</strong></nav>
    <SectionHeading eyebrow={text(block.eyebrow)} title={text(block.title)} body={text(block.text)} />
    <ResourcesGrid articles={articles} />
  </div></section>;
}
