"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin-login", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--forest-deep)", padding: 20 }}>
      <div className="card" style={{ width: "100%", maxWidth: 400, padding: "40px 34px" }}>
        <div className="center" style={{ marginBottom: 24 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--forest)" }}>{BRAND.name}</span>
          <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--brass)", fontWeight: 600 }}>ADMINISTRATION</div>
        </div>
        <h1 className="center" style={{ fontSize: 22, marginBottom: 6 }}>Espace professionnel</h1>
        <p className="center" style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 26 }}>
          Connectez-vous pour gérer la boutique.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-field"><label>Adresse email</label><input type="email" required defaultValue="aicha@allservices.fr" /></div>
          <div className="form-field"><label>Mot de passe</label><input type="password" required defaultValue="demo1234" /></div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
        <p className="center" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 20 }}>
          Démo : n&apos;importe quel email / mot de passe fonctionne. · <Link href="/" style={{ color: "var(--forest)" }}>Retour au site</Link>
        </p>
      </div>
    </div>
  );
}
