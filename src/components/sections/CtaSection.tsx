import { CmsButton } from "@/components/CmsButton";
import type { CmsButton as ButtonData, PageBlock } from "@/types/content";
import { backgroundClass, CONTENT, list, SectionHeading, text } from "./shared";

export function CtaSection({ block }: { block: PageBlock }) {
  return <section className={`py-12 pb-24 text-center ${backgroundClass(block)}`}><div className={CONTENT}>
    <div className="relative mx-auto mb-8 max-w-[1000px] overflow-hidden rounded-lg border-2 border-[var(--line)] bg-white p-12 after:absolute after:-right-16 after:-top-16 after:z-0 after:h-32 after:w-32 after:rounded-xl after:bg-[#d7e3ff] max-[600px]:px-[22px] max-[600px]:py-9">
      <SectionHeading className="relative z-[1] mx-auto mb-[22px] [&_p]:mx-auto [&_p]:max-w-[680px] [&_p]:text-base" eyebrow={text(block.eyebrow)} title={text(block.title)} body={text(block.text)} />
      <div className="relative z-[1] flex flex-wrap justify-center gap-3">{list<ButtonData>(block.buttons).map((button, index) => <CmsButton key={button.id || index} button={button} />)}</div>
    </div>
  </div></section>;
}
