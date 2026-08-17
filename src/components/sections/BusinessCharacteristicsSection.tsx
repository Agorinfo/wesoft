import { CmsButton } from "@/components/CmsButton";
import { CmsIcon } from "@/components/CmsIcon";
import type { CmsButton as ButtonData, Feature, PageBlock } from "@/types/content";
import { CONTENT, ICONS, list, sectionClass, SectionHeading, text } from "./shared";

function Card({ item, index }: { item: Feature; index: number }) {
  const background = item.backgroundColor || ["#004b93", "#dce6ff", "#ffffff", "#606979"][index % 4];
  const hex = background.replace("#", "");
  const parsed = parseInt(hex.length === 3 ? hex.split("").map((value) => value + value).join("") : hex, 16);
  const color = Number.isFinite(parsed) && ((((parsed >> 16) & 255) * 299 + ((parsed >> 8) & 255) * 587 + (parsed & 255) * 114) / 1000) < 150 ? "#fff" : "#191c21";
  const Icon = ICONS[index % ICONS.length];

  const colSpan = Math.min(Math.max(Math.round(item.colSpan || 4), 1), 8);
  const spanClasses: Record<number, string> = {
    1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4",
    5: "col-span-5", 6: "col-span-6", 7: "col-span-7", 8: "col-span-8",
  };
  const spanClass = spanClasses[colSpan];

  return <article className={`relative ${spanClass} flex min-h-52.5 flex-col justify-center overflow-hidden rounded-lg px-8.5 py-9 max-[800px]:col-span-1 max-[600px]:min-h-47.5`} style={{ backgroundColor: background, color }}>
    {item.icon
      ? <CmsIcon icon={item.icon} className="absolute -right-2 top-5 opacity-20" />
      : <Icon className="absolute -right-0.5 -top-3.75 h-26.25 w-26.25 opacity-10" aria-hidden />}
    <h3 className="relative z-2 mb-3.5 max-w-[90%] font-[Hanken] text-[22px] font-bold leading-[1.2]">{item.title}</h3>
    <p className="relative z-2 m-0 max-w-[90%] text-base leading-[1.6] opacity-[.78]">{item.text}</p>
  </article>;
}

export function BusinessCharacteristicsSection({ block }: { block: PageBlock }) {
  return <section id={text(block.anchorId)} className={sectionClass(block)}><div className={CONTENT}>
    <div className="flex items-center justify-between gap-8.75 max-[800px]:block">
      <SectionHeading className="mb-10.5" eyebrow={text(block.eyebrow)} title={text(block.title)} body={text(block.text)} />
      <CmsButton button={block.button as ButtonData} />
    </div>
    <div className="grid grid-cols-8 gap-4.5 max-[800px]:grid-cols-1">
      {list<Feature>(block.cards).map((item, index) => <Card item={item} index={index} key={item.id || index} />)}
    </div>
  </div></section>;
}
