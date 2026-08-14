import { CmsButton } from "@/components/CmsButton";
import type { CmsButton as ButtonData, PageBlock } from "@/types/content";
import { backgroundClass, CONTENT, list, SectionHeading, text } from "./shared";

export function CtaSection({ block }: { block: PageBlock }) {
  return <section className={`py-12 pb-24 text-center ${backgroundClass(block)}`}><div className={CONTENT}>
    <div className="relative mx-auto max-w-[1000px] overflow-hidden border border-[var(--line)] bg-white p-12 after:absolute after:-right-16 after:-top-16 after:h-32 after:w-32 after:rounded-xl after:bg-[#d7e3ff] max-[600px]:px-[22px] max-[600px]:py-9">
      <SectionHeading className="mx-auto mb-[22px] [&_p]:mx-auto [&_p]:max-w-[680px]" eyebrow={text(block.eyebrow)} title={text(block.title)} body={text(block.text)} />
      <div className="flex flex-wrap justify-center gap-3">{list<ButtonData>(block.buttons).map((button, index) => <CmsButton key={button.id || index} button={button} />)}</div>
    </div>
  </div></section>;
}
