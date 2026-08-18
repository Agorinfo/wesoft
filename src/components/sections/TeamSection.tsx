import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import type { PageBlock, TeamMember } from "@/types/content";
import { CONTENT, list, sectionClass, SectionHeading, text } from "./shared";

const gridLayouts = {
  1: "grid-cols-1",
  2: "grid-cols-2 max-[1100px]:grid-cols-2 max-[800px]:grid-cols-2",
  3: "grid-cols-3 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2",
  4: "grid-cols-4 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2",
} as const;

export function TeamSection({ block }: { block: PageBlock }) {
  const members = list<TeamMember>(block.members);
  const columns = Math.min(Math.max(members.length, 1), 4) as keyof typeof gridLayouts;

  return <section id={text(block.anchorId) || "equipe"} className={`${sectionClass(block)} scroll-mt-24`}><div className={CONTENT}>
    <SectionHeading className="max-w-[672px] [&_h2]:text-[var(--blue)]" title={text(block.title)} body={text(block.text)} />
    <div className={`grid ${gridLayouts[columns]} gap-6 max-[560px]:grid-cols-1`}>{members.map((member, index) => <article key={member.id || member.name || index}>
      {member.photo?.url && <div className="relative h-[385px] overflow-hidden rounded-lg border border-[var(--line)] max-[1100px]:h-[330px]"><Image className="object-cover" src={mediaUrl(member.photo.url)} alt={member.photo.alternativeText || member.name} fill sizes="(max-width: 560px) 100vw, (max-width: 800px) 50vw, 25vw" /></div>}
      <h3 className="mb-1 mt-4 font-[Hanken] text-2xl font-bold text-[var(--blue)]">{member.name}</h3>
      <span className="text-sm font-semibold tracking-[.05em]">{member.role}</span>
      <p className="text-base leading-[1.55] text-[var(--muted)]">{member.biography}</p>
    </article>)}</div>
  </div></section>;
}
