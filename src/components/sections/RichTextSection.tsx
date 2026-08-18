import type { PageBlock } from "@/types/content";
import { CONTENT, sectionClass, SectionHeading, text } from "./shared";

export function RichTextSection({ block }: { block: PageBlock }) {
  return <section className={sectionClass(block)}><div className={`${CONTENT} max-w-[820px] text-base leading-[1.8] [&_a]:font-semibold [&_a]:text-[var(--blue)] [&_a]:underline [&_h2]:font-[Hanken] [&_h2]:text-2xl [&_h3]:font-[Hanken] [&_h3]:text-2xl [&_ul]:my-7 [&_ul]:list-none [&_ul]:space-y-3 [&_ul]:p-0 [&_ul>li]:relative [&_ul>li]:pl-6 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[.6em] [&_ul>li]:before:h-2 [&_ul>li]:before:w-2 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-[var(--blue)] [&_ol]:my-7 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-7 [&_ol>li]:pl-2 [&_ol>li::marker]:font-bold [&_ol>li::marker]:text-[var(--blue)] [&_blockquote]:my-10 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--blue)] [&_blockquote]:bg-[#edf6ff] [&_blockquote]:px-8 [&_blockquote]:py-7 [&_blockquote]:font-[Hanken] [&_blockquote]:text-2xl [&_blockquote]:font-bold [&_blockquote]:italic [&_blockquote]:leading-[1.45] [&_blockquote]:text-[var(--ink)] [&_blockquote_p]:m-0 [&_blockquote_cite]:mt-5 [&_blockquote_cite]:block [&_blockquote_cite]:font-[Inter] [&_blockquote_cite]:text-sm [&_blockquote_cite]:font-semibold [&_blockquote_cite]:not-italic [&_blockquote_cite]:text-[var(--blue)]`}>
    <SectionHeading eyebrow={text(block.eyebrow)} title={text(block.title)} />
    <div dangerouslySetInnerHTML={{ __html: text(block.content) }} />
  </div></section>;
}
