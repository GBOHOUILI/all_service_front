import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import { BRAND } from "@/lib/brand";

const TEAM = [
  {
    name: "Aïcha Bamba",
    role: "Fondatrice & fleuriste en chef",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=750&q=85",
  },
  {
    name: "Mehdi Alaoui",
    role: "Responsable atelier",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=85",
  },
  {
    name: "Léa Bonnet",
    role: "Fleuriste & compositions sur-mesure",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=750&q=85",
  },
];

const ATELIER_PHOTOS = [
  "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85",
];

export default function AProposPage() {
  return (
    <>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 720, margin: "0 auto" }}>
          <span className="eyebrow">Notre histoire</span>
          <h1 style={{ fontSize: 32, margin: "12px 0 16px" }}>L&apos;art des fleurs, avec émotion et élégance.</h1>
          <p className="lede" style={{ margin: "0 0 18px", maxWidth: "none" }}>
            All Services est né d&apos;une passion profonde pour les fleurs et d&apos;un désir de créer des compositions
            qui touchent l&apos;âme. Depuis notre atelier de {BRAND.city}, nous sélectionnons chaque matin les plus belles
            fleurs de saison auprès de producteurs locaux, pour composer des créations qui célèbrent les moments qui comptent.
          </p>
          <p className="lede" style={{ margin: "0 0 24px", maxWidth: "none" }}>
            Ce qui a commencé comme une petite boutique de quartier est devenu, au fil des années, une maison florale
            reconnue pour l&apos;exigence de ses compositions et la sincérité de son accompagnement : des bouquets du
            quotidien aux plus grands mariages, chaque création reçoit la même attention.
          </p>

          <h2 style={{ fontSize: 24, margin: "30px 0 14px" }}>Nos valeurs</h2>
          <div className="cols-3" style={{ gap: 20 }}>
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <h3 style={{ fontSize: 16 }}>Qualité</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Fleurs sélectionnées avec exigence, fraîcheur garantie.</p>
            </div>
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <h3 style={{ fontSize: 16 }}>Respect de la nature</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Fournisseurs locaux, pratiques durables.</p>
            </div>
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <h3 style={{ fontSize: 16 }}>Créativité</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Chaque création est une œuvre unique.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : l'atelier en images */}
      <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: 30 }}>
            <span className="eyebrow">Dans les coulisses</span>
            <h2 style={{ fontSize: 26, margin: "12px 0 0" }}>Notre atelier, au quotidien</h2>
          </div>
          <div className="cols-3" style={{ gap: 20 }}>
            {ATELIER_PHOTOS.map((src, i) => (
              <div key={i} className="media-frame" style={{ aspectRatio: "4/5" }}>
                <Image src={src} alt={`Notre atelier ${i + 1}`} fill sizes="33vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : équipe */}
      <section className="section">
        <div className="wrap">
          <div className="center" style={{ marginBottom: 36 }}>
            <span className="eyebrow">L&apos;équipe</span>
            <h2 style={{ fontSize: 26, margin: "12px 0 0" }}>Les mains derrière vos compositions</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((t) => (
              <div key={t.name} className="team-card">
                <div className="team-photo">
                  <Image src={t.image} alt={t.name} fill sizes="33vw" style={{ objectFit: "cover" }} />
                </div>
                <h3 style={{ fontSize: 16 }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : chiffres clés */}
      <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap cols-4" style={{ gap: 20, textAlign: "center" }}>
          <div><b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 30, color: "var(--forest)" }}>10+</b><span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Années d&apos;expérience</span></div>
          <div><b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 30, color: "var(--forest)" }}>+500</b><span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Commandes livrées</span></div>
          <div><b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 30, color: "var(--forest)" }}>+50</b><span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Mariages accompagnés</span></div>
          <div><b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 30, color: "var(--forest)" }}>100%</b><span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Fait main</span></div>
        </div>
      </section>

      <Testimonials title="La confiance de nos clients" />

      <section className="section">
        <div className="wrap" style={{ background: "linear-gradient(135deg, var(--ivory), var(--card))", border: "1px solid var(--line)", borderRadius: 24, padding: 44, textAlign: "center" }}>
          <span className="eyebrow">Envie de nous rencontrer ?</span>
          <h2 style={{ fontSize: 26, margin: "12px 0 16px" }}>Venez découvrir l&apos;atelier</h2>
          <Link href="/contact" className="btn btn-primary">Nous contacter</Link>
        </div>
      </section>
    </>
  );
}
