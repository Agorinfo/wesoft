import type { Metadata } from "next";
import {SectionRenderer} from "@/components/SectionRenderer";
import {fallbackHome, mergePageWithFallback} from "@/lib/fallback-content";
import {getPage} from "@/lib/strapi";
import {mediaUrl} from "@/lib/media";

export async function generateMetadata(): Promise<Metadata> {
    const page = mergePageWithFallback(await getPage("accueil"), fallbackHome);
    const title = page.seo?.metaTitle || page.title || "WeSoft — Éditeurs de logiciels verticaux";
    const description = page.seo?.metaDescription || page.excerpt || "WeSoft accompagne les éditeurs de logiciels verticaux dans leur croissance.";
    const image = page.seo?.shareImage?.url ? mediaUrl(page.seo.shareImage.url) : "/opengraph-image.png";
    return {
        title,
        description,
        alternates: { canonical: "/" },
        openGraph: { type: "website", url: "/", title, description, images: [{ url: image, alt: title }] },
        twitter: { card: "summary_large_image", title, description, images: [image] },
    };
}

export default async function Home() {
    const page = mergePageWithFallback(await getPage("accueil"), fallbackHome);
    return <SectionRenderer blocks={page.blocks}/>;
}
