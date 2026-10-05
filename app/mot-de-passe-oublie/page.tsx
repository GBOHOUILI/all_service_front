"use client";

import Link from "next/link";
import { useState } from "react";

export default function MotDePasseOubliePage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: "calc(100vh - 300px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
      <div className="card" style={{ width: "100%", maxWidth: 400, padding: "40px 34px" }}>
        <h1 className="center" style={{ fontSize: 22, marginBottom: 6 }}>Mot de passe oublié</h1>
        <p className="center" style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 26 }}>
          Indiquez votre email, nous vous enverrons un lien de réinitialisation.
        </p>
        {sent ? (
          <p className="center" style={{ color: "var(--sage)" }}>Email envoyé (démo).</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="form-field"><label>Adresse email</label><input type="email" required placeholder="vous@exemple.com" /></div>
            <button type="submit" className="btn btn-primary btn-block">Envoyer le lien</button>
          </form>
        )}
        <p className="center" style={{ fontSize: 13, marginTop: 20 }}>
          <Link href="/connexion" style={{ color: "var(--forest)", fontWeight: 700 }}>← Retour à la connexion</Link>
        </p>
      </div>
    </div>
  );
}
