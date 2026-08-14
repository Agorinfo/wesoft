"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { CmsIcon } from "@/components/CmsIcon";
import { mediaUrl } from "@/lib/strapi";
import type { CmsIconValue, Media, Testimonial } from "@/types/content";
import { CONTENT } from "./sections/shared";

type Metric = { id?: number; value: string; label: string; icon?: CmsIconValue };

function Avatar({ media, name }: { media?: Media; name?: string }) {
  if (media?.url) return <Image className="rounded-[7px] object-cover" src={mediaUrl(media.url)} alt={media.alternativeText || name || ""} fill sizes="52px" />;
  const initials = (name || "WeSoft").split(/\s+/).map((part) => part[0]).slice(0, 2).join("");
  return <span className="grid h-full w-full place-items-center rounded-[7px] bg-[#0057b4] font-bold text-white">{initials}</span>;
}

export function TestimonialSlider({ testimonials, metrics, quoteIcon }: { testimonials: Testimonial[]; metrics: Metric[]; quoteIcon?: CmsIconValue }) {
  const slides = testimonials.length ? testimonials : [{ quote: "", author: "WeSoft" }];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(interval);
  }, [paused, slides.length]);

  const goTo = (index: number) => setActive((index + slides.length) % slides.length);
  const slide = slides[active];
  const arrowClass = "h-[25px] w-[25px] cursor-pointer border-0 bg-transparent p-0 opacity-80 transition hover:scale-105 hover:opacity-100 focus-visible:scale-105 focus-visible:opacity-100 max-[600px]:h-5 max-[600px]:w-5 motion-reduce:transition-none";

  return <section className="bg-[var(--blue)] py-20 text-white max-[800px]:py-16" aria-roledescription="carrousel" aria-label="Témoignages" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    <div className={`${CONTENT} grid grid-cols-[25px_minmax(0,1fr)_minmax(0,1fr)_25px] items-center gap-16 max-[1000px]:grid-cols-[25px_minmax(0,1fr)_25px] max-[1000px]:gap-8 max-[800px]:gap-4 max-[600px]:grid-cols-[20px_minmax(0,1fr)_20px]`}>
      <button className={`${arrowClass} max-[1000px]:col-start-1 max-[1000px]:row-start-1`} type="button" onClick={() => goTo(active - 1)} aria-label="Témoignage précédent"><Image className="block h-full w-full" src="/images/testimonial-chevron-left.svg" alt="" width={25} height={25} /></button>
      <div className="flex min-w-0 flex-col items-start animate-[testimonial-enter_.28s_ease] motion-reduce:animate-none max-[1000px]:col-start-2" key={active} aria-live="polite">
        {quoteIcon ? <CmsIcon icon={quoteIcon} className="mb-[5px]" /> : <Quote className="mb-[5px] text-white" size={32} fill="currentColor" />}
        <blockquote className="m-0 font-[Hanken] text-2xl font-medium leading-9 text-white max-[800px]:text-xl max-[800px]:leading-[30px]">“{slide.quote}”</blockquote>
        <div className="flex w-full items-center gap-4 pt-[27px]">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-white p-1.5 max-[600px]:h-14 max-[600px]:w-14"><Avatar media={slide.avatar} name={slide.author} /></div>
          <p className="m-0 flex flex-col"><strong className="text-sm leading-[16.8px] tracking-[.28px]">{slide.author}</strong>{slide.role && <span className="text-sm leading-5 text-[#d7e3ff] max-[600px]:text-xs">{slide.role}</span>}</p>
        </div>
      </div>
      <div className="grid h-40 grid-cols-2 gap-8 border-l border-white/20 pl-[65px] max-[1000px]:col-start-2 max-[1000px]:row-start-2 max-[1000px]:border-l-0 max-[1000px]:border-t max-[1000px]:px-0 max-[1000px]:pt-8 max-[800px]:h-auto max-[800px]:gap-x-4 max-[800px]:gap-y-6">
        {metrics.map((metric, index) => <div className="flex flex-col gap-1" key={metric.id || `${metric.value}-${index}`}>{metric.icon && <CmsIcon icon={metric.icon} className="mb-1" />}<strong className="font-[Inter] text-4xl font-black leading-10 max-[800px]:text-[28px] max-[800px]:leading-8">{metric.value}</strong><span className="text-sm leading-5 text-[#d7e3ff] max-[800px]:text-xs">{metric.label}</span></div>)}
      </div>
      <button className={`${arrowClass} max-[1000px]:col-start-3 max-[1000px]:row-start-1`} type="button" onClick={() => goTo(active + 1)} aria-label="Témoignage suivant"><Image className="block h-full w-full" src="/images/testimonial-chevron-right.svg" alt="" width={25} height={25} /></button>
    </div>
    <div className="mt-0 flex items-center justify-center gap-1 p-2 max-[600px]:mt-5" aria-label="Choisir un témoignage">{slides.map((item, index) => <button className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0" type="button" key={`${item.author || "testimonial"}-${index}`} onClick={() => goTo(index)} aria-label={`Afficher le témoignage ${index + 1}`} aria-current={index === active ? "true" : undefined}><Image className="block h-6 w-6" src={index === active ? "/images/testimonial-dot-active.svg" : "/images/testimonial-dot-inactive.svg"} alt="" width={24} height={24} /></button>)}</div>
  </section>;
}
