import { CmsIcon } from "@/components/CmsIcon";
import type { Feature, PageBlock } from "@/types/content";
import { CONTENT, ICONS, list, sectionClass, SectionHeading, text } from "./shared";

export function FeatureGridSection({ block }: { block: PageBlock }) {
  return <section id={text(block.anchorId)} className={sectionClass(block)}>
    <div className={CONTENT}>
      <SectionHeading eyebrow={text(block.eyebrow)} title={text(block.title)} body={text(block.text)} />
      <div className="grid grid-cols-4 gap-[18px] max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
        {list<Feature>(block.features).map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          return <article className="min-h-[285px] rounded-lg border border-[#f9f9ff] border-t-4 border-t-[var(--blue)] bg-[#f9f9ff] px-8 pb-[34px] pt-[29px]" key={item.id || index}>
            <span className="mb-3 grid h-12 w-12 place-items-center rounded bg-[#d7e3ff] text-[var(--blue)]">
              {item.icon ? <CmsIcon icon={item.icon} /> : <Icon size={20} />}
            </span>
            <h3 className="mb-3 mt-6 font-[Hanken] text-2xl font-bold leading-[1.2]">{item.title}</h3>
            <p className="m-0 text-[15px] leading-6 opacity-[.78]">{item.text}</p>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
