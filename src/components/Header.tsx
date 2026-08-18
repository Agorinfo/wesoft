"use client";

import Link from "next/link";
import {ChevronRight, Menu, X} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {usePathname} from "next/navigation";
import {CmsButton} from "./CmsButton";
import {Brand} from "./Brand";
import type {SiteConfig} from "@/types/content";

function anchorIdFromHref(href: string) {
    if (!href.startsWith("/#")) return null;
    try {
        return decodeURIComponent(href.slice(2));
    } catch {
        return href.slice(2);
    }
}

export function Header({config}: { config: SiteConfig }) {
    const [open, setOpen] = useState(false);
    const [activeAnchorHref, setActiveAnchorHref] = useState<string | null>(null);
    const pathname = usePathname();
    const anchorLinks = useMemo(() => (config.navigation || []).flatMap((item) => {
        const id = anchorIdFromHref(item.href);
        return id ? [{id, href: `/#${id}`}] : [];
    }), [config.navigation]);

    useEffect(() => {
        if (pathname !== "/" || anchorLinks.length === 0) {
            return;
        }

        let frame: number | null = null;
        const updateActiveAnchor = () => {
            frame = null;
            const headerHeight = window.innerWidth <= 800 ? 76 : 96;
            const activationLine = headerHeight + Math.min(160, (window.innerHeight - headerHeight) * .25);
            const activeLink = anchorLinks.find(({id}) => {
                const section = document.getElementById(id);
                if (!section) return false;
                const bounds = section.getBoundingClientRect();
                return bounds.top <= activationLine && bounds.bottom > activationLine;
            });
            setActiveAnchorHref(activeLink?.href || null);
        };
        const scheduleUpdate = () => {
            if (frame === null) frame = window.requestAnimationFrame(updateActiveAnchor);
        };

        scheduleUpdate();
        window.addEventListener("scroll", scheduleUpdate, {passive: true});
        window.addEventListener("resize", scheduleUpdate);
        window.addEventListener("hashchange", scheduleUpdate);
        return () => {
            if (frame !== null) window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            window.removeEventListener("hashchange", scheduleUpdate);
        };
    }, [anchorLinks, pathname]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = previousOverflow; };
    }, [open]);

    useEffect(() => { setOpen(false); }, [pathname]);

    const navigationClass = `flex items-center gap-[30px] text-sm font-semibold text-[#424752]
        max-[800px]:fixed max-[800px]:inset-x-4 max-[800px]:top-[88px] max-[800px]:z-20 max-[800px]:flex-col max-[800px]:items-stretch max-[800px]:gap-1 max-[800px]:rounded-[20px] max-[800px]:border max-[800px]:border-white/80 max-[800px]:bg-white/95 max-[800px]:p-3 max-[800px]:shadow-[0_22px_50px_rgba(18,50,85,.18)] max-[800px]:backdrop-blur-xl
        ${open ? "max-[800px]:flex" : "max-[800px]:hidden"}`;
    return <header className="sticky top-0 z-50 h-24 border-b border-gray-200 bg-[#fafaff] max-[800px]:h-[76px]">
        <div className="mx-auto flex h-full w-[calc(100%-48px)] max-w-[1192px] items-center justify-between max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-[680px]"><Brand config={config}/>
            <button className="hidden h-11 w-11 place-items-center rounded-full border border-[#cbd9e7] bg-white text-[var(--blue)] shadow-[0_6px_16px_rgba(18,50,85,.08)] transition hover:border-[var(--blue)] hover:bg-[#eef7ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] max-[800px]:grid" onClick={() => setOpen(!open)} aria-expanded={open}
                    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>{open ? <X size={21}/> : <Menu size={22}/>}</button>
            {open && <button className="fixed inset-0 top-[76px] z-10 hidden border-0 bg-[#0d3156]/20 backdrop-blur-[1px] max-[800px]:block" onClick={() => setOpen(false)} aria-label="Fermer le menu" />}
            <nav className={navigationClass}
                 aria-label="Navigation principale"><span className="hidden px-3 pb-2 pt-1 text-[11px] font-extrabold uppercase tracking-[.12em] text-[var(--blue)] max-[800px]:block">Navigation</span>{config.navigation?.map((item) => {
                const anchorId = anchorIdFromHref(item.href);
                const isActive = anchorId
                    ? pathname === "/" && activeAnchorHref === `/#${anchorId}`
                    : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return <Link key={`${item.label}-${item.href}`} href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`inline-flex h-8 items-center border-b-2 border-transparent hover:text-[var(--blue)] max-[800px]:h-12 max-[800px]:justify-between max-[800px]:rounded-xl max-[800px]:border-0 max-[800px]:px-3 max-[800px]:text-[15px] max-[800px]:transition-colors ${isActive ? "border-b-[var(--blue)] text-[var(--blue)] max-[800px]:bg-[#e9f3fc]" : "max-[800px]:hover:bg-[#f2f7fc]"}`}
                    onClick={() => {
                        setOpen(false);
                        if (anchorId && pathname === "/") setActiveAnchorHref(`/#${anchorId}`);
                    }}><span>{item.label}</span><ChevronRight className="hidden text-[#8aa8c4] max-[800px]:block" size={18} aria-hidden /></Link>;
            })}<CmsButton
                button={config.headerButton} className="max-[800px]:mt-3 max-[800px]:!min-h-[54px] max-[800px]:w-full"/></nav>
        </div>
    </header>;
}
