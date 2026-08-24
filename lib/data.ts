// ============================================================
// DONNÉES EN MÉMOIRE
// ------------------------------------------------------------
export type Product = {
  slug: string;
  name: string;
  cat: "bouquets" | "vase" | "couronnes" | "plantes";
  events: string[];
  base: number;
  desc: string;
  long: string;
  art: "stems" | "vase" | "wreath" | "pot";
  accent: string;
  care: "bouquet" | "vase" | "couronne" | "plante";
  image: string;
  hidden?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    slug: "bouquet-romantique",
    name: "Bouquet Romantique",
    cat: "bouquets",
    events: ["saint-valentin", "anniversaire"],
    base: 65,
    desc: "Un bouquet délicat aux tons pastel pour des moments tendres.",
    long: "Composé à la main le jour de votre commande, ce bouquet marie roses pastel, renoncules et fleurs de saison choisies une à une pour leur nuance et leur tenue. Sa palette douce — blush, ivoire et vert tendre — en fait une déclaration discrète mais sincère, aussi bien pour surprendre un être cher que pour accompagner une déclaration.",
    art: "stems",
    accent: "var(--blush)",
    care: "bouquet",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85",
  },

  {
    slug: "bouquet-elegance",
    name: "Bouquet Élégance",
    cat: "bouquets",
    events: ["mariage", "remerciement"],
    base: 70,
    desc: "Une composition raffinée, fraîcheur et pureté en parfaite harmonie.",
    long: "Un jeu de blancs et de verts tendres, pensé pour les grandes occasions. Roses David Austin, eucalyptus et pivoines de saison composent une silhouette aérienne, taillée pour sublimer une table de réception comme un geste de remerciement.",
    art: "stems",
    accent: "var(--sage)",
    care: "bouquet",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",
  },

  {
    slug: "bouquet-douceur",
    name: "Bouquet Douceur",
    cat: "vase",
    events: ["naissance", "anniversaire"],
    base: 60,
    desc: "Harmonie de fleurs pâles et de feuillages pour une touche de douceur.",
    long: "Présentée en vase, cette composition tout en légèreté associe fleurs blanches et branchages délicats. Livrée directement dans son contenant, elle ne demande qu'à être posée — idéale pour une naissance ou un simple geste d'attention.",
    art: "vase",
    accent: "var(--sage)",
    care: "vase",
    image:
      "https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=1200&q=85",
  },

  {
    slug: "centre-de-table-nature",
    name: "Centre de table Nature",
    cat: "couronnes",
    events: ["mariage"],
    base: 85,
    desc: "Une composition verdoyante pour sublimer vos tables.",
    long: "Pensé pour les tables de réception, ce centre de table associe feuillages structurés et touches florales discrètes. Sa forme basse et allongée facilite la conversation entre convives tout en habillant la table du sol au plafond de verdure.",
    art: "wreath",
    accent: "var(--sage)",
    care: "couronne",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85",
  },

  {
    slug: "bouquet-harmonie",
    name: "Bouquet Harmonie",
    cat: "bouquets",
    events: ["anniversaire", "fete-des-meres"],
    base: 68,
    desc: "Équilibre parfait entre fleurs pastel et touches de verdure.",
    long: "Un équilibre subtil entre rondeur des fleurs pastel et légèreté de la verdure. Une création généreuse et intemporelle, parfaite pour marquer un anniversaire ou célébrer une maman.",
    art: "stems",
    accent: "var(--blush)",
    care: "bouquet",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85",
  },

  {
    slug: "bouquet-fraicheur",
    name: "Bouquet Fraîcheur",
    cat: "vase",
    events: ["remerciement", "naissance"],
    base: 62,
    desc: "Un bouquet lumineux, idéal pour égayer chaque journée.",
    long: "Vif et lumineux, ce bouquet en vase apporte une note de fraîcheur immédiate à n'importe quel intérieur. Tons jaunes, blancs et verts pour une composition qui illumine un bureau, une entrée ou une table de cuisine.",
    art: "vase",
    accent: "var(--brass)",
    care: "vase",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=85",
  },

  {
    slug: "couronne-florale",
    name: "Couronne Florale",
    cat: "couronnes",
    events: ["deuil", "mariage"],
    base: 90,
    desc: "Couronne raffinée pour célébrer chaque instant important.",
    long: "Réalisée à la main avec un soin particulier, cette couronne accompagne aussi bien les moments de recueillement que les célébrations. Structure renforcée, fleurs et feuillages nobles sélectionnés pour leur tenue.",
    art: "wreath",
    accent: "var(--blush)",
    care: "couronne",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85",
  },

  {
    slug: "cadeau-floral",
    name: "Cadeau Floral",
    cat: "plantes",
    events: ["remerciement", "anniversaire"],
    base: 55,
    desc: "Une attention délicate alliant beauté et émotion.",
    long: "Une plante fleurie présentée dans un cache-pot en céramique brute, pensée comme un cadeau durable. Contrairement à un bouquet, elle continue d'accompagner son destinataire bien après le jour J.",
    art: "pot",
    accent: "var(--sage)",
    care: "plante",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1200&q=85",
  },

  {
    slug: "composition-sur-mesure",
    name: "Composition Sur-Mesure",
    cat: "bouquets",
    events: [
      "mariage",
      "anniversaire",
      "naissance",
      "deuil",
      "fete-des-meres",
      "saint-valentin",
      "remerciement",
    ],
    base: 75,
    desc: "Une création unique, imaginée avec vous.",
    long: "Une composition pensée avec vous, selon vos couleurs, votre budget et l'occasion à célébrer.",
    art: "stems",
    accent: "var(--brass)",
    care: "bouquet",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
    hidden: true,
  },
];

// Génère une petite galerie [image principale, +2 variantes] à partir
// du chemin de l'image principale — remplace juste les 3 fichiers
// correspondants dans /public (ou passe 3 URLs si tu préfères).
export function productGallery(p: Product): string[] {
  const match = p.image.match(/^(.*)(\.[a-zA-Z]+)$/);
  if (!match) return [p.image, p.image, p.image];
  const [, base, ext] = match;
  return [p.image, `${base}-2${ext}`, `${base}-3${ext}`];
}

export const CATS = [
  { key: "all", label: "Toutes les compositions" },
  { key: "bouquets", label: "Bouquets" },
  { key: "vase", label: "Compositions en vase" },
  { key: "couronnes", label: "Couronnes & centres de table" },
  { key: "plantes", label: "Plantes & cadeaux floraux" },
] as const;

export const CATEGORY_HIGHLIGHTS = [
  {
    key: "bouquets",
    label: "Bouquets",
    desc: "Compositions à offrir ou à s'offrir, assemblées à la main.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85",
  },
  {
    key: "vase",
    label: "Compositions en vase",
    desc: "Prêtes à poser, livrées directement dans leur contenant.",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=85",
  },
  {
    key: "couronnes",
    label: "Couronnes & centres de table",
    desc: "Pour les grandes tables et les moments de recueillement.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85",
  },
  {
    key: "plantes",
    label: "Plantes & cadeaux floraux",
    desc: "Des cadeaux qui durent, entre nature et élégance.",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1000&q=85",
  },
] as const;

export const EVENTS = [
  { key: "all", label: "Tous les événements" },
  { key: "mariage", label: "Mariage" },
  { key: "anniversaire", label: "Anniversaire" },
  { key: "naissance", label: "Naissance" },
  { key: "deuil", label: "Deuil & Hommage" },
  { key: "fete-des-meres", label: "Fête des mères" },
  { key: "saint-valentin", label: "Saint-Valentin" },
  { key: "remerciement", label: "Remerciement" },
] as const;

export const VARIANT_OFFSETS = [
  { label: "Petit", delta: -20 },
  { label: "Moyen", delta: 0 },
  { label: "Grand", delta: 25 },
  { label: "Luxe", delta: 65 },
  { label: "Sur-mesure", delta: null as number | null },
];

export const CARE_SETS: Record<string, { q: string; a: string }[]> = {
  bouquet: [
    { q: "Comment prolonger la fraîcheur ?", a: "Recoupez les tiges en biseau tous les deux jours et changez l'eau régulièrement, à température ambiante." },
    { q: "Où placer votre bouquet ?", a: "Évitez le soleil direct, les courants d'air et la proximité des fruits mûrs." },
    { q: "Entretien du feuillage", a: "Retirez les feuilles qui tremperaient dans l'eau pour éviter le développement de bactéries." },
  ],
  vase: [
    { q: "Quand renouveler l'eau ?", a: "Changez l'eau du vase tous les 2 à 3 jours en rinçant bien les tiges." },
    { q: "Quel emplacement choisir ?", a: "Loin des sources de chaleur et à l'abri des rayons directs du soleil." },
    { q: "Faut-il recouper les tiges ?", a: "Oui, recoupez 1 à 2 cm en biseau à chaque changement d'eau." },
  ],
  couronne: [
    { q: "Comment conserver une couronne ?", a: "Gardez-la dans un endroit frais, à l'abri du soleil direct." },
    { q: "Peut-elle être suspendue ?", a: "Oui, nos couronnes ont une structure renforcée pour être suspendues ou posées à plat." },
    { q: "Durée de tenue estimée", a: "Entre 4 et 8 jours selon les fleurs choisies." },
  ],
  plante: [
    { q: "Fréquence d'arrosage", a: "Arrosez modérément, en laissant sécher la surface du terreau entre deux arrosages." },
    { q: "Quelle luminosité ?", a: "Une lumière vive mais indirecte convient à la majorité de nos plantes." },
    { q: "Faut-il rempoter ?", a: "Un rempotage tous les 12 à 18 mois favorise une croissance saine." },
  ],
};

export const BLOG = [
  {
    slug: "faire-durer-bouquet",
    title: "Comment faire durer un bouquet plus longtemps",
    cat: "Entretien",
    read: "4 min",
    art: "stems",
    accent: "var(--sage)",
    image:
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=85",
    excerpt:
      "Trois gestes simples, à répéter chaque semaine, pour prolonger sensiblement la fraîcheur de vos compositions.",
    html: `<p>Un bouquet frais mérite quelques attentions régulières pour révéler tout son éclat le plus longtemps possible.</p>
    <h2>1. Recoupez les tiges en biseau</h2>
    <p>Dès réception, recoupez chaque tige en biseau sur 1 à 2 cm.</p>
    <h2>2. Changez l'eau tous les deux jours</h2>
    <p>L'eau stagnante favorise le développement de bactéries qui bouchent les tiges.</p>
    <h2>3. Choisissez le bon emplacement</h2>
    <p>Évitez le soleil direct, les courants d'air et les radiateurs.</p>`,
  },

  {
    slug: "quelles-fleurs-offrir",
    title: "Quelles fleurs offrir selon l'occasion",
    cat: "Inspiration",
    read: "5 min",
    art: "vase",
    accent: "var(--blush)",
    image:
      "https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=1200&q=85",
    excerpt:
      "Un petit guide pour choisir la composition la plus juste, quel que soit le moment que vous célébrez.",
    html: `<p>Chaque occasion appelle une intention florale différente.</p>
    <h2>Pour une naissance</h2>
    <p>Privilégiez les teintes douces — blanc, vert tendre, rose pâle.</p>
    <h2>Pour un mariage</h2>
    <p>Les compositions structurées s'accordent aux grandes tables de réception.</p>
    <h2>Pour un hommage</h2>
    <p>Une couronne sobre traduit avec justesse le recueillement.</p>`,
  },

  {
    slug: "entretenir-plantes-hiver",
    title: "Entretenir ses plantes d'intérieur en hiver",
    cat: "Plantes",
    read: "3 min",
    art: "pot",
    accent: "var(--sage)",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=85",
    excerpt:
      "L'hiver ralentit la croissance des plantes : voici comment adapter leur entretien à cette saison plus exigeante.",
    html: `<p>Le chauffage et l'air plus sec de l'hiver demandent d'ajuster l'entretien de vos plantes.</p>
    <h2>Espacez les arrosages</h2>
    <p>La croissance ralentit en hiver.</p>
    <h2>Éloignez-les des radiateurs</h2>
    <p>L'air chaud et sec dessèche rapidement le feuillage.</p>`,
  },
];

export const FAQ = [
  { q: "Sous quel délai puis-je recevoir ma commande ?", a: "Les commandes passées avant 12h sont livrées le jour même sur Paris et proche banlieue." },
  { q: "Puis-je modifier ou annuler ma commande ?", a: "Toute modification est possible jusqu'à 24h avant la livraison prévue, en nous contactant." },
  { q: "Proposez-vous des compositions sur-mesure ?", a: "Oui, contactez-nous avec vos envies et notre atelier vous proposera une création unique." },
  { q: "Dois-je créer un compte pour commander ?", a: "Non. Vous pouvez commander en tant qu'invité·e : la création d'un compte est entièrement facultative." },
  { q: "Quels moyens de paiement acceptez-vous ?", a: "Le paiement en ligne arrive bientôt. En attendant, contactez-nous pour finaliser votre commande." },
];

export const GALLERY_ITEMS = [
  {
    cat: "Ateliers",
    art: "stems",
    accent: "var(--blush)",
    title: "Préparation matinale",
    caption: "Sélection quotidienne des tiges fraîches à l'atelier.",
    image:
      "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1200&q=85",
  },

  {
    cat: "Mariages",
    art: "wreath",
    accent: "var(--blush)",
    title: "Cérémonie en extérieur",
    caption: "Structure végétale pour une arche de cérémonie.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
  },

  {
    cat: "Compositions du quotidien",
    art: "vase",
    accent: "var(--sage)",
    title: "Vase du salon",
    caption: "Fleurs de saison pour un intérieur lumineux.",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85",
  },

  {
    cat: "Événements",
    art: "wreath",
    accent: "var(--brass)",
    title: "Lancement de marque",
    caption: "Installation florale pour un événement corporate.",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",
  },

  {
    cat: "Ateliers",
    art: "pot",
    accent: "var(--sage)",
    title: "Mise en pot",
    caption: "Rempotage soigné de nos plantes fleuries.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=85",
  },

  {
    cat: "Mariages",
    art: "vase",
    accent: "var(--sage)",
    title: "Centre de table",
    caption: "Compositions basses pour tables de réception.",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
  },

  {
    cat: "Mariages",
    art: "stems",
    accent: "var(--brass)",
    title: "Bouquet de mariée",
    caption: "Bouquet rond, tons ivoire et sauge.",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85",
  },

  {
    cat: "Compositions du quotidien",
    art: "pot",
    accent: "var(--blush)",
    title: "Cadeau floral",
    caption: "Une plante fleurie offerte avec soin.",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1200&q=85",
  },
];

export const GALLERY_CATS = [
  "Tous",
  "Ateliers",
  "Mariages",
  "Événements",
  "Compositions du quotidien",
];

// ---- Espace client / admin ----

export type Customer = { id: string; name: string; email: string; phone: string; city: string; orders: number; spent: number; last: string; status: "Actif" | "Inactif" };
export const CUSTOMERS: Customer[] = [
  { id: "CL-01", name: "Camille Rousseau", email: "camille.rousseau@mail.fr", phone: "06 12 34 56 78", city: "Paris 11e", orders: 6, spent: 412, last: "12 août 2026", status: "Actif" },
  { id: "CL-02", name: "Julien Ferreira", email: "julien.ferreira@mail.fr", phone: "06 98 76 54 32", city: "Paris 15e", orders: 2, spent: 145, last: "2 juillet 2026", status: "Actif" },
  { id: "CL-03", name: "Sofia Marchetti", email: "sofia.marchetti@mail.fr", phone: "07 44 55 66 12", city: "Boulogne-Billancourt", orders: 9, spent: 730, last: "15 août 2026", status: "Actif" },
];

export type OrderItem = { slug: string; variant: string; qty: number; price: number };
export type Order = { id: string; customerId: string; customerName: string; date: string; items: OrderItem[]; delivery: number; payment: string; status: string; address: string };
export const ORDERS: Order[] = [
  { id: "AS-104822", customerId: "CL-01", customerName: "Camille Rousseau", date: "18 août 2026", items: [{ slug: "bouquet-romantique", variant: "Moyen", qty: 1, price: 65 }], delivery: 9, payment: "En attente", status: "Nouvelle", address: "14 rue de Charonne, 75011 Paris" },
  { id: "AS-104810", customerId: "CL-03", customerName: "Sofia Marchetti", date: "17 août 2026", items: [{ slug: "couronne-florale", variant: "Grand", qty: 1, price: 115 }], delivery: 9, payment: "En attente", status: "Confirmée", address: "8 avenue Jean Jaurès, 92100 Boulogne-Billancourt" },
];
export const ORDER_STATUSES = ["Nouvelle", "Confirmée", "En préparation", "Expédiée", "Livrée", "Annulée"];

export type Review = {
  id: number;
  customer: string;
  city: string;
  rating: number;
  product: string;
  comment: string;
  date: string;
  status: "Approuvé" | "En attente" | "Masqué";
  avatar?: string;
};

export const REVIEWS: Review[] = [
  {
    id: 1,
    customer: "Camille R.",
    city: "Cotonou",
    rating: 5,
    product: "Bouquet Romantique",
    comment:
      "Chaque bouquet est magnifique et le service est impeccable. La composition tenait encore parfaitement après une semaine.",
    date: "14 août 2026",
    status: "Approuvé",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200&q=85",
  },
  {
    id: 2,
    customer: "Julien F.",
    city: "Cotonou",
    rating: 5,
    product: "Couronne Florale",
    comment:
      "Livraison ponctuelle et composition sublime, exactement ce que j'avais imaginé pour l'événement.",
    date: "10 août 2026",
    status: "Approuvé",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=85",
  },
  {
    id: 3,
    customer: "Sofia M.",
    city: "Abomey-Calavi",
    rating: 4,
    product: "Bouquet Élégance",
    comment:
      "Très joli bouquet, une fleur légèrement fanée à l'arrivée mais le service client a été très réactif.",
    date: "9 août 2026",
    status: "En attente",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=85",
  },
  {
    id: 4,
    customer: "Hugo V.",
    city: "Porto-Novo",
    rating: 5,
    product: "Cadeau Floral",
    comment:
      "Un cadeau qui a fait énormément plaisir, la plante est arrivée en parfait état et le cache-pot est très élégant.",
    date: "5 août 2026",
    status: "Approuvé",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=85",
  },
  {
    id: 5,
    customer: "Léa D.",
    city: "Cotonou",
    rating: 5,
    product: "Composition Sur-Mesure",
    comment:
      "L'équipe a su traduire exactement l'ambiance que je voulais pour mon mariage. Un grand merci à toute l'équipe.",
    date: "1 août 2026",
    status: "Approuvé",
    avatar:
      "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=200&h=200&q=85",
  },
];

export type AdminMessage = { id: number; name: string; email: string; subject: string; date: string; status: "Non lu" | "Lu" | "Répondu"; message: string };
export const ADMIN_MESSAGES: AdminMessage[] = [
  { id: 1, name: "Camille Rousseau", email: "camille.rousseau@mail.fr", subject: "Question sur une commande sur-mesure", date: "18 août 2026", status: "Non lu", message: "Bonjour, je souhaiterais une composition sur-mesure pour un mariage en septembre, dans des tons terracotta." },
  { id: 2, name: "Hugo Vasseur", email: "hugo.vasseur@mail.fr", subject: "Retard de livraison", date: "17 août 2026", status: "Lu", message: "Ma commande devait être livrée hier à 14h et je n'ai encore rien reçu." },
];

export const ADMIN_USERS = [
  { name: "Aïcha Bamba", email: "aicha@allservices.fr", role: "Super Admin", status: "Actif", last: "Aujourd'hui, 09:12" },
  { name: "Mehdi Alaoui", email: "mehdi@allservices.fr", role: "Administrateur", status: "Actif", last: "Hier, 18:40" },
];

export const WEEK_SALES = [
  { l: "Lun", v: 38 }, { l: "Mar", v: 52 }, { l: "Mer", v: 44 }, { l: "Jeu", v: 61 }, { l: "Ven", v: 78 }, { l: "Sam", v: 95 }, { l: "Dim", v: 58 },
];

// ---- Helpers ----
export function findProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
export function relatedProducts(product: Product, max = 4) {
  return PRODUCTS.filter((p) => !p.hidden && p.slug !== product.slug && p.cat === product.cat).slice(0, max);
}
export function orderTotal(o: Order) {
  return o.items.reduce((s, i) => s + i.price * i.qty, 0) + o.delivery;
}
export function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " €";
}
export function findOrder(id: string) {
  return ORDERS.find((o) => o.id === id);
}
