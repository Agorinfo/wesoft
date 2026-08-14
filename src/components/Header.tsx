"use client";

import Link from "next/link";
import {Menu, X} from "lucide-react";
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

    const navigationClass = `flex items-center gap-[30px] text-sm font-semibold text-[#424752]
        max-[800px]:absolute max-[800px]:left-0 max-[800px]:right-0 max-[800px]:top-[76px] max-[800px]:flex-col max-[800px]:items-stretch max-[800px]:gap-4 max-[800px]:bg-white max-[800px]:p-6 max-[800px]:shadow-[0_15px_30px_rgba(0,0,0,.1)]
        ${open ? "max-[800px]:flex" : "max-[800px]:hidden"}`;
    return <header className="sticky top-0 z-50 h-24 border-b border-gray-200 bg-[#fafaff] max-[800px]:h-[76px]">
        <div className="mx-auto flex h-full w-[calc(100%-48px)] max-w-[1192px] items-center justify-between max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-[680px]"><Brand config={config}/>
            <button className="hidden border-0 bg-transparent text-[var(--blue)] max-[800px]:block" onClick={() => setOpen(!open)} aria-expanded={open}
                    aria-label="Ouvrir le menu">{open ? <X/> : <Menu/>}</button>
            <nav className={navigationClass}
                 aria-label="Navigation principale">{config.navigation?.map((item) => {
                const anchorId = anchorIdFromHref(item.href);
                const isActive = anchorId
                    ? pathname === "/" && activeAnchorHref === `/#${anchorId}`
                    : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return <Link key={`${item.label}-${item.href}`} href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`inline-flex h-8 items-center border-b-2 border-transparent hover:text-[var(--blue)] ${isActive ? "border-b-[var(--blue)] text-[var(--blue)]" : ""}`}
                    onClick={() => {
                        setOpen(false);
                        if (anchorId && pathname === "/") setActiveAnchorHref(`/#${anchorId}`);
                    }}>{item.label}</Link>;
            })}<CmsButton
                button={config.headerButton} className="max-[800px]:w-full"/></nav>
        </div>
    </header>;
}
