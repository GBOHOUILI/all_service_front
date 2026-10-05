"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { findProduct, fmt } from "@/lib/data";

export default function PanierPage() {
  const { cart, removeFromCart, setQty, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"panier" | "livraison" | "confirm">("panier");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "Paris", zip: "", date: "", message: "" });

  const shipping = cart.length ? 9 : 0;
  const total = cartTotal + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // DÉMO : pas de paiement en ligne pour l'instant. On enregistre la
    // demande de commande et l'équipe recontacte le client pour le
    // règlement. Quand le paiement sera prêt, cette étape enverra vers
    // /panier/paiement à la place.
    const number = "AS-" + Math.floor(100000 + Math.random() * 899999);
    setOrderNumber(number);
    setStep("confirm");
    clearCart();
  }

  if (step === "confirm" && orderNumber) {
    return (
      <section className="section">
        <div className="wrap">
          <div className="empty-state">
            <h3>Merci ! Votre demande de commande est enregistrée</h3>
            <p>
              Numéro de référence <b style={{ color: "var(--forest)" }}>{orderNumber}</b>. Notre équipe vous
              recontacte sous 24h pour confirmer les détails et le règlement. Le paiement en ligne arrive bientôt.
            </p>
            <Link href="/boutique" className="btn btn-primary">Continuer mes achats</Link>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="section">
        <div className="wrap">
          <div className="empty-state">
            <h3>Votre panier est vide</h3>
            <p>Parcourez nos compositions et laissez-vous inspirer.</p>
            <Link href="/boutique" className="btn btn-primary">Découvrir la boutique</Link>
          </div>
        </div>
      </section>
    );
  }

  if (step === "livraison") {
    return (
      <section className="section">
        <div className="wrap">
          <h1 style={{ fontSize: 32, marginBottom: 20 }}>Vos coordonnées</h1>
          <div className="banner-info">
            <p>✓ Pas besoin de créer de compte : vous pouvez commander en tant qu&apos;invité·e.</p>
            <Link href="/connexion" className="btn-ghost">Déjà client ? Se connecter →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40 }}>
            <form onSubmit={handleSubmit}>
              <div className="form-row2">
                <div className="form-field"><label>Nom complet</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="form-field"><label>Téléphone</label><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div className="form-field"><label>Email</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div className="form-field"><label>Adresse de livraison</label><input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
              <div className="form-row2">
                <div className="form-field"><label>Ville</label><input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                <div className="form-field"><label>Code postal</label><input required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} /></div>
              </div>
              <div className="form-field"><label>Date souhaitée</label><input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
              <div className="form-field"><label>Message (facultatif)</label><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
              <button type="submit" className="btn btn-primary btn-block">Envoyer ma demande de commande</button>
              <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 12 }}>
                Le paiement en ligne n&apos;est pas encore disponible : nous vous recontactons pour le finaliser.
              </p>
            </form>
            <div className="card" style={{ padding: 24, position: "sticky", top: 100, height: "fit-content" }}>
              <h4 style={{ marginBottom: 16 }}>Résumé</h4>
              <SummaryRows subtotal={cartTotal} shipping={shipping} total={total} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap">
        <h1 style={{ fontSize: 32, marginBottom: 30 }}>Votre panier</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40 }}>
          <div>
            {cart.map((item, i) => {
              const p = findProduct(item.slug);
              if (!p) return null;
              return (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ width: 70, height: 70, borderRadius: 12, background: p.accent, opacity: 0.3, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 4px", fontSize: 15 }}>{p.name}</h4>
                    <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-soft)" }}>Format {item.variant}</p>
                    <button onClick={() => removeFromCart(i)} style={{ fontSize: 12, color: "var(--ink-soft)", border: "none", background: "none", textDecoration: "underline", marginTop: 4 }}>
                      Retirer
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => setQty(i, item.qty - 1)} style={{ width: 30, height: 30, border: "1px solid var(--line)", borderRadius: 999, background: "none" }}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => setQty(i, item.qty + 1)} style={{ width: 30, height: 30, border: "1px solid var(--line)", borderRadius: 999, background: "none" }}>+</button>
                  </div>
                  <b style={{ minWidth: 70, textAlign: "right" }}>{fmt(item.price * item.qty)}</b>
                </div>
              );
            })}
          </div>
          <div className="card" style={{ padding: 24, position: "sticky", top: 100, height: "fit-content" }}>
            <h4 style={{ marginBottom: 16 }}>Résumé</h4>
            <SummaryRows subtotal={cartTotal} shipping={shipping} total={total} />
            <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={() => setStep("livraison")}>
              Continuer
            </button>
            <Link href="/boutique" className="btn-ghost" style={{ display: "block", textAlign: "center", marginTop: 10 }}>
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRows({ subtotal, shipping, total }: { subtotal: number; shipping: number; total: number }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 10, color: "var(--ink-soft)" }}>
        <span>Sous-total</span><span>{fmt(subtotal)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 10, color: "var(--ink-soft)" }}>
        <span>Livraison</span><span>{fmt(shipping)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "var(--forest)", borderTop: "1px solid var(--line)", paddingTop: 12 }}>
        <span>Total</span><span>{fmt(total)}</span>
      </div>
    </>
  );
}
