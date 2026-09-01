import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/media";
import type { Article } from "@/types/content";

export function ArticleCard({ article }: { article: Article }) {
  const image = mediaUrl(article.cover?.url);
  const date = article.publishedDate ? new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(article.publishedDate)) : null;
  const type = article.resourceType === "temoignage" ? "TÉMOIGNAGE" : article.resourceType === "video" ? "VIDÉO" : "ARTICLE";

  return <article className="flex h-full flex-col overflow-hidden rounded-[4px] border-2 border-[var(--line)] bg-white shadow-[0_5px_15px_rgba(18,50,85,.06)] transition hover:-translate-y-[5px] hover:shadow-[var(--shadow)]">
    {image ? <div className="relative h-[210px]"><Image className="object-cover" src={image} alt={article.cover?.alternativeText || article.title} fill sizes="(max-width: 760px) 100vw, 33vw" /></div> : <div className="h-[210px] bg-[linear-gradient(135deg,#cfe7ff,#e8e7ff)]" />}
    <div className="flex flex-1 flex-col p-[18px]">
      <div className="flex items-center justify-between"><span className="bg-[#e8f3ff] px-[7px] py-1 text-sm font-extrabold text-[var(--blue)]">{type}</span>{date && <time className="text-xs text-[var(--muted)]">{date}</time>}</div>
      <h2 className="mb-2.5 mt-[15px] font-[Hanken] text-2xl font-bold leading-[1.2]">{article.title}</h2>
      <p className="mb-6 min-h-[60px] text-base leading-[1.55] text-[var(--muted)]">{article.excerpt}</p>
      <Link className="mt-auto flex min-h-[46px] items-center justify-center rounded-[4px] border-2 border-[var(--blue)] px-4 text-base font-semibold text-[var(--blue)]" href={`/articles/${article.slug}`}>{article.buttonLabel || (article.resourceType === "temoignage" ? "Lire le témoignage" : "Lire l’article")}</Link>
    </div>
  </article>;
}
