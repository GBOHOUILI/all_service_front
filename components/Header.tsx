"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { BRAND } from "@/lib/brand";
import { DEMO_PAGES } from "@/lib/features";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/sur-mesure", label: "Sur-mesure" },
  { href: "/galerie", label: "Galerie" },
  { href: "/conseils", label: "Conseils" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { cartCount, wishlist } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(251,249,244,0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px", gap: 24 }}>
        <Link href="/" style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: 3 }}>
          {BRAND.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={BRAND.logo} alt={BRAND.name} style={{ height: 38, width: "auto" }} />
          ) : (
            <>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--forest)" }}>{BRAND.name}</span>
              <span style={{ fontSize: 9, letterSpacing: "0.32em", color: "var(--brass)", fontWeight: 600 }}>{BRAND.tagline.toUpperCase()}</span>
            </>
          )}
        </Link>
        <nav style={{ display: "flex", gap: 28 }} className="main-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} style={{ fontSize: 14.5, color: "var(--ink-soft)" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {DEMO_PAGES && (
            <Link href="/compte" className="header-secondary" style={{ fontSize: 13, color: "var(--forest)", fontWeight: 600 }}>
              Compte
            </Link>
          )}
          <Link href="/wishlist" className="header-secondary" style={{ fontSize: 13, color: "var(--forest)", fontWeight: 600 }}>
            Favoris {wishlist.length > 0 && `(${wishlist.length})`}
          </Link>
          <Link
            href="/panier"
            className="btn btn-outline"
            style={{ padding: "8px 16px", fontSize: 13 }}
          >
            Panier {cartCount > 0 && `(${cartCount})`}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={menuOpen ? "menu-icon open" : "menu-icon"} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
          {[...NAV, ...(DEMO_PAGES ? [{ href: "/compte", label: "Compte" }] : []), { href: "/wishlist", label: "Favoris" }].map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
