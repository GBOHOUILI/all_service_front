# All Services — Next.js

Migration du prototype HTML vers une vraie application Next.js (App Router, TypeScript).

## Démarrer en local

```bash
npm install
npm run dev
```
Puis ouvrez http://localhost:3000

## Ce qui a changé par rapport au fichier HTML unique

- **Un fichier par page** au lieu d'un fichier de 3000 lignes : chaque route vit dans `app/.../page.tsx`.
- **Données centralisées** dans `lib/data.ts` — produits, commandes, clients, avis, etc. Aujourd'hui en mémoire ; demain, chaque export de ce fichier peut devenir une requête vers une vraie base de données sans casser le reste de l'app.
- **Panier & favoris** gérés par `components/CartContext.tsx`, persistés en `localStorage` (donc propres à chaque navigateur, pas encore liés à un compte serveur).
- **Espace admin protégé** par un cookie simple (`middleware.ts` + `app/api/admin-login`). Fonctionne pour l'UX, mais n'importe quel email/mot de passe est accepté — voir "Sécurité" ci-dessous.

## Ce qui est volontairement une démo (à faire avant mise en production)

| Sujet | État actuel | Pour la vraie version |
|---|---|---|
| **Paiement** | Pas de paiement en ligne. Le panier envoie une "demande de commande" (nom, coordonnées) — pas de carte bancaire demandée. | Intégrer Stripe/PayPal côté serveur (API route `app/api/checkout`) quand vous serez prêts. |
| **Authentification** | Cookie non signé, accepte n'importe quel identifiant. | Remplacer par NextAuth, Clerk, ou une vérification de mot de passe hashé (bcrypt) contre une vraie base. |
| **Données** | Tout est codé en dur dans `lib/data.ts`, remis à zéro à chaque redémarrage du serveur. | Brancher Postgres/Supabase/PlanetScale via Prisma ou un client SQL, en gardant la même forme d'exports pour limiter les changements ailleurs. |
| **Emails** (confirmation, contact) | Les formulaires affichent juste un message de succès, rien n'est envoyé. | Brancher un service d'emailing (Resend, Postmark) dans les routes API correspondantes. |

## Structure

```
app/
  page.tsx                  → Accueil
  boutique/                 → Liste produits (filtres via ?cat=&event=&q=)
  produit/[slug]/           → Fiche produit (page.tsx = serveur, ProductDetailClient.tsx = interactif)
  panier/                   → Panier + formulaire de demande de commande (pas de paiement)
  sur-mesure/                → Configurateur de composition
  galerie/, conseils/, a-propos/, contact/  → Pages de contenu
  faq/, cgv/, mentions-legales/, livraison-retours/, confidentialite/, cookies/ → Pages légales
  connexion/, inscription/, mot-de-passe-oublie/, compte/  → Espace client (mock)
  admin/                     → Dashboard pro, protégé par middleware.ts
  api/admin-login/, api/admin-logout/  → Pose/retire le cookie de session admin (mock)
lib/data.ts                  → Toutes les données (le futur point de bascule vers une vraie DB)
components/                  → Header, Footer, CartContext, ProductCard, AdminShell, LegalLayout
middleware.ts                 → Protège /admin/* si pas de cookie de session
```

## Prochaines pages admin à ajouter

Le dashboard, les commandes, les produits, les clients, les avis et les messages sont construits.
Il manque encore (dans le HTML d'origine, mais pas repris ici faute de besoin immédiat) :
catégories, articles de blog, médiathèque, promotions, livraison, paiements, statistiques détaillées,
paramètres, gestion des administrateurs. Chacune suit exactement le même modèle qu'`app/admin/clients/page.tsx` :
importer les données depuis `lib/data.ts`, les afficher dans `<AdminShell>`. Dites-moi lesquelles sont prioritaires
et je les ajoute.
