import type {Metadata} from "next";
import {notFound, redirect} from "next/navigation";
import {SectionRenderer} from "@/components/SectionRenderer";
import {getPage} from "@/lib/strapi";
import { fallbackPages, mergePageWithFallback } from "@/lib/fallback-content";

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params;
    const cmsPage = await getPage(slug);
    const page = fallbackPages[slug] ? mergePageWithFallback(cmsPage, fallbackPages[slug]) : cmsPage;
    return {title: page?.seo?.metaTitle || page?.title, description: page?.seo?.metaDescription || page?.excerpt};
}

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    if (slug === "qui-sommes-nous") redirect("/#equipe");
    const cmsPage = await getPage(slug);
    const page = fallbackPages[slug] ? mergePageWithFallback(cmsPage, fallbackPages[slug]) : cmsPage;
    if (!page) notFound();
    return <SectionRenderer blocks={page.blocks}/>;
}
