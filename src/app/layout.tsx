import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fallbackSite } from "@/lib/fallback-content";
import { getSiteConfig } from "@/lib/strapi";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "WeSoft — Éditeurs de logiciels verticaux", template: "%s | WeSoft" },
  description: "WeSoft accompagne les éditeurs de logiciels verticaux dans leur croissance.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const config = (await getSiteConfig()) || fallbackSite;
  return <html lang="fr"><body><Header config={config}/><main>{children}</main><Footer config={config}/></body></html>;
}
