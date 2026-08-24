const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

/** Resolves Strapi media URLs without importing server-only data helpers. */
export function mediaUrl(url?: string) {
  if (!url) return "";
  const normalizedUrl = url.trim();
  if (/^https?:\/\//i.test(normalizedUrl) || normalizedUrl.startsWith("//")) return normalizedUrl;
  if (normalizedUrl.startsWith("/images/") || normalizedUrl.startsWith("/fonts/")) return normalizedUrl;
  return `${STRAPI_URL}/${normalizedUrl.replace(/^\/+/, "")}`;
}
