import type { Article, CmsPage, FormDefinition, SiteConfig } from "@/types/content";

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

type Entity<T> = T & { attributes?: T };
type ApiResponse<T> = { data: T; meta?: unknown };

type StrapiMediaValue = {
  url?: string;
  mime?: string;
  ext?: string;
  provider?: string;
  formats?: unknown;
};

function flatten<T>(entity: Entity<T> | null | undefined): T | null {
  if (!entity) return null;
  return ({ ...entity, ...(entity.attributes || {}) } as T);
}

function isStrapiMedia(value: Record<string, unknown>): value is Record<string, unknown> & StrapiMediaValue {
  return typeof value.url === "string" && (
    typeof value.mime === "string" ||
    typeof value.ext === "string" ||
    typeof value.provider === "string" ||
    "formats" in value
  );
}

function resolveStrapiMedia<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(resolveStrapiMedia) as T;
  }

  if (!value || typeof value !== "object") return value;

  const source = value as Record<string, unknown>;
  const resolved = Object.fromEntries(
    Object.entries(source).map(([key, child]) => [key, resolveStrapiMedia(child)]),
  );

  if (isStrapiMedia(source)) {
    resolved.url = mediaUrl(source.url);
  }

  return resolved as T;
}

async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`${STRAPI_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(process.env.STRAPI_API_TOKEN ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } : {}), ...init?.headers },
      next: init?.method && init.method !== "GET" ? undefined : { revalidate: 60 },
    });
    if (!response.ok) return null;
    return resolveStrapiMedia((await response.json()) as T);
  } catch {
    return null;
  }
}

export function mediaUrl(url?: string) {
  if (!url) return "";
  const normalizedUrl = url.trim();
  if (/^https?:\/\//i.test(normalizedUrl) || normalizedUrl.startsWith("//")) return normalizedUrl;
  if (normalizedUrl.startsWith("/images/") || normalizedUrl.startsWith("/fonts/")) return normalizedUrl;
  return `${STRAPI_URL}/${normalizedUrl.replace(/^\/+/, "")}`;
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const response = await cmsFetch<ApiResponse<Entity<SiteConfig>>>("/api/site-config?populate[logo]=true&populate[navigation][populate][children]=true&populate[headerButton]=true&populate[footerColumns][populate][links]=true&populate[socialLinks]=true&populate[legalLinks]=true&populate[articleSidebarPrimaryButton]=true&populate[articleSidebarSecondaryButton]=true");
  return flatten(response?.data);
}

export async function getPage(slug: string): Promise<CmsPage | null> {
  const query = encodeURIComponent(slug);
  const simpleBlocks = [
    "sections.hero", "sections.feature-grid", "sections.process",
    "sections.metrics", "sections.cta", "sections.article-list", "sections.form-section", "sections.rich-text",
    "sections.contact",
  ].map((name) => `populate[blocks][on][${name}][populate]=*`);
  const nestedBlocks = [
    "populate[blocks][on][sections.software-showcase][populate][items][populate]=*",
    "populate[blocks][on][sections.business-characteristics][populate][cards]=true",
    "populate[blocks][on][sections.business-characteristics][populate][button]=true",
    "populate[blocks][on][sections.testimonial-metrics][populate][testimonials][populate][avatar]=true",
    "populate[blocks][on][sections.testimonial-metrics][populate][testimonials][populate][metrics]=true",
    "populate[blocks][on][sections.team][populate][members][populate]=*",
    "populate[blocks][on][sections.legal-content][populate][sections]=true",
  ];
  const blockPopulate = [...simpleBlocks, ...nestedBlocks].join("&");
  const response = await cmsFetch<ApiResponse<Entity<CmsPage>[]>>(`/api/pages?filters[slug][$eq]=${query}&populate[seo][populate]=*&${blockPopulate}`);
  return flatten(response?.data?.[0]);
}

export async function getArticles(limit = 12): Promise<Article[]> {
  const response = await cmsFetch<ApiResponse<Entity<Article>[]>>(`/api/articles?sort=publishedDate:desc&pagination[pageSize]=${limit}&populate=cover`);
  return response?.data?.map((item) => flatten(item) as Article) || [];
}

export async function getArticle(slug: string): Promise<Article | null> {
  const response = await cmsFetch<ApiResponse<Entity<Article>[]>>(`/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[cover]=true&populate[relatedArticles][populate][cover]=true&populate[seo][populate]=*`);
  return flatten(response?.data?.[0]);
}

export async function getForm(idOrSlug: string | number): Promise<FormDefinition | null> {
  const filter = typeof idOrSlug === "number" ? `filters[id][$eq]=${idOrSlug}` : `filters[slug][$eq]=${encodeURIComponent(idOrSlug)}`;
  const response = await cmsFetch<ApiResponse<Entity<FormDefinition>[]>>(`/api/forms?${filter}&populate[fields][populate][options]=true`);
  return flatten(response?.data?.[0]);
}

export async function createSubmission(payload: unknown) {
  return cmsFetch<ApiResponse<unknown>>("/api/form-submissions", { method: "POST", body: JSON.stringify({ data: payload }), cache: "no-store" });
}
