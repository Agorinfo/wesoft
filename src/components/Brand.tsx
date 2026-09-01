import Image from "next/image";
import Link from "next/link";
import {mediaUrl} from "@/lib/media";
import type {SiteConfig} from "@/types/content";

export function Brand({config}: { config: SiteConfig }) {
    const logo = mediaUrl(config.logo?.url) || "/images/wesoft-logo.png";
    return <Link href="/" className="block h-12 w-[143px] shrink-0 text-[var(--blue)]" aria-label={`${config.siteName || "WeSoft"}, accueil`}>
        <Image className="block h-12 w-[143px] object-contain" src={logo} alt={config.logo?.alternativeText || config.siteName || "WeSoft"} width={143} height={48} priority/>
    </Link>;
}
