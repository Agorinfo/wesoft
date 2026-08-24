import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PreviewBanner } from "@/components/PreviewBanner";
import { fallbackSite } from "@/lib/fallback-content";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { getSiteConfig } from "@/lib/strapi";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "WeSoft — Éditeurs de logiciels verticaux", template: "%s | WeSoft" },
  description: "WeSoft accompagne les éditeurs de logiciels verticaux dans leur croissance.",
  applicationName: "WeSoft",
  authors: [{ name: "WeSoft", url: siteUrl }],
  creator: "WeSoft",
  publisher: "WeSoft",
  category: "Logiciels B2B",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "WeSoft",
    title: "WeSoft — Éditeurs de logiciels verticaux",
    description: "WeSoft accompagne les éditeurs de logiciels verticaux dans leur croissance.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "WeSoft, éditeurs de logiciels verticaux" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeSoft — Éditeurs de logiciels verticaux",
    description: "WeSoft accompagne les éditeurs de logiciels verticaux dans leur croissance.",
    images: ["/twitter-image.png"],
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const config = (await getSiteConfig()) || fallbackSite;
  const socialLinks = config.socialLinks?.map((link) => link.href).filter((href) => /^https?:\/\//.test(href)) || [];
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.siteName || "WeSoft",
    url: siteUrl,
    logo: absoluteUrl(config.logo?.url || "/icon.svg"),
    description: "WeSoft accompagne les éditeurs de logiciels verticaux dans leur croissance.",
    sameAs: socialLinks,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.siteName || "WeSoft",
    url: siteUrl,
    inLanguage: "fr-FR",
    publisher: { "@type": "Organization", name: config.siteName || "WeSoft" },
  };
  const structuredData = JSON.stringify([organization, website]).replace(/</g, "\\u003c");
  return <html lang="fr"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} /><Header config={config}/><main>{children}</main><Footer config={config}/><PreviewBanner /></body></html>;
}
