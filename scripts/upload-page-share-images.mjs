import fs from "node:fs";
import path from "node:path";

const environment = Object.fromEntries(
  fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.split(/=(.*)/s).slice(0, 2)),
);
const strapiUrl = (environment.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const authorization = { Authorization: `Bearer ${environment.STRAPI_API_TOKEN}` };

const pages = [
  ["accueil", "wesoft-accueil.png", "WeSoft | Éditeurs de logiciels verticaux"],
  ["contact", "wesoft-contact.png", "Contact WeSoft"],
  ["articles", "wesoft-articles.png", "Actualités et ressources WeSoft"],
  ["mentions-legales", "wesoft-mentions-legales.png", "Mentions légales WeSoft"],
  ["politique-de-confidentialite", "wesoft-politique-confidentialite.png", "Politique de confidentialité WeSoft"],
];

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

for (const [slug, filename, alternativeText] of pages) {
  const query = `/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[seo][populate]=shareImage`;
  const page = (await request(`${strapiUrl}${query}`, { headers: authorization })).data?.[0];
  if (!page) throw new Error(`Page Strapi introuvable : ${slug}`);

  const imagePath = path.join(process.cwd(), "public", "og-share", filename);
  const upload = new FormData();
  upload.append("files", new Blob([fs.readFileSync(imagePath)], { type: "image/png" }), filename);
  upload.append("fileInfo", JSON.stringify({ alternativeText, caption: `Image de partage social — ${alternativeText}` }));
  const [media] = await request(`${strapiUrl}/api/upload`, { method: "POST", headers: authorization, body: upload });

  const seo = { ...(page.seo || {}), shareImage: media.id };
  await request(`${strapiUrl}/api/pages/${page.documentId}`, {
    method: "PUT",
    headers: { ...authorization, "Content-Type": "application/json" },
    body: JSON.stringify({ data: { seo } }),
  });
  console.log(`${slug}: ${filename} associé (media ${media.id})`);
}
