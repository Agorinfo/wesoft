import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const assetsDirectory = path.join(process.cwd(), "public", "og-share");
const masterImage = path.join(assetsDirectory, "wesoft-og-master.png");
const logo = fs.readFileSync(path.join(assetsDirectory, "wesoft-logo.svg")).toString("base64");

const pages = [
  ["accueil", "WeSoft | Éditeurs de logiciels verticaux"],
  ["contact", "Contact"],
  ["articles", "Actualités et ressources WeSoft"],
  ["mentions-legales", "Mentions légales"],
  ["politique-confidentialite", "Politique de confidentialité"],
];

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character]);
}

function splitTitle(title) {
  const words = title.split(" ");
  const lines = [""];
  for (const word of words) {
    const next = `${lines.at(-1)} ${word}`.trim();
    if (next.length > 30 && lines.length < 2) lines.push(word);
    else lines[lines.length - 1] = next;
  }
  return lines;
}

function overlay(title) {
  const lines = splitTitle(title);
  const titleMarkup = lines.map((line, index) => `<tspan x="78" dy="${index === 0 ? 0 : 58}">${escapeXml(line)}</tspan>`).join("");
  const panelHeight = lines.length === 1 ? 145 : 205;
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="panel" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#003b7d" stop-opacity=".96"/><stop offset="1" stop-color="#004d99" stop-opacity=".88"/></linearGradient></defs>
    <rect x="55" y="${555 - panelHeight}" width="745" height="${panelHeight}" rx="18" fill="url(#panel)"/>
    <rect x="55" y="${555 - panelHeight}" width="8" height="${panelHeight}" rx="4" fill="#02a1ff"/>
    <image href="data:image/svg+xml;base64,${logo}" x="68" y="58" width="210" height="60" preserveAspectRatio="xMinYMid meet"/>
    <text x="78" y="${555 - panelHeight + 60}" fill="#a8e3ff" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="3">WESOFT</text>
    <text x="78" y="${555 - panelHeight + 108}" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="700">${titleMarkup}</text>
  </svg>`);
}

await Promise.all(pages.map(async ([slug, title]) => {
  await sharp(masterImage)
    .composite([{ input: overlay(title) }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(assetsDirectory, `wesoft-${slug}.png`));
}));
