// ============================================================
// IDENTITÉ DE MARQUE
// ------------------------------------------------------------
// Point unique pour adapter la démo au magasin : nom, signature,
// logo et photos du hero. Les couleurs vivent dans les variables
// CSS de app/globals.css (:root), lues aussi par le canvas des pétales.
// ============================================================

export const BRAND = {
  name: "All Services",
  tagline: "Atelier floral",
  // Chemin vers un fichier dans /public (ex. "/brand/logo.svg").
  // null = logo typographique construit à partir de `name`.
  logo: null as string | null,
  // Coordonnées affichées sur le site (contact, mentions légales, hero).
  city: "Cotonou",
  country: "Bénin",
  address: "Cotonou, Bénin",
  phone: "+229 01 90 00 00 00",
  // Numéro WhatsApp qui reçoit les commandes : indicatif + numéro, chiffres uniquement.
  whatsapp: "2290190000000",
  email: "bonjour@allservices.bj",
  currency: "FCFA",
  // Photos du hero (intro, collage, portail). La première est celle qui passe en plein écran,
  // d'où une source assez large.
  heroImages: [
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=80",
  ],
};
