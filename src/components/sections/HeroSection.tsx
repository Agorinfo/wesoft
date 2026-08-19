import Image from "next/image";
import { CmsButton } from "@/components/CmsButton";
import { CmsIcon } from "@/components/CmsIcon";
import { mediaUrl } from "@/lib/strapi";
import type { CmsButton as ButtonData, CmsIconValue, Media, PageBlock } from "@/types/content";
import { ChartNoAxesCombined } from "lucide-react";
import { backgroundClass, CONTENT, list, text } from "./shared";

function HeroTitle({ value }: { value: string }) {
  const marker = "logiciels verticaux";
  const at = value.toLowerCase().indexOf(marker);
  if (at < 0) return value;
  return <>{value.slice(0, at)}<span className="text-[var(--blue)]">{value.slice(at, at + marker.length)}</span>{value.slice(at + marker.length)}</>;
}

export function HeroSection({ block, hasBreadcrumb = false, removeBottomPadding = false }: { block: PageBlock; hasBreadcrumb?: boolean; removeBottomPadding?: boolean }) {
  const image = block.image as Media | undefined;
  const floatingIcon = block.floatingIcon as CmsIconValue | undefined;
  const hasImage = Boolean(image?.url);
  const hasTiltedImage = block.imageTilt === true;
  const hasLargeTiltedImage = hasTiltedImage && text(block.imageTiltSize) === "large";
  const isTextOnly = !hasImage;

  return <section id={text(block.anchorId)} className={`overflow-hidden py-20 max-[800px]:py-[65px] ${isTextOnly ? "py-14 max-[800px]:py-12" : ""} ${hasTiltedImage && !hasLargeTiltedImage ? "py-12 max-[800px]:py-14" : ""} ${hasBreadcrumb ? "pt-8 max-[800px]:pt-7" : ""} ${removeBottomPadding ? "pb-16 max-[800px]:pb-16" : ""} ${backgroundClass(block)}`}>
    <div className={`${CONTENT} grid grid-cols-[604fr_564fr] gap-6 max-[1000px]:grid-cols-2 max-[800px]:grid-cols-1 max-[800px]:gap-[45px] ${isTextOnly ? "grid-cols-1" : ""} ${hasTiltedImage && !hasLargeTiltedImage ? "grid-cols-[minmax(0,1fr)_310px] items-center gap-18 max-[1000px]:gap-10 max-[800px]:gap-8" : ""}`}>
      <div className="relative z-[2]">
        {text(block.eyebrow) && <span className="mb-3 block text-sm font-extrabold uppercase tracking-[.08em] text-[var(--blue)]">{text(block.eyebrow)}</span>}
        <h1 className={`m-0 font-[Hanken] font-extrabold leading-[1.25] tracking-[-.025em] ${hasTiltedImage || isTextOnly ? "text-[34px] max-[800px]:text-[32px]" : "text-5xl max-[800px]:text-[38px]"}`}>
          <HeroTitle value={text(block.title)} />
        </h1>
        <p className="my-6 max-w-[570px] text-base leading-[1.6] text-[var(--muted)]">{text(block.text)}</p>
        <div className="flex flex-wrap gap-3 max-[600px]:[&_a]:w-full">
          {list<ButtonData>(block.buttons).map((button, index) => <CmsButton key={button.id || index} button={button} />)}
        </div>
      </div>

      {image?.url && <div className={`relative z-[1] flex w-full items-center justify-center ${hasLargeTiltedImage ? "min-h-[386px] max-w-[564px] max-[800px]:min-h-[360px] max-[600px]:mt-4" : hasTiltedImage ? "min-h-[170px] max-[800px]:min-h-[190px]" : "min-h-[386px] max-w-[564px] max-[800px]:min-h-[360px] max-[600px]:mt-4"}`}>
        {!hasTiltedImage && <div className="absolute -inset-[10%] rounded-xl bg-[#d7e3ff]/30 blur-[32px]" />}
        <div className={`relative shrink-0 ${hasLargeTiltedImage ? "h-[358px] w-[528px] rotate-[3deg] max-[800px]:h-80 max-[800px]:w-full" : hasTiltedImage ? "h-[148px] w-[246px] rotate-[3deg] max-[800px]:h-[165px] max-[800px]:w-[275px]" : "h-[358px] w-[528px] max-[800px]:h-80 max-[800px]:w-full"}`}>
          {!hasTiltedImage && block.showDecoration !== false && <span className="absolute -right-4 -top-4 z-0 h-24 w-24 rounded-lg bg-[var(--blue)] max-[800px]:-right-2 max-[800px]:-top-3 max-[800px]:h-[78px] max-[800px]:w-[78px]" aria-hidden />}
          <div className="relative z-[1] h-full w-full overflow-hidden rounded-lg border-8 border-white shadow-2xl">
            <Image className="object-cover" src={mediaUrl(image.url)} alt={image.alternativeText || ""} fill priority sizes="(max-width: 800px) 100vw, 528px" />
          </div>
          {text(block.floatingTitle) && !hasTiltedImage && <div className="absolute left-[-32px] top-[296px] z-[3] flex h-[90px] w-[264px] items-center gap-4 rounded-lg border border-[var(--line)] bg-white p-6 text-[var(--ink)] shadow-xl max-[1000px]:left-[-16px] max-[800px]:left-3 max-[800px]:top-[274px] max-[800px]:h-[78px] max-[800px]:w-[235px] max-[800px]:p-[18px] max-[600px]:left-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--blue)]">
              {floatingIcon ? <CmsIcon icon={floatingIcon} /> : <ChartNoAxesCombined className="text-white" size={20} />}
            </span>
            <p className="m-0 flex whitespace-nowrap text-sm leading-[16.8px]">
              <span className="flex flex-col"><strong className="font-semibold">{text(block.floatingTitle)}</strong><small className="mt-px text-xs leading-4 text-[var(--muted)]">{text(block.floatingText)}</small></span>
            </p>
          </div>}
        </div>
      </div>}
    </div>
  </section>;
}
