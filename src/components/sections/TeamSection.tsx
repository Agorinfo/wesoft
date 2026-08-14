import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import type { PageBlock, TeamMember } from "@/types/content";
import { CONTENT, list, sectionClass, SectionHeading, text } from "./shared";

export function TeamSection({ block }: { block: PageBlock }) {
  return <section id={text(block.anchorId) || "equipe"} className={`${sectionClass(block)} scroll-mt-24`}><div className={CONTENT}>
    <SectionHeading className="max-w-[672px] [&_h2]:text-[var(--blue)]" title={text(block.title)} body={text(block.text)} />
    <div className="grid grid-cols-2 gap-6 max-[800px]:grid-cols-1">{list<TeamMember>(block.members).map((member, index) => <article key={member.id || member.name || index}>
      {member.photo?.url && <div className="relative h-[385px] overflow-hidden rounded-lg border border-[var(--line)]"><Image className="object-cover" src={mediaUrl(member.photo.url)} alt={member.photo.alternativeText || member.name} fill sizes="50vw" /></div>}
      <h3 className="mb-1 mt-4 font-[Hanken] text-2xl font-bold text-[var(--blue)]">{member.name}</h3>
      <span className="text-sm font-semibold tracking-[.05em]">{member.role}</span>
      <p className="text-sm leading-[1.55] text-[var(--muted)]">{member.biography}</p>
    </article>)}</div>
  </div></section>;
}
