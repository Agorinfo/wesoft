import Link from "next/link";

export default function NotFound() {
    return <section className="bg-[var(--lavender)] py-[95px]">
        <div className="mx-auto w-[calc(100%-48px)] max-w-[1192px] max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-[680px]"><span className="mb-[13px] block text-xs font-extrabold uppercase tracking-[.09em] text-[var(--blue)]">404</span><h1 className="mb-[25px] font-[Hanken] text-[clamp(43px,5vw,66px)] font-extrabold leading-[1.08] tracking-[-.035em] max-[600px]:text-[42px]">Cette page n’existe pas</h1><p className="mb-[34px] max-w-[650px] text-lg leading-[1.65] text-[var(--muted)]">Le contenu
            demandé est introuvable ou n’est pas encore publié.</p><Link className="inline-flex min-h-[50px] items-center justify-center rounded bg-[var(--blue)] px-[31px] text-[15px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--blue-2)]" href="/">Retour
            à l’accueil</Link></div>
    </section>;
}
