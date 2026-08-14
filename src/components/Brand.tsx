import Image from "next/image";
import Link from "next/link";
import {mediaUrl} from "@/lib/strapi";
import type {SiteConfig} from "@/types/content";

export function Brand({config}: { config: SiteConfig }) {
    const logo = mediaUrl(config.logo?.url) || "/images/wesoft-logo.png";
    return <Link href="/" className="block h-10 w-[119px] shrink-0 text-[var(--blue)]" aria-label={`${config.siteName || "WeSoft"}, accueil`}>
        <Image className="block h-10 w-[119px] object-contain" src={logo} alt={config.logo?.alternativeText || config.siteName || "WeSoft"} width={119} height={40} priority/>
    </Link>;
}
