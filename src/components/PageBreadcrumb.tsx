import Link from "next/link";

const breadcrumbBackgrounds: Record<string, string> = {
  white: "bg-white",
  sky: "bg-[var(--sky)]",
  lavender: "bg-[var(--lavender)]",
  blue: "bg-[var(--blue)] text-white",
  navy: "bg-[#0e2742] text-white",
  gradient: "bg-[linear-gradient(135deg,#eef7ff,#f4f2ff)]",
};

export function PageBreadcrumb({ current, background = "sky" }: { current: string; background?: string }) {
  return <div className={`${breadcrumbBackgrounds[background] || breadcrumbBackgrounds.sky} pt-6`}>
    <nav className="mx-auto flex w-[calc(100%-48px)] max-w-[1192px] items-center gap-2 text-xs text-[var(--muted)] max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-[680px]" aria-label="Fil d’Ariane">
      <Link href="/">Accueil</Link><span aria-hidden>›</span><strong className="font-semibold text-[var(--blue)]">{current}</strong>
    </nav>
  </div>;
}
