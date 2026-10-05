import { PRODUCTS, CATS, EVENTS, CATEGORY_HIGHLIGHTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import Image from "next/image";

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; event?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const cat = sp.cat || "all";
  const event = sp.event || "all";
  const q = (sp.q || "").toLowerCase().trim();

  const list = PRODUCTS.filter((p) => {
    if (p.hidden) return false;
    const okCat = cat === "all" || p.cat === cat;
    const okEvent = event === "all" || p.events.includes(event);
    const okQ = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return okCat && okEvent && okQ;
  });

  function filterHref(nextCat?: string, nextEvent?: string) {
    const params = new URLSearchParams();
    if (nextCat && nextCat !== "all") params.set("cat", nextCat);
    else if (cat !== "all" && nextEvent !== undefined) params.set("cat", cat);
    if (nextEvent && nextEvent !== "all") params.set("event", nextEvent);
    else if (event !== "all" && nextCat !== undefined) params.set("event", event);
    const qs = params.toString();
    return `/boutique${qs ? "?" + qs : ""}`;
  }

  return (
    <>
      <section className="section">
        <div className="wrap">
          <h1 className="center" style={{ fontSize: 40 }}>Notre boutique</h1>
          <p className="lede center" style={{ margin: "16px auto 0" }}>
            Chaque composition est réalisée à la main, le jour de votre commande, à partir de fleurs de saison
            sélectionnées pour leur fraîcheur et leur tenue. Filtrez par type de composition ou par occasion pour
            trouver celle qui correspond le mieux à votre moment.
          </p>

          {cat === "all" && event === "all" && !q && (
            <div className="cat-grid" style={{ margin: "40px 0 44px" }}>
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
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "30px 0 36px", justifyContent: "center" }}>
            {CATS.map((c) => (
              <Link key={c.key} href={filterHref(c.key, undefined)} className={`pill ${cat === c.key ? "active" : ""}`}>
                {c.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30, justifyContent: "center" }}>
            {EVENTS.map((e) => (
              <Link
                key={e.key}
                href={filterHref(undefined, e.key)}
                style={{
                  fontSize: 12.5, padding: "6px 12px", borderRadius: 999,
                  border: "1px solid var(--line)", color: event === e.key ? "var(--forest)" : "var(--ink-soft)",
                  fontWeight: event === e.key ? 700 : 500,
                }}
              >
                {e.label}
              </Link>
            ))}
          </div>

          {list.length ? (
            <div className="grid-products">
              {list.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <h3>Aucune composition ne correspond</h3>
              <p>Essayez un autre filtre ou parcourez l&apos;ensemble de nos créations.</p>
              <Link href="/boutique" className="btn btn-outline">Réinitialiser les filtres</Link>
            </div>
          )}
        </div>
      </section>

      {/* NOUVELLE SECTION : engagement qualité */}
      <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap cols-3" style={{ gap: 24, textAlign: "center" }}>
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>Fleurs de saison</h3>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Sélectionnées chaque matin auprès de producteurs locaux.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>Zéro stock</h3>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Chaque composition est assemblée à la commande, jamais en avance.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>Satisfait ou reprise</h3>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Un souci à la livraison ? Nous trouvons une solution sous 24h.</p>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* NOUVELLE SECTION : CTA sur-mesure */}
      <section className="section">
        <div className="wrap" style={{ background: "linear-gradient(135deg, var(--ivory), var(--card))", border: "1px solid var(--line)", borderRadius: 24, padding: 44, textAlign: "center" }}>
          <span className="eyebrow">Vous ne trouvez pas votre bonheur ?</span>
          <h2 style={{ fontSize: 26, margin: "12px 0 16px" }}>Composons quelque chose rien que pour vous.</h2>
          <Link href="/sur-mesure" className="btn btn-primary">Composer ma création</Link>
        </div>
      </section>
    </>
  );
}
