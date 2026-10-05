"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BRAND } from "@/lib/brand";

export default function ConnexionPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "calc(100vh - 300px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
      <div className="card" style={{ width: "100%", maxWidth: 400, padding: "40px 34px" }}>
        <div className="center" style={{ marginBottom: 24 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--forest)" }}>{BRAND.name}</span>
        </div>
        <h1 className="center" style={{ fontSize: 22, marginBottom: 6 }}>Bon retour parmi nous</h1>
        <p className="center" style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 26 }}>
          La connexion reste facultative pour commander.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // DÉMO : aucune vérification de mot de passe réelle.
            // Une vraie auth (hash, session serveur) viendra avec la base de données.
            localStorage.setItem("as_client_logged_in", "1");
            router.push("/compte");
          }}
        >
          <div className="form-field"><label>Adresse email</label><input type="email" required placeholder="vous@exemple.com" /></div>
          <div className="form-field"><label>Mot de passe</label><input type="password" required placeholder="••••••••" /></div>
          <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
        </form>
        <p className="center" style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 20 }}>
          Pas encore de compte ? <Link href="/inscription" style={{ color: "var(--forest)", fontWeight: 700 }}>Créer un compte</Link>
          {" "}ou <Link href="/boutique" style={{ color: "var(--forest)", fontWeight: 700 }}>commandez sans compte</Link>
        </p>
      </div>
    </div>
  );
}
