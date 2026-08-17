import Link from "next/link";
import {Globe2, Share2} from "lucide-react";
import {CmsIcon} from "./CmsIcon";
import {Brand} from "./Brand";
import {CmsButton} from "./CmsButton";
import type {SiteConfig} from "@/types/content";

export function Footer({config}: { config: SiteConfig }) {
    const columns = config.footerColumns?.slice(0, 5) || [];
    const desktopGrid = [
        "lg:grid-cols-[2fr_1fr]",
        "lg:grid-cols-[2fr_1fr_1fr]",
        "lg:grid-cols-[2fr_repeat(3,minmax(0,1fr))]",
        "lg:grid-cols-[1.7fr_repeat(4,minmax(0,1fr))]",
        "lg:grid-cols-[1.6fr_repeat(5,minmax(0,1fr))]",
        "lg:grid-cols-[1.5fr_repeat(6,minmax(0,1fr))]",
    ][columns.length];
    const columnClass = "flex min-w-0 flex-col gap-3 [&_a]:text-sm [&_a]:text-[var(--muted)] [&_a]:hover:text-[var(--blue)]";
    return <footer className="border-t border-(--line) pb-7.5 pt-20">
        <div className={`mx-auto grid w-[calc(100%-48px)] max-w-298 grid-cols-1 gap-9.5 sm:grid-cols-2 md:grid-cols-3 ${desktopGrid} max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-170`}>
            <div className="col-span-full lg:col-span-1"><Brand config={config}/><p className="mt-6 max-w-72.5 leading-[1.6] text-(--muted)">{config.footerIntro}</p>
                <div className="mt-6 flex gap-4">{config.socialLinks?.map((link, index) => <a className="grid h-10 w-10 place-items-center rounded-xl border border-(--line) transition hover:border-(--blue) hover:text-(--blue)" aria-label={link.label}
                                                                                             key={link.href}
                                                                                             href={link.href}
                                                                                             target="_blank"
                                                                                             rel="noreferrer">{link.icon ?
                    <CmsIcon icon={link.icon}/> : index ? <Share2 size={15}/> : <Globe2 size={15}/>}</a>)}</div>
            </div>
            {columns.map((column) => <div className={columnClass} key={column.title}>
                <h3 className="mb-2.5 mt-1 text-[13px] font-semibold uppercase tracking-[.08em]">{column.title}</h3>
                {column.links?.map((link) => <Link href={link.href}
                                                   key={`${link.label}-${link.href}`}>{link.label}</Link>)}
            </div>)}
            <div className={columnClass}><h3 className="mb-2.5 mt-1 text-[13px] font-semibold uppercase tracking-[.08em]">{config.footerCtaTitle || "Un projet ?"}</h3><CmsButton
                button={config.headerButton} className="whitespace-nowrap px-4"/></div>
        </div>
        <div className="mx-auto mt-15 flex w-[calc(100%-48px)] max-w-298 justify-between border-t border-(--line) pt-6.25 text-[13px] text-(--muted) max-[600px]:flex-col max-[600px]:gap-4 max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-170"><span>{config.copyright}</span>
            <div className="flex gap-4.5 max-[600px]:flex-wrap">{config.legalLinks?.map((link) => <Link className="text-xs hover:text-(--blue)" key={link.href} href={link.href}>{link.label}</Link>)}</div>
        </div>
    </footer>;
}
