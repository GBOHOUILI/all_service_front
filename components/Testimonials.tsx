import Image from "next/image";
import { REVIEWS } from "@/lib/data";

export default function Testimonials({
  title = "Ce que nos clients en disent",
}: {
  title?: string;
}) {
  const items = REVIEWS.filter((r) => r.status === "Approuvé");

  return (
    <section className="section">
      <div className="wrap">
        <div className="center" style={{ marginBottom: 36 }}>
          <span className="eyebrow">Témoignages</span>
          <h2 style={{ fontSize: 30, margin: "12px 0 14px" }}>{title}</h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            Des centaines de clients nous confient leurs moments les plus précieux — voici quelques-uns de leurs mots,
            recueillis après leur commande.
          </p>
        </div>
        <div className="testimonial-grid">
          {items.map((r) => (
            <div key={r.id} className="testimonial-card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div className="testimonial-avatar">
                  {r.avatar && (
                    <Image src={r.avatar} alt={r.customer} width={52} height={52} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  )}
                </div>
                <div>
                  <b style={{ display: "block", fontSize: 13.5, color: "var(--forest)" }}>{r.customer}</b>
                  <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{r.city}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < r.rating ? "var(--brass)" : "var(--line)" }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: 14.5, color: "var(--ink-soft)", margin: "0 0 14px", lineHeight: 1.6 }}>
                « {r.comment} »
              </p>
              <span style={{ fontSize: 12, color: "var(--brass)", fontWeight: 600 }}>{r.product}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
