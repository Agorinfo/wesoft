import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Lightbulb, Rocket, Users } from "lucide-react";
import type { PageBlock } from "@/types/content";

export const CONTENT = "mx-auto w-[calc(100%-48px)] max-w-[1192px] max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-[680px]";
export const SECTION = "py-20 max-[800px]:py-[75px]";
export const ICONS: LucideIcon[] = [BadgeCheck, Lightbulb, Users, Rocket];

const backgrounds: Record<string, string> = {
  white: "bg-white",
  sky: "bg-[var(--sky)]",
  lavender: "bg-[var(--lavender)]",
  blue: "bg-[var(--blue)] text-white",
  navy: "bg-[#0e2742] text-white",
  gradient: "bg-[linear-gradient(135deg,#eef7ff,#f4f2ff)]",
};

export const text = (value: unknown) => typeof value === "string" ? value : "";
export const list = <T,>(value: unknown) => Array.isArray(value) ? value as T[] : [];
export const backgroundClass = (block: PageBlock) => backgrounds[text(block.background)] || backgrounds.white;
export const sectionClass = (block: PageBlock) => `${SECTION} ${backgroundClass(block)}`;

export function SectionHeading({ eyebrow, title, body, className = "" }: { eyebrow?: string; title?: string; body?: string; className?: string }) {
  return <div className={`mb-[50px] max-w-[720px] ${className}`}>
    {eyebrow && <span className="mb-3 block text-sm font-extrabold uppercase tracking-[.08em] text-[var(--blue)]">{eyebrow}</span>}
    {title && <h2 className="m-0 mb-4 font-[Hanken] text-[32px] font-extrabold leading-[1.2] tracking-[-.025em] max-[600px]:text-[28px]">{title}</h2>}
    {body && <p className="m-0 text-base leading-6 text-[var(--muted)]">{body}</p>}
  </div>;
}
