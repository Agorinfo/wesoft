"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/types/content";

const filters = [
  ["all", "Tous"],
  ["article", "Article"],
  ["temoignage", "Témoignage"],
  ["video", "Vidéo"],
] as const;

export function ResourcesGrid({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => articles.filter((article) => {
    const matchesType = filter === "all" || (article.resourceType || "article") === filter;
    const haystack = `${article.title} ${article.excerpt || ""} ${article.category || ""}`.toLowerCase();
    return matchesType && haystack.includes(query.trim().toLowerCase());
  }), [articles, filter, query]);

  return <>
    <div className="mb-7 flex items-center justify-between gap-6 max-[600px]:flex-col max-[600px]:items-stretch">
      <div className="flex gap-2 max-[600px]:overflow-x-auto" aria-label="Filtrer les ressources">{filters.map(([value, label]) => <button key={value} type="button" className={`rounded border-2 px-[18px] py-[9px] text-sm font-semibold ${filter === value ? "border-[var(--blue)] bg-[var(--blue)] text-white" : "border-[var(--line)] bg-white text-[var(--muted)]"}`} onClick={() => setFilter(value)}>{label}</button>)}</div>
      <label className="flex h-10 items-center gap-2 border-2 border-[var(--line)] bg-white px-3"><Search size={17} aria-hidden /><span className="sr-only">Rechercher</span><input className="min-w-[220px] border-0 outline-none max-[600px]:w-full max-[600px]:min-w-0" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un article…" /></label>
    </div>
    <div className="grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">{visible.map((article) => <ArticleCard article={article} key={article.id} />)}</div>
    {!visible.length && <p className="rounded-lg bg-[var(--sky)] p-[50px] text-center text-[var(--muted)]">Aucune ressource ne correspond à votre recherche.</p>}
  </>;
}
