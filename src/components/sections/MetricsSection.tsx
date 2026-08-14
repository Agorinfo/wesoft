import { CmsIcon } from "@/components/CmsIcon";
import type { CmsIconValue, PageBlock } from "@/types/content";
import { CONTENT, list, sectionClass, SectionHeading, text } from "./shared";

type Metric = { id?: number; value: string; label: string; icon?: CmsIconValue };

export function MetricsSection({ block }: { block: PageBlock }) {
  return <section className={sectionClass(block)}><div className={CONTENT}>
    <SectionHeading title={text(block.title)} body={text(block.text)} />
    <div className="grid grid-cols-4 gap-2.5 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">{list<Metric>(block.metrics).map((item, index) => <div className="border-l border-white/30 p-5" key={item.id || index}>
      {item.icon && <CmsIcon icon={item.icon} className="mb-3" />}
      <strong className="block font-[Hanken] text-[42px] font-extrabold">{item.value}</strong><span className="mt-2 block opacity-80">{item.label}</span>
    </div>)}</div>
  </div></section>;
}
