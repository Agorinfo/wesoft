import Link from "next/link";

export function PageBreadcrumb({ current }: { current: string }) {
  return <div className="bg-[var(--sky)] pt-6">
    <nav className="mx-auto flex w-[calc(100%-48px)] max-w-[1192px] items-center gap-2 text-xs text-[var(--muted)] max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-[680px]" aria-label="Fil d’Ariane">
      <Link href="/">Accueil</Link><span aria-hidden>›</span><strong className="font-semibold text-[var(--blue)]">{current}</strong>
    </nav>
  </div>;
}
