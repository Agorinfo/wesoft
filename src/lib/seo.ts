const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.wesoft.fr";

export const siteUrl = configuredSiteUrl.replace(/\/$/, "");

export function absoluteUrl(pathOrUrl = "/") {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`, `${siteUrl}/`).toString();
}

export function toIsoDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString();
}
