"use client";

import { useState } from "react";
import { BRAND } from "@/lib/brand";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section">
      <div className="wrap">
        <h1 style={{ fontSize: 36 }}>Contactez-nous</h1>
        <p className="lede" style={{ margin: "8px 0 40px", maxWidth: "none" }}>
          Nous sommes là pour vous aider à créer quelque chose de beau.
        </p>
        <div className="layout-split layout-split-even" style={{ gap: 50 }}>
          {sent ? (
            <div className="empty-state" style={{ padding: "40px 0" }}>
              <h3>Votre message est prêt dans WhatsApp</h3>
              <p>Appuyez sur Envoyer dans WhatsApp : nous vous répondons dans la journée.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const email = String(data.get("email") || "");
                const text = `Bonjour ${BRAND.name}, je suis ${data.get("name")}${email ? ` (${email})` : ""}.\n\n${data.get("message")}`;
                track("contact-whatsapp");
                window.open(whatsappUrl(text), "_blank", "noopener");
                setSent(true);
              }}
            >
              <div className="form-field"><label>Nom</label><input name="name" required placeholder="Votre nom" /></div>
              <div className="form-field"><label>Email (facultatif)</label><input name="email" type="email" placeholder="Votre email" /></div>
              <div className="form-field"><label>Message</label><textarea name="message" required placeholder="Votre message…" /></div>
              <button className="btn btn-primary" type="submit">Envoyer sur WhatsApp</button>
              <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 14 }}>
                🔒 Vos informations sont confidentielles. Voir notre{" "}
                <a href="/confidentialite" style={{ color: "var(--forest)", textDecoration: "underline" }}>politique de confidentialité</a>.
              </p>
            </form>
          )}
          <div>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Nos coordonnées</h3>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{BRAND.phone}</p>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{BRAND.email}</p>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{BRAND.address}</p>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Lun – Ven : 9h – 18h · Sam : 10h – 16h</p>
          </div>
        </div>
      </div>
    </section>
  );
}
