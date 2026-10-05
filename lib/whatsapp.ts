import { BRAND } from "./brand";
import { findProduct, fmt } from "./data";
import type { CartItem } from "@/components/CartContext";

export type OrderRequest = {
  ref: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    landmark: string;
    date: string;
    message: string;
  };
};

// Plain-text order summary. Kept channel-agnostic so an email notification
// can reuse it later without changing the cart.
export function orderMessage(o: OrderRequest) {
  const c = o.customer;
  const lines = o.items.map((i) => {
    const name = findProduct(i.slug)?.name ?? i.slug;
    return `• ${i.qty} × ${name} (${i.variant}) : ${fmt(i.price * i.qty)}`;
  });
  const date = c.date ? new Date(`${c.date}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "";

  // Sections are joined by a blank line; empty optional lines are dropped.
  const sections = [
    [`Bonjour ${BRAND.name}, je souhaite passer commande.`, `Référence : ${o.ref}`],
    [
      "*Commande*",
      ...lines,
      `Sous-total : ${fmt(o.subtotal)}`,
      `Livraison : ${o.shipping === 0 ? "offerte" : fmt(o.shipping)}`,
      `*Total : ${fmt(o.subtotal + o.shipping)}*`,
    ],
    [
      "*Livraison*",
      `${c.name} · ${c.phone}`,
      c.email,
      `${c.address}, ${c.landmark}, ${c.city}`,
      date && `Date souhaitée : ${date}`,
      c.message && `Message : ${c.message}`,
    ],
  ];
  return sections.map((section) => section.filter(Boolean).join("\n")).join("\n\n");
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}
