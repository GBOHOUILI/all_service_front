import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { DEMO_PAGES } from "@/lib/features";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "56px 0 30px", marginTop: 60 }}>
      <div className="wrap">
        <div className="footer-grid" style={{ gap: 40, marginBottom: 40 }}>
          <div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--forest)" }}>{BRAND.name}</span>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)", maxWidth: 260, margin: "12px 0 0" }}>
              L&apos;art des fleurs, pensé avec émotion pour sublimer chaque moment de votre vie.
            </p>
          </div>
          <div>
            <h5 style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brass)", marginBottom: 14 }}>
              Navigation
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <li><Link href="/boutique" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Boutique</Link></li>
              <li><Link href="/sur-mesure" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Sur-mesure</Link></li>
              <li><Link href="/contact" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brass)", marginBottom: 14 }}>
              Informations
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <li><Link href="/livraison-retours" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Livraison &amp; retours</Link></li>
              <li><Link href="/cgv" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Conditions générales</Link></li>
              <li><Link href="/mentions-legales" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Mentions légales</Link></li>
              <li><Link href="/confidentialite" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Confidentialité</Link></li>
              <li><Link href="/cookies" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Cookies</Link></li>
              <li><Link href="/faq" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 22, borderTop: "1px solid var(--line)", fontSize: 12.5, color: "var(--ink-soft)", flexWrap: "wrap", gap: 12 }}>
          <span>© {new Date().getFullYear()} {BRAND.name}. Tous droits réservés.</span>
          {DEMO_PAGES && <Link href="/admin/login" style={{ textDecoration: "underline" }}>Accès professionnel</Link>}
        </div>
      </div>
    </footer>
  );
}
