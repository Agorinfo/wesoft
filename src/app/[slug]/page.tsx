import type {Metadata} from "next";
import {notFound, redirect} from "next/navigation";
import {SectionRenderer} from "@/components/SectionRenderer";
import {PageBreadcrumb} from "@/components/PageBreadcrumb";
import {getPage, mediaUrl} from "@/lib/strapi";
import { fallbackPages, mergePageWithFallback } from "@/lib/fallback-content";

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params;
    const cmsPage = await getPage(slug);
    const page = fallbackPages[slug] ? mergePageWithFallback(cmsPage, fallbackPages[slug]) : cmsPage;
    const title = page?.seo?.metaTitle || page?.title;
    const description = page?.seo?.metaDescription || page?.excerpt;
    const image = page?.seo?.shareImage?.url ? mediaUrl(page.seo.shareImage.url) : `/${slug}/opengraph-image`;
    return {
        title,
        description,
        alternates: { canonical: `/${slug}` },
        openGraph: { type: "website", url: `/${slug}`, title, description, images: [{ url: image, alt: title || "WeSoft" }] },
        twitter: { card: "summary_large_image", title, description, images: [image] },
    };
}

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    if (slug === "qui-sommes-nous") redirect("/#equipe");
    const cmsPage = await getPage(slug);
    const page = fallbackPages[slug] ? mergePageWithFallback(cmsPage, fallbackPages[slug]) : cmsPage;
    if (!page) notFound();
    const hero = page.blocks?.find((block) => block.__component === "sections.hero");
    return <>{hero && <PageBreadcrumb current={page.title} background={typeof hero.background === "string" ? hero.background : undefined}/>}<SectionRenderer blocks={page.blocks} hasBreadcrumb={Boolean(hero)} removeHeroBottomPadding={slug === "contact"}/></>;
}
