import { siteUrl } from "@/lib/seo";

export const revalidate = 86_400;

/** A concise, machine-readable map of the public WeSoft website. */
export function GET() {
  const content = `# WeSoft

> WeSoft accompagne les éditeurs de logiciels verticaux dans leur croissance, leur transmission et leur développement.

## Pages principales

- [Accueil](${siteUrl}/): Présentation de WeSoft, de son approche et de ses solutions.
- [Solutions](${siteUrl}/#solutions): Solutions et éditeurs de logiciels accompagnés par WeSoft.
- [Processus d’acquisition](${siteUrl}/#processus-acquisition): Étapes de l’accompagnement et de l’intégration au groupe.
- [Qui sommes-nous ?](${siteUrl}/#qui-sommes-nous): Équipe, vision et expertises de WeSoft.
- [Ressources](${siteUrl}/articles): Articles, témoignages et vidéos sur les logiciels verticaux.
- [Contact](${siteUrl}/contact): Formulaire pour présenter un projet ou prendre contact avec WeSoft.

## Informations légales

- [Mentions légales](${siteUrl}/mentions-legales)
- [Politique de confidentialité](${siteUrl}/politique-de-confidentialite)

## Utilisation

Le site est public et en français. Pour une prise de contact, utilisez le formulaire de la page Contact : les informations sont soumises à validation de l’utilisateur avant envoi.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
