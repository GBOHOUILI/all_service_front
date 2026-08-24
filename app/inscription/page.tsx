"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InscriptionPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "calc(100vh - 300px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
      <div className="card" style={{ width: "100%", maxWidth: 400, padding: "40px 34px" }}>
        <div className="center" style={{ marginBottom: 24 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--forest)" }}>All Services</span>
        </div>
        <h1 className="center" style={{ fontSize: 22, marginBottom: 6 }}>Créer un compte</h1>
        <p className="center" style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 26 }}>
          Facultatif : vous pouvez aussi commander sans créer de compte.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("as_client_logged_in", "1");
            router.push("/compte");
          }}
        >
          <div className="form-row2">
            <div className="form-field"><label>Prénom</label><input required placeholder="Camille" /></div>
            <div className="form-field"><label>Nom</label><input required placeholder="Rousseau" /></div>
          </div>
          <div className="form-field"><label>Adresse email</label><input type="email" required placeholder="vous@exemple.fr" /></div>
          <div className="form-field"><label>Mot de passe</label><input type="password" required placeholder="8 caractères minimum" /></div>
          <button type="submit" className="btn btn-primary btn-block">Créer mon compte</button>
        </form>
        <p className="center" style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 20 }}>
          Déjà inscrit·e ? <Link href="/connexion" style={{ color: "var(--forest)", fontWeight: 700 }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
