import Image from "next/image";
import Link from "next/link";
import { BLOG } from "@/lib/data";

export default function ConseilsPage() {
  return (
    <section className="section">
      <div className="wrap">
        <h1 className="center" style={{ fontSize: 36 }}>
          Conseils &amp; inspirations
        </h1>

        <p
          className="center lede"
          style={{ margin: "10px auto 40px" }}
        >
          Des gestes simples et des idées pour prendre soin de vos fleurs.
        </p>

        <div className="cols-3" style={{ gap: 24 }}>
          {BLOG.map((b) => (
            <article key={b.slug} className="card">
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/11",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Contenu */}
              <div style={{ padding: 18 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--brass)",
                  }}
                >
                  {b.cat} · {b.read} de lecture
                </span>

                <h3
                  style={{
                    fontSize: 17,
                    margin: "8px 0",
                  }}
                >
                  {b.title}
                </h3>

                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--ink-soft)",
                  }}
                >
                  {b.excerpt}
                </p>

                <Link
                  href={`/conseils/${b.slug}`}
                  className="btn-ghost"
                >
                  Lire l&apos;article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
