"use client";

import { useState } from "react";
import { Product, fmt } from "@/lib/data";
import { useCart } from "@/components/CartContext";

export default function ProductDetailClient({
  product,
  variants,
  care,
}: {
  product: Product;
  variants: { label: string; delta: number | null }[];
  care: { q: string; a: string }[];
}) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [variantIdx, setVariantIdx] = useState(1); // "Moyen"
  const [qty, setQty] = useState(1);
  const variant = variants[variantIdx];
  const price = variant.delta === null ? null : product.base + variant.delta;
  const wished = wishlist.includes(product.slug);

  return (
    <div>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>{product.name}</h1>
      <p className="lede" style={{ margin: "0 0 22px" }}>{product.long}</p>

      <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--brass)", marginBottom: 8 }}>
        Choisissez votre composition
      </h4>
      <div className="cols-5" style={{ gap: 10, margin: "0 0 24px" }}>
        {variants.map((v, i) => (
          <button
            key={v.label}
            onClick={() => setVariantIdx(i)}
            style={{
              border: i === variantIdx ? "1.5px solid var(--forest)" : "1.5px solid var(--line)",
              background: i === variantIdx ? "var(--ivory)" : "var(--card)",
              borderRadius: 14, padding: "12px 6px", textAlign: "center", fontSize: 12,
            }}
          >
            <b style={{ display: "block", fontSize: 13 }}>{v.label}</b>
            {v.delta === null ? "Nous contacter" : fmt(product.base + v.delta)}
          </button>
        ))}
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--forest)", margin: "6px 0 18px" }}>
        {price === null ? "Sur devis" : fmt(price)}
      </div>

      {price !== null && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "10px 0 22px" }}>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 999 }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 36, height: 36, border: "none", background: "none", fontSize: 16 }}>−</button>
            <span style={{ width: 30, textAlign: "center", fontWeight: 700 }}>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(9, q + 1))} style={{ width: 36, height: 36, border: "none", background: "none", fontSize: 16 }}>+</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {price !== null ? (
          <button
            className="btn btn-primary btn-block"
            onClick={() => addToCart({ slug: product.slug, variant: variant.label, price, qty })}
          >
            Ajouter au panier
          </button>
        ) : (
          <a href="/contact" className="btn btn-primary btn-block">Contactez-nous</a>
        )}
        <button
          onClick={() => toggleWishlist(product.slug)}
          style={{
            width: 52, height: 52, borderRadius: "50%", border: "1px solid var(--line)", flexShrink: 0,
            background: wished ? "var(--blush)" : "transparent",
          }}
          aria-label="Favoris"
        >
          ♥
        </button>
      </div>

      <ul style={{ listStyle: "none", margin: "22px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        <li style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>✓ Commandez au moins 24h à l&apos;avance</li>
        <li style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>✓ Livraison à domicile ou sur le lieu de votre choix</li>
        <li style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>✓ Aucun compte requis pour commander</li>
      </ul>

      <div style={{ marginTop: 24 }}>
        <h4 style={{ fontSize: 16, marginBottom: 10 }}>Conseils d&apos;entretien</h4>
        {care.map((c) => (
          <details key={c.q} style={{ borderBottom: "1px solid var(--line)", padding: "12px 0" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, color: "var(--forest)" }}>{c.q}</summary>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 10 }}>{c.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
