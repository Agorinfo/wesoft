import {SectionRenderer} from "@/components/SectionRenderer";
import {fallbackHome, mergePageWithFallback} from "@/lib/fallback-content";
import {getPage} from "@/lib/strapi";

export default async function Home() {
    const page = mergePageWithFallback(await getPage("accueil"), fallbackHome);
    return <SectionRenderer blocks={page.blocks}/>;
}
