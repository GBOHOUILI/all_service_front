import { findProduct, CARE_SETS, VARIANT_OFFSETS, productGallery, relatedProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import { PRODUCTS } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export function generateStaticParams() {
  return PRODUCTS.filter((p) => !p.hidden).map((p) => ({ slug: p.slug }));
}

// Next 16 : params est désormais une Promise, il faut l'attendre.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const care = CARE_SETS[product.care];
  const gallery = productGallery(product);
  const related = relatedProducts(product);

  return (
    <>
      <section className="section">
        <div className="wrap">
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 22 }}>
            <Link href="/">Accueil</Link> / <Link href="/boutique">Boutique</Link> / {product.name}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50 }}>
            <div>
              <div className="media-frame" style={{ aspectRatio: "1/1" }}>
                <Image src={gallery[0]} alt={product.name} fill sizes="(max-width: 980px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
              </div>
              <div className="mini-gallery">
                <div className="media-frame">
                  <Image src={gallery[1]} alt={`${product.name}, détail 1`} fill sizes="25vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="media-frame">
                  <Image src={gallery[2]} alt={`${product.name}, détail 2`} fill sizes="25vw" style={{ objectFit: "cover" }} />
                </div>
              </div>
            </div>

            <ProductDetailClient product={product} variants={VARIANT_OFFSETS} care={care} />
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : pourquoi cette composition */}
      <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <h2 className="center" style={{ fontSize: 26, marginBottom: 30 }}>Pourquoi choisir cette composition</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Fraîcheur garantie</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                Chaque tige est sélectionnée et assemblée le jour même de votre commande, jamais à l&apos;avance.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Fait main, à l&apos;atelier</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                Nos fleuristes composent {product.name.toLowerCase()} avec un souci du détail transmis de main en main.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Livraison soignée</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                Transportée à l&apos;horizontale dans un emballage protecteur, pour arriver intacte chez vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : informations livraison détaillées */}
      <section className="section">
        <div className="wrap" style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Livraison &amp; délais</h2>
          <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 14 }}>
            {product.name} est composé sur commande, généralement livré sous 24 à 48h à {BRAND.city} et ses environs.
            Vous choisissez le créneau de livraison au moment du paiement : domicile, lieu de travail ou adresse d&apos;un proche.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.7 }}>
            Besoin d&apos;une livraison plus rapide ou d&apos;un ajustement de la composition ? Notre atelier reste
            joignable par téléphone et par email jusqu&apos;à la veille de la livraison.
          </p>
        </div>
      </section>

      {/* NOUVELLE SECTION : produits associés */}
      {related.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 26, flexWrap: "wrap", gap: 14 }}>
              <h2 style={{ fontSize: 26 }}>Vous aimerez aussi</h2>
              <Link href="/boutique" className="btn-ghost">Voir toute la boutique →</Link>
            </div>
            <div className="grid-products">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* NOUVELLE SECTION : témoignages */}
      <Testimonials title="Ils ont commandé cette composition" />
    </>
  );
}
