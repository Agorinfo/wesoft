import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {Clock3} from "lucide-react";
import {notFound} from "next/navigation";
import {getArticle, getArticles, mediaUrl} from "@/lib/strapi";
import {CmsButton} from "@/components/CmsButton";
import {VideoEmbed} from "@/components/VideoEmbed";
import { absoluteUrl, toIsoDate } from "@/lib/seo";

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params;
    const article = await getArticle(slug);
    const title = article?.seo?.metaTitle || article?.title;
    const description = article?.seo?.metaDescription || article?.excerpt;
    const image = article?.seo?.shareImage?.url ? mediaUrl(article.seo.shareImage.url) : article?.cover?.url ? mediaUrl(article.cover.url) : "/opengraph-image.png";
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
    const article = await getArticle(slug);
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
    const asideCard = "rounded-md border border-[var(--line)] bg-white p-6 [&_h2]:mb-3 [&_h2]:font-[Hanken] [&_h2]:text-[22px] [&_h2]:font-bold [&_p]:text-sm [&_p]:leading-[1.5] [&_p]:text-[var(--muted)] [&_a]:w-full [&_a]:px-4 [&_a]:text-[13px]";
    const asideCtaCard = `${asideCard} [&_p]:mb-6`;
    const articleContent = `max-w-none py-8 text-[17px] leading-[1.85] text-[#343943]
        max-[600px]:py-7
        [&_p]:my-6 [&_p:first-child]:mt-0 [&_p:first-child]:font-[Hanken] [&_p:first-child]:text-[19px] [&_p:first-child]:font-medium [&_p:first-child]:leading-[1.75] [&_p:last-child]:mb-0
        [&_h2]:mb-5 [&_h2]:mt-12 [&_h2]:font-[Hanken] [&_h2]:text-[30px] [&_h2]:font-extrabold [&_h2]:leading-[1.25] [&_h2]:tracking-[-.02em] [&_h2]:text-[var(--blue)] [&_h2:first-child]:mt-0
        [&_h3]:mb-4 [&_h3]:mt-9 [&_h3]:font-[Hanken] [&_h3]:text-[23px] [&_h3]:font-bold [&_h3]:leading-[1.3] [&_h3]:text-[var(--ink)]
        [&_h4]:mb-3 [&_h4]:mt-8 [&_h4]:font-[Hanken] [&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-[var(--blue)]
        [&_ul]:my-7 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-7 [&_ol]:my-7 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-7
        [&_li]:pl-2 [&_li]:leading-[1.75] [&_li::marker]:font-bold [&_li::marker]:text-[var(--blue)] [&_li>ul]:my-3 [&_li>ol]:my-3
        [&_blockquote]:relative [&_blockquote]:my-10 [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--blue)] [&_blockquote]:bg-[#edf6ff] [&_blockquote]:px-8 [&_blockquote]:py-7 [&_blockquote]:font-[Hanken] [&_blockquote]:text-xl [&_blockquote]:font-semibold [&_blockquote]:italic [&_blockquote]:leading-[1.65] [&_blockquote]:text-[var(--blue)] [&_blockquote>p]:m-0
        [&_a]:font-semibold [&_a]:text-[var(--blue)] [&_a]:underline [&_a]:decoration-[#8fc8ef] [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:decoration-[var(--blue)]
        [&_strong]:font-bold [&_strong]:text-[var(--ink)] [&_em]:text-[var(--muted)]
        [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--line)]
        [&_figure]:my-9 [&_figure_img]:w-full [&_figure_img]:rounded-lg [&_figure_img]:shadow-[0_8px_24px_rgba(18,50,85,.1)] [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:text-[var(--muted)]
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
                        <div className="relative mb-8.75 mt-7"><Image
                            className="w-full rounded-lg shadow-[0_15px_35px_rgba(18,50,85,.12)]" src={cover}
                            alt={article.cover?.alternativeText || ""}
                            width={900} height={520} priority/></div>}
                    <VideoEmbed url={article.videoUrl} title={article.videoTitle || article.title}/>
                    <div className={articleContent} dangerouslySetInnerHTML={{__html: article.content || ""}}/>
                </div>
                <aside
                    className="sticky top-30 grid gap-4.5 max-[1000px]:static max-[1000px]:grid-cols-3 max-[800px]:grid-cols-1">
                    <div className={asideCtaCard}><h2>{article.sidebarTitle || "Prêt pour la révolution ?"}</h2>
                        <p>{article.sidebarText || "Découvrez comment nos solutions ERP intègrent l’IA pour votre métier."}</p>
                        <CmsButton button={article.sidebarButton || {
                            label: "Découvrir nos solutions",
                            href: "/#solutions",
                            style: "primary"
                        }}/></div>
                    {related.length > 0 && <div className={asideCard}><h2>À lire aussi</h2>{related.map((item) => <Link
                        className="flex gap-3 border-t border-(--line) py-3 text-[13px] font-semibold"
                        href={`/articles/${item.slug}`} key={item.id}>{item.cover?.url &&
                        <Image className="object-cover" src={mediaUrl(item.cover.url)} alt="" width={72}
                               height={58}/>}<span className="flex flex-col gap-1.25"><small
                        className="text-[10px] text-(--blue)">{item.resourceType === "temoignage" ? "TÉMOIGNAGE" : "ARTICLE"}</small>{item.title}</span></Link>)}
                    </div>}
                    <div className={`${asideCtaCard} bg-(--blue)! [&_p]:text-[#d7e3ff]!`}><h2>Prêt pour
                        la révolution ?</h2><p>Découvrez comment
                        nos solutions ERP intègrent l’IA pour votre métier.</p><CmsButton
                        button={{label: "Voir nos éditeurs", href: "/#solutions", style: "light"}}/></div>
                </aside>
            </div>
        </div>
    </article>;
}
