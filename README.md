# WeSoft — frontend Next.js

Frontend Next.js piloté par le projet Strapi situé dans `../strapi-wesoft`.

## Démarrage

1. Copier `.env.example` vers `.env.local`.
2. Dans Strapi, créer un jeton API en lecture/écriture et renseigner `STRAPI_API_TOKEN`.
3. Démarrer Strapi avec `npm run develop` dans `strapi-wesoft`.
4. Démarrer le site avec `npm run dev` dans ce dossier.

Le site utilise un contenu local de secours pour l’accueil lorsque Strapi est indisponible. Les pages publiées dans Strapi le remplacent automatiquement.

## Contenus administrables

- navigation et bouton d’en-tête ;
- footer de 1 à 5 colonnes ;
- pages composées avec une zone dynamique ;
- boutons internes ou externes et leurs variantes ;
- arrière-plans de section ;
- icônes et couleurs des cartes ;
- articles et libellé du bouton de chaque article ;
- formulaires réutilisables et leurs champs.
