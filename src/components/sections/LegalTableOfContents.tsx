"use client";

import { useEffect, useState } from "react";
import type { LegalSection } from "@/types/content";

export function LegalTableOfContents({ sections }: { sections: LegalSection[] }) {
  const [activeAnchor, setActiveAnchor] = useState(sections[0]?.anchorId);

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.35;
      const visibleSections = sections
        .map((section) => ({ section, element: document.getElementById(section.anchorId) }))
        .filter((entry): entry is { section: LegalSection; element: HTMLElement } => Boolean(entry.element));

      const current = visibleSections.reduce<LegalSection | undefined>(
        (active, entry) => entry.element.getBoundingClientRect().top <= marker ? entry.section : active,
        visibleSections[0]?.section,
      );

      if (current) setActiveAnchor(current.anchorId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  return <nav className="mt-6 grid border-l border-[#cfd9e3]" aria-label="Sommaire de la page">
    {sections.map((item) => {
      const active = item.anchorId === activeAnchor;
      return <a
        className={`border-l-2 px-4 py-[7px] text-base transition-colors duration-200 ${active ? "-ml-px border-[var(--blue)] bg-white font-semibold text-[var(--blue)]" : "-ml-px border-transparent text-[var(--muted)] hover:border-[var(--blue)] hover:bg-white/70 hover:text-[var(--blue)]"}`}
        href={`#${item.anchorId}`}
        key={item.anchorId}
        onClick={() => setActiveAnchor(item.anchorId)}
        aria-current={active ? "location" : undefined}
      >
        {item.title.replace(/^\d+\.\s*/, "")}
      </a>;
    })}
  </nav>;
}
