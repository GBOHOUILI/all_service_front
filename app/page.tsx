import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, REVIEWS, CATEGORY_HIGHLIGHTS, BLOG } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import HeroVideo from "@/components/HeroVideo";

export default function HomePage() {
  const bestsellers = PRODUCTS.filter((p) => !p.hidden).slice(0, 4);
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  const latestArticles = BLOG.slice(0, 3);

  return (
    <>
      {/* HERO : vidéo de fleurs en fond, pleine page */}
      <section className="hero-full">
        <HeroVideo />
        <div className="hero-media-overlay" />
        <div className="wrap">
          <div className="hero-glass-card">
            <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: "14px 0 20px", color: "#fff" }}>
              Des compositions florales élégantes, pensées pour durer.
            </h1>
            <p className="lede" style={{ margin: "0 0 28px", color: "rgba(255,255,255,0.85)", textAlign: "left" }}>
              Chaque bouquet est assemblé à la main dans notre atelier parisien, à partir de fleurs de saison
              choisies une à une, pour célébrer vos instants les plus précieux, d&apos;un simple geste du quotidien
              aux grandes occasions qui marquent une vie.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/boutique" className="btn btn-primary">Découvrir la boutique</Link>
              <Link href="/a-propos" className="btn btn-outline" style={{ borderColor: "#fff", color: "#fff" }}>Notre histoire</Link>
            </div>
            <div className="hero-badges">
              <span className="hero-badge"><b>{avg}/5</b>  note moyenne</span>
              <span className="hero-badge"><b>+500</b>  commandes livrées</span>
              <span className="hero-badge"><b>100%</b>  fait main</span>
            </div>
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : catégories phares */}
      <section className="section">
        <div className="wrap">
          <div className="center" style={{ marginBottom: 30 }}>
            <span className="eyebrow">Nos univers</span>
            <h2 style={{ fontSize: 28, margin: "12px 0 0" }}>Une composition pour chaque instant</h2>
          </div>
          <div className="cat-grid">
            {CATEGORY_HIGHLIGHTS.map((c) => (
              <Link key={c.key} href={`/boutique?cat=${c.key}`} className="cat-card">
                <Image src={c.image} alt={c.label} fill sizes="25vw" style={{ objectFit: "cover" }} />
                <div className="cat-card-overlay">
                  <h3>{c.label}</h3>
                  <p>{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 26, flexWrap: "wrap", gap: 14 }}>
            <div>
              <h2 style={{ fontSize: 28 }}>Nos créations les plus aimées</h2>
              <p style={{ fontSize: 14.5, color: "var(--ink-soft)", marginTop: 8, maxWidth: 480 }}>
                Les compositions préférées de nos client·e·s ce mois-ci, à retrouver aussi en plusieurs tailles.
              </p>
            </div>
            <Link href="/boutique" className="btn-ghost">Voir toute la boutique →</Link>
          </div>
          <div className="grid-products">
            {bestsellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : comment ça marche */}
      <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: 36 }}>
            <span className="eyebrow">Le processus</span>
            <h2 style={{ fontSize: 28, margin: "12px 0 0" }}>De l&apos;atelier à votre porte</h2>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">1</div>
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Vous choisissez</h3>
              <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Parcourez la boutique ou composez une création sur-mesure.</p>
            </div>
            <div className="step-card">
              <div className="step-num">2</div>
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Nous confectionnons</h3>
              <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Votre commande est assemblée à la main, le jour même.</p>
            </div>
            <div className="step-card">
              <div className="step-num">3</div>
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Nous livrons</h3>
              <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Livraison soignée à l&apos;adresse et au créneau de votre choix.</p>
            </div>
            <div className="step-card">
              <div className="step-num">4</div>
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Vous profitez</h3>
              <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Nos conseils d&apos;entretien vous accompagnent pour la faire durer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ background: "var(--forest)", borderRadius: 24, padding: "40px 30px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, textAlign: "center" }}>
            <div><b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 30, color: "#fff" }}>{avg}/5</b><span style={{ fontSize: 12.5, color: "#c7d3c0" }}>Note moyenne</span></div>
            <div><b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 30, color: "#fff" }}>+500</b><span style={{ fontSize: 12.5, color: "#c7d3c0" }}>Commandes livrées</span></div>
            <div><b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 30, color: "#fff" }}>+300</b><span style={{ fontSize: 12.5, color: "#c7d3c0" }}>Clients fidèles</span></div>
            <div><b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 30, color: "#fff" }}>100%</b><span style={{ fontSize: 12.5, color: "#c7d3c0" }}>Fait main</span></div>
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : témoignages */}
      <Testimonials />

      {/* NOUVELLE SECTION : derniers conseils */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 26, flexWrap: "wrap", gap: 14 }}>
            <div>
              <h2 style={{ fontSize: 28 }}>Nos derniers conseils</h2>
              <p style={{ fontSize: 14.5, color: "var(--ink-soft)", marginTop: 8, maxWidth: 480 }}>
                Entretien, inspiration et astuces d&apos;atelier pour profiter pleinement de vos fleurs.
              </p>
            </div>
            <Link href="/conseils" className="btn-ghost">Tous les conseils →</Link>
          </div>
          <div className="blog-teaser-grid">
            {latestArticles.map((a) => (
              <Link key={a.slug} href={`/conseils/${a.slug}`} className="card">
                <div className="media-frame" style={{ aspectRatio: "16/10", borderRadius: 0, border: "none", borderBottom: "1px solid var(--line)" }}>
                  <Image src={a.image} alt={a.title} fill sizes="360px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: 18 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--brass)" }}>{a.cat} · {a.read}</span>
                  <h3 style={{ fontSize: 16, margin: "8px 0 6px" }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: 0 }}>{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ background: "linear-gradient(135deg, var(--ivory), var(--card))", border: "1px solid var(--line)", borderRadius: 24, padding: 44, textAlign: "center" }}>
          <span className="eyebrow">Composition sur-mesure</span>
          <h2 style={{ fontSize: 28, margin: "12px 0 16px" }}>Envie d&apos;une création qui vous ressemble ?</h2>
          <p className="lede" style={{ margin: "0 auto 24px" }}>
            Choisissez le type de bouquet, la taille, la palette de couleurs et l&apos;occasion. Notre atelier
            imagine ensuite une composition unique, pensée spécialement pour vous.
          </p>
          <Link href="/sur-mesure" className="btn btn-primary">Composer ma création</Link>
        </div>
      </section>

      {/* NOUVELLE SECTION : newsletter */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap center">
          <span className="eyebrow">Restons en contact</span>
          <h2 style={{ fontSize: 24, margin: "12px 0 16px" }}>Recevez nos inspirations florales</h2>
          <p className="lede" style={{ margin: "0 auto 22px" }}>
            Une fois par mois, des idées de compositions, des conseils d&apos;entretien et nos nouveautés, directement dans votre boîte mail.
          </p>
          <div className="newsletter-box">
            <input type="email" placeholder="Votre adresse email" />
            <button className="btn btn-primary">S&apos;inscrire</button>
          </div>
        </div>
      </section>
    </>
  );
}
