const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.wesoft.fr").trim();

// Hosting dashboards sometimes expose a bare hostname (for example
// "wesoft.vercel.app"). `new URL()` requires a protocol, so default to HTTPS
// while still accepting a complete http(s) URL for local development.
export const siteUrl = (/^https?:\/\//i.test(configuredSiteUrl)
  ? configuredSiteUrl
  : `https://${configuredSiteUrl}`).replace(/\/$/, "");

export function absoluteUrl(pathOrUrl = "/") {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`, `${siteUrl}/`).toString();
}

export function toIsoDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString();
}
