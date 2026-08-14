import type { PageBlock } from "@/types/content";
import { CONTENT, sectionClass, SectionHeading, text } from "./shared";

export function RichTextSection({ block }: { block: PageBlock }) {
  return <section className={sectionClass(block)}><div className={`${CONTENT} max-w-[820px] text-[17px] leading-[1.8] [&_a]:text-[var(--blue)] [&_a]:underline [&_h2]:font-[Hanken] [&_h3]:font-[Hanken]`}>
    <SectionHeading eyebrow={text(block.eyebrow)} title={text(block.title)} />
    <div dangerouslySetInnerHTML={{ __html: text(block.content) }} />
  </div></section>;
}
