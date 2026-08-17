import Image from "next/image";
import { CmsButton } from "@/components/CmsButton";
import { mediaUrl } from "@/lib/strapi";
import type { CSSProperties } from "react";
import type { PageBlock, Software } from "@/types/content";
import { CONTENT, list, sectionClass, SectionHeading, text } from "./shared";

export function SoftwareShowcaseSection({ block }: { block: PageBlock }) {
  return <section id={text(block.anchorId)} className={sectionClass(block)}>
    <div className={CONTENT}>
      <SectionHeading className="mx-auto text-center" title={text(block.title)} body={text(block.text)} />
      <div className="grid gap-6">
        {list<Software>(block.items).map((item, index) => {
          const accent = item.accentColor || "#004288";
          return <article className="grid min-h-70.5 grid-cols-[360px_1fr] border border-(--line) border-t-4 bg-[#fbfbff] max-[1000px]:grid-cols-[280px_1fr] max-[800px]:grid-cols-1" style={{ borderTopColor: accent, "--software-accent": accent } as CSSProperties} key={item.id || item.name || index}>
            <div className="relative min-h-70 bg-[linear-gradient(45deg,#eee_25%,transparent_25%),linear-gradient(-45deg,#eee_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#eee_75%),linear-gradient(-45deg,transparent_75%,#eee_75%)] bg-position-[0_0,0_10px,10px_-10px,-10px_0] bg-size-[20px_20px] max-[800px]:min-h-55">
              {item.image?.url && <Image className="object-cover" src={mediaUrl(item.image.url)} alt="" fill sizes="30vw" />}
            </div>
            <div className="px-6 py-5.75">
              <div className="flex h-18 items-start justify-between gap-6 max-[600px]:h-auto max-[600px]:flex-col">
                {item.logo?.url ? <div className="relative h-16 w-55"><Image className="object-contain object-left" src={mediaUrl(item.logo.url)} alt={item.name} fill sizes="220px" /></div> : <h3>{item.name}</h3>}
                <CmsButton className="min-w-46.25 !border-0 !bg-[var(--software-accent)] !text-white hover:brightness-110" button={item.button} />
              </div>
              <div className="grid grid-cols-2 gap-8.5 pt-4 max-[800px]:grid-cols-1 max-[600px]:pt-7.5">
                <div><h3 className="mb-2 font-[Hanken] text-2xl font-bold" style={{ color: accent }}>{item.sector}</h3><p className="m-0 text-base leading-[1.55] text-(--muted)">{item.description}</p></div>
                <ul className="m-0 list-none p-0">{item.capabilities?.map((capability) => <li className="border-b border-(--line) pb-3 pt-2 font-[Hanken] text-base font-semibold leading-[1.4]" style={{ color: accent }} key={capability.id || capability.text}>{capability.text}</li>)}</ul>
              </div>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
