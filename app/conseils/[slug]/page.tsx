import { BLOG } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return BLOG.map((b) => ({ slug: b.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = BLOG.find((x) => x.slug === slug);
  if (!b) notFound();

  const others = BLOG.filter((x) => x.slug !== b.slug).slice(0, 2);

  return (
    <>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 680, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--brass)" }}>{b.cat} · {b.read} de lecture</span>
          <h1 style={{ fontSize: 30, margin: "10px 0 20px" }}>{b.title}</h1>
          <div className="media-frame" style={{ aspectRatio: "16/9", marginBottom: 24 }}>
            <Image src={b.image} alt={b.title} fill sizes="680px" style={{ objectFit: "cover" }} priority />
          </div>
          <p className="lede" style={{ margin: "0 0 24px", maxWidth: "none", fontSize: 16 }}>{b.excerpt}</p>
          <div
            style={{ fontSize: 16, lineHeight: 1.75, color: "var(--ink-soft)" }}
            dangerouslySetInnerHTML={{ __html: b.html }}
          />

          {/* NOUVELLE SECTION — mot de l'atelier */}
          <div style={{ marginTop: 40, padding: 24, borderRadius: 16, background: "var(--card)", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>Un conseil de notre atelier</h3>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: 0 }}>
              Nos fleuristes appliquent ces gestes chaque jour sur les compositions qui quittent l&apos;atelier.
              Pour toute question sur l&apos;entretien de votre bouquet, n&apos;hésitez pas à{" "}
              <Link href="/contact" style={{ textDecoration: "underline", color: "var(--forest)" }}>nous contacter</Link>.
            </p>
          </div>

          <div style={{ marginTop: 36, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            <Link href="/conseils" className="btn-ghost">← Retour aux conseils</Link>
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION — articles similaires */}
      {others.length > 0 && (
        <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--line)" }}>
          <div className="wrap">
            <h2 className="center" style={{ fontSize: 24, marginBottom: 30 }}>À lire aussi</h2>
            <div className="blog-teaser-grid">
              {others.map((o) => (
                <Link key={o.slug} href={`/conseils/${o.slug}`} className="card">
                  <div className="media-frame" style={{ aspectRatio: "16/10", borderRadius: 0, border: "none", borderBottom: "1px solid var(--line)" }}>
                    <Image src={o.image} alt={o.title} fill sizes="360px" style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: 18 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--brass)" }}>{o.cat}</span>
                    <h3 style={{ fontSize: 16, margin: "8px 0 0" }}>{o.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
