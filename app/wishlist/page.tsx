"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="wrap">
          <div className="empty-state">
            <h3>Votre liste d&apos;envies est vide</h3>
            <p>Ajoutez vos compositions préférées en cliquant sur le cœur.</p>
            <Link href="/boutique" className="btn btn-primary">Découvrir la boutique</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap">
        <h1 style={{ fontSize: 30, marginBottom: 26 }}>Vos favoris</h1>
        <div className="grid-products">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  );
}
