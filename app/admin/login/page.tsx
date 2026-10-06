"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
    });
    if (!res.ok) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }
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
          <div className="form-field"><label>Adresse email</label><input name="email" type="email" required autoComplete="username" /></div>
          <div className="form-field"><label>Mot de passe</label><input name="password" type="password" required autoComplete="current-password" /></div>
          {error && <p style={{ color: "#b4453a", fontSize: 13, margin: "0 0 14px" }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
        <p className="center" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 20 }}>
          <Link href="/" style={{ color: "var(--forest)" }}>Retour au site</Link>
        </p>
      </div>
    </div>
  );
}
