import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {Clock3, Rocket} from "lucide-react";
import {notFound} from "next/navigation";
import {getArticle, getArticles, getSiteConfig, mediaUrl} from "@/lib/strapi";
import {CmsButton} from "@/components/CmsButton";
import {VideoEmbed} from "@/components/VideoEmbed";
import { absoluteUrl, toIsoDate } from "@/lib/seo";

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params;
    const article = await getArticle(slug);
    const title = article?.seo?.metaTitle || article?.title;
    const description = article?.seo?.metaDescription || article?.excerpt;
    const image = article?.seo?.shareImage?.url ? mediaUrl(article.seo.shareImage.url) : `/articles/${slug}/opengraph-image`;
    return {
        title,
        description,
        alternates: { canonical: `/articles/${slug}` },
        openGraph: { type: "article", url: `/articles/${slug}`, title, description, publishedTime: toIsoDate(article?.publishedDate), images: [{ url: image, alt: title || "WeSoft" }] },
        twitter: { card: "summary_large_image", title, description, images: [image] },
    };
}

export default async function ArticlePage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const [article, siteConfig] = await Promise.all([getArticle(slug), getSiteConfig()]);
    if (!article) notFound();
    const cover = mediaUrl(article.cover?.url);
    const articleUrl = absoluteUrl(`/articles/${article.slug}`);
    const articleImage = article.seo?.shareImage?.url ? mediaUrl(article.seo.shareImage.url) : cover || absoluteUrl("/opengraph-image.png");
    const structuredData = JSON.stringify({
        "@context": "https://schema.org",
        "@type": article.resourceType === "video" ? "VideoObject" : "Article",
        headline: article.title,
        description: article.excerpt,
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        image: articleImage,
        datePublished: toIsoDate(article.publishedDate),
        dateModified: toIsoDate(article.publishedDate),
        author: { "@type": "Organization", name: "WeSoft" },
        publisher: { "@type": "Organization", name: "WeSoft", logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
        ...(article.resourceType === "video" && article.videoUrl ? { contentUrl: article.videoUrl, name: article.videoTitle || article.title } : {}),
    }).replace(/</g, "\\u003c");
    const related = article.relatedArticles?.length ? article.relatedArticles : (await getArticles(4)).filter((item) => item.slug !== article.slug).slice(0, 2);
    const asideCard = "rounded-[6px] border border-[#dbe3eb] bg-white p-6 shadow-[0_8px_20px_rgba(18,50,85,.04)]";
    const asideCtaCard = `${asideCard} relative overflow-hidden`;
    const articleContent = `max-w-none py-9 text-lg leading-[1.65] text-[#343943]
        max-[600px]:py-7 max-[600px]:text-base
        [&_p]:my-7 [&_p:first-child]:mt-0 [&_p:first-child]:font-[Hanken] [&_p:first-child]:text-[19px] [&_p:first-child]:font-medium [&_p:first-child]:leading-[1.7] [&_p:last-child]:mb-0
        [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:font-[Hanken] [&_h2]:text-[32px] [&_h2]:font-extrabold [&_h2]:leading-[1.2] [&_h2]:tracking-[-.025em] [&_h2]:text-[var(--blue)] [&_h2:first-child]:mt-0
        [&_h3]:mb-4 [&_h3]:mt-9 [&_h3]:font-[Hanken] [&_h3]:text-[23px] [&_h3]:font-bold [&_h3]:leading-[1.3] [&_h3]:text-[var(--ink)]
        [&_h4]:mb-3 [&_h4]:mt-8 [&_h4]:font-[Hanken] [&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-[var(--blue)]
        [&_ul]:my-7 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-7 [&_ol]:my-7 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-7
        [&_li]:pl-2 [&_li]:leading-[1.75] [&_li::marker]:font-bold [&_li::marker]:text-[var(--blue)] [&_li>ul]:my-3 [&_li>ol]:my-3
        [&_blockquote]:relative [&_blockquote]:my-12 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--blue)] [&_blockquote]:bg-transparent [&_blockquote]:px-9 [&_blockquote]:pb-1 [&_blockquote]:pt-10 [&_blockquote]:font-[Hanken] [&_blockquote]:text-[25px] [&_blockquote]:font-bold [&_blockquote]:italic [&_blockquote]:leading-[1.48] [&_blockquote]:text-[var(--ink)] [&_blockquote]:before:absolute [&_blockquote]:before:left-6 [&_blockquote]:before:top-[-10px] [&_blockquote]:before:content-['“'] [&_blockquote]:before:font-[Hanken] [&_blockquote]:before:text-[72px] [&_blockquote]:before:font-black [&_blockquote]:before:not-italic [&_blockquote]:before:leading-none [&_blockquote]:before:text-[#a7c4e4] [&_blockquote>p]:m-0
        [&_a]:font-semibold [&_a]:text-[var(--blue)] [&_a]:underline [&_a]:decoration-[#8fc8ef] [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:decoration-[var(--blue)]
        [&_strong]:font-bold [&_strong]:text-[var(--ink)] [&_em]:text-[var(--muted)]
        [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--line)]
        [&_figure]:my-10 [&_figure_img]:w-full [&_figure_img]:rounded-[4px] [&_figure_img]:shadow-[0_8px_24px_rgba(18,50,85,.08)] [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:text-[var(--muted)]
        [&_table]:my-9 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_th]:border [&_th]:border-[var(--line)] [&_th]:bg-[#edf6ff] [&_th]:p-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-[var(--blue)] [&_td]:border [&_td]:border-[var(--line)] [&_td]:p-3
        [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-[#102f50] [&_pre]:p-6 [&_pre]:text-sm [&_pre]:leading-6 [&_pre]:text-white [&_code]:rounded [&_code]:bg-[#edf6ff] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[15px] [&_code]:text-[var(--blue)] [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit`;
    return <article className="bg-(--sky) pb-24 pt-10.5">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }}/>
        <div
            className="mx-auto w-[calc(100%-48px)] max-w-298 max-[800px]:w-[calc(100%-32px)] max-[800px]:max-w-170">
            <nav className="mb-9.5 flex items-center gap-2 text-xs text-(--muted)" aria-label="Fil d’Ariane">
                <Link href="/">Accueil</Link><span>›</span><Link
                href="/articles">Ressources</Link><span>›</span><strong>{article.title}</strong></nav>
            <div
                className="grid grid-cols-[minmax(0,2.25fr)_minmax(270px,1fr)] items-start gap-8 max-[1000px]:grid-cols-1">
                <div className="min-w-0">
                    <header className="text-left">
                        <div className="flex items-center gap-4 text-xs">
                            <span
                                className="bg-[#dcecff] px-2.25 py-1.25 font-extrabold text-(--blue)">{article.resourceType === "temoignage" ? "TÉMOIGNAGE" : article.resourceType === "video" ? "VIDÉO" : "ARTICLE"}</span>{article.publishedDate &&
                            <time>{new Intl.DateTimeFormat("fr-FR", {dateStyle: "medium"}).format(new Date(article.publishedDate))}</time>}
                        </div>
                        <h1 className="mb-5.5 mt-4.5 font-[Hanken] text-[44px] font-extrabold leading-[1.16] text-(--blue) max-[800px]:text-[38px]">{article.title}</h1>{article.readingTime &&
                        <p className="flex items-center gap-1.75 text-[13px] text-(--muted)"><Clock3
                            size={16}/> {article.readingTime} min de lecture</p>}
                    </header>
                    {cover &&
                    <div className="relative mb-9 mt-7"><Image
                            className="w-full rounded-[4px] shadow-[0_10px_28px_rgba(18,50,85,.1)]" src={cover}
                            alt={article.cover?.alternativeText || ""}
                            width={900} height={520} priority/></div>}
                    <VideoEmbed url={article.videoUrl} title={article.videoTitle || article.title}/>
                    <div className={articleContent} dangerouslySetInnerHTML={{__html: article.content || ""}}/>
                </div>
                <aside
                    className="sticky top-30 grid gap-4.5 max-[1000px]:static max-[1000px]:grid-cols-3 max-[800px]:grid-cols-1">
                    <div className={asideCtaCard}>
                        <Rocket className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-[#e1e5e9]" strokeWidth={1.5} aria-hidden />
                        <div className="relative">
                            <h2 className="m-0 font-[Hanken] text-[21px] font-bold leading-[1.2] text-[var(--ink)]">{siteConfig?.articleSidebarPrimaryTitle || "Prêt pour la révolution ?"}</h2>
                            <p className="mb-6 mt-3 text-sm leading-[1.55] text-[var(--muted)]">{siteConfig?.articleSidebarPrimaryText || "Découvrez comment nos solutions ERP intègrent l’IA pour votre métier."}</p>
                            <CmsButton className="!min-h-11 !px-4 !text-[13px]" button={siteConfig?.articleSidebarPrimaryButton || {
                                label: "Découvrir nos solutions",
                                href: "/#solutions",
                                style: "primary"
                            }}/>
                        </div>
                    </div>
                    {related.length > 0 && <div className={asideCard}>
                        <h2 className="mb-4 mt-0 font-[Hanken] text-[22px] font-bold text-[var(--blue)]">À lire aussi</h2>
                        <div className="border-t border-[#dbe3eb]">{related.map((item) => <Link
                            className="flex gap-3 border-b border-[#dbe3eb] py-3 last:border-b-0"
                            href={`/articles/${item.slug}`} key={item.id}>{item.cover?.url &&
                            <Image className="h-[58px] w-[72px] shrink-0 object-cover" src={mediaUrl(item.cover.url)} alt="" width={72}
                                   height={58}/>}<span className="flex min-w-0 flex-col gap-1"><small
                            className="text-[10px] font-bold text-[var(--blue)]">{item.resourceType === "temoignage" ? "TÉMOIGNAGE" : "ARTICLE"}</small><span className="text-[13px] font-semibold leading-[1.35] text-[var(--ink)]">{item.title}</span></span></Link>)}</div>
                    </div>}
                    <div className="relative overflow-hidden rounded-[6px] bg-[var(--blue)] p-6 text-white shadow-[0_8px_20px_rgba(18,50,85,.08)]">
                        <Rocket className="pointer-events-none absolute -bottom-5 -right-4 h-24 w-24 text-white/20" strokeWidth={1.5} aria-hidden />
                        <div className="relative"><h2 className="m-0 font-[Hanken] text-[21px] font-bold leading-[1.2]">{siteConfig?.articleSidebarSecondaryTitle || "Prêt pour la révolution ?"}</h2><p className="mb-6 mt-3 text-sm leading-[1.55] text-[#d7e3ff]">{siteConfig?.articleSidebarSecondaryText || "Découvrez comment nos solutions ERP intègrent l’IA pour votre métier."}</p><CmsButton className="!min-h-11 !px-4 !text-[13px]" button={siteConfig?.articleSidebarSecondaryButton || {label: "Voir nos éditeurs", href: "/#solutions", style: "light"}}/></div>
                    </div>
                </aside>
            </div>
        </div>
    </article>;
}
