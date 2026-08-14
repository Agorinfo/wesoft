import { ResourcesGrid } from "@/components/ResourcesGrid";
import { getArticles } from "@/lib/strapi";
import type { PageBlock } from "@/types/content";
import { CONTENT, sectionClass, SectionHeading, text } from "./shared";

export async function ArticleListSection({ block }: { block: PageBlock }) {
  const articles = await getArticles(Number(block.limit) || 6);
  return <section className={sectionClass(block)}><div className={CONTENT}>
    <SectionHeading eyebrow={text(block.eyebrow)} title={text(block.title)} body={text(block.text)} />
    <ResourcesGrid articles={articles} />
  </div></section>;
}
