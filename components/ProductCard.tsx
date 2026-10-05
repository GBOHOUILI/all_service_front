"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, fmt } from "@/lib/data";
import { useCart } from "./CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const wished = wishlist.includes(product.slug);

  return (
    <div className="card p-card">
      <Link href={`/produit/${product.slug}`} className="p-media" style={{ display: "block" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className="p-body">
        <Link href={`/produit/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>{product.desc}</p>
        <div className="p-foot">
          <span className="price">À partir de {fmt(product.base)}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Favoris"
              style={{
                width: 34, height: 34, borderRadius: "50%", border: "1px solid var(--line)",
                background: wished ? "var(--blush)" : "transparent", color: wished ? "#7a3c30" : "var(--forest)",
              }}
            >
              ♥
            </button>
            <button
              onClick={() => addToCart({ slug: product.slug, variant: "Moyen", price: product.base, qty: 1 })}
              aria-label="Ajouter au panier"
              style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid var(--line)", background: "transparent", color: "var(--forest)" }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
