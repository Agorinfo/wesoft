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

  return <article className="relative flex min-h-[210px] flex-col justify-center overflow-hidden rounded-lg px-[34px] py-9 max-[600px]:min-h-[190px]" style={{ backgroundColor: background, color }}>
    {item.icon
      ? <CmsIcon icon={item.icon} className="absolute right-6 top-5 opacity-20" />
      : <Icon className="absolute -right-0.5 -top-[15px] h-[105px] w-[105px] opacity-10" aria-hidden />}
    <h3 className="relative z-[2] mb-[14px] max-w-[90%] font-[Hanken] text-[22px] font-bold leading-[1.2]">{item.title}</h3>
    <p className="relative z-[2] m-0 max-w-[90%] text-[15px] leading-[1.6] opacity-[.78]">{item.text}</p>
  </article>;
}

export function BusinessCharacteristicsSection({ block }: { block: PageBlock }) {
  return <section id={text(block.anchorId)} className={sectionClass(block)}><div className={CONTENT}>
    <div className="flex items-center justify-between gap-[35px] max-[800px]:block">
      <SectionHeading className="mb-[42px]" eyebrow={text(block.eyebrow)} title={text(block.title)} body={text(block.text)} />
      <CmsButton button={block.button as ButtonData} />
    </div>
    <div className="grid grid-cols-[1.35fr_.65fr] gap-[18px] max-[800px]:grid-cols-1">
      {list<Feature>(block.cards).map((item, index) => <Card item={item} index={index} key={item.id || index} />)}
    </div>
  </div></section>;
}
