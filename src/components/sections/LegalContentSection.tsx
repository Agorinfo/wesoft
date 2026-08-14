import { Fragment } from "react";
import Link from "next/link";
import type { LegalSection, PageBlock } from "@/types/content";
import { backgroundClass, CONTENT, list, text } from "./shared";

export function LegalContentSection({ block }: { block: PageBlock }) {
  const sections = list<LegalSection>(block.sections);
  return <Fragment>
    <section className="bg-white py-20"><div className={CONTENT}>
      <nav className="mb-5 flex items-center gap-2 text-xs text-[var(--muted)]"><Link href="/">Accueil</Link><span>›</span><strong className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-[var(--blue)]">{text(block.title)}</strong></nav>
      <h1 className="m-0 mb-5 font-[Hanken] text-[42px] font-extrabold leading-[1.2] text-[var(--blue)] max-[800px]:text-[38px]">{text(block.title)}</h1><p className="max-w-[680px] leading-[1.6] text-[var(--muted)]">{text(block.text)}</p>
    </div></section>
    <section className={`pb-20 pt-20 ${backgroundClass(block)}`}><div className={`${CONTENT} grid grid-cols-[268px_1fr] items-start gap-9 max-[1000px]:grid-cols-[220px_1fr] max-[800px]:grid-cols-1`}>
      <aside className="sticky top-[125px] max-[800px]:static"><strong className="text-xs tracking-[.06em]">SOMMAIRE</strong><nav className="mt-6 grid border-l border-[#cfd9e3]">{sections.map((item) => <a className="px-4 py-[7px] text-sm text-[var(--muted)]" href={`#${item.anchorId}`} key={item.anchorId}>{item.title.replace(/^\d+\.\s*/, "")}</a>)}</nav></aside>
      <div className="grid gap-6">{sections.map((item) => <article id={item.anchorId} className="scroll-mt-[120px] rounded-md border border-[var(--line)] bg-white p-6 max-[600px]:p-5" key={item.anchorId}><span className="mb-5 block h-1 w-12 bg-[var(--blue)]" /><h2 className="mb-[22px] font-[Hanken] text-2xl font-bold">{item.title}</h2><div className="text-sm leading-[1.65] text-[#3f4650] [&_p]:mb-2.5 [&_p]:mt-0" dangerouslySetInnerHTML={{ __html: item.content }} /></article>)}</div>
    </div></section>
  </Fragment>;
}
