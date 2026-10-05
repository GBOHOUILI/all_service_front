"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATS, EVENTS, fmt } from "@/lib/data";
import { useCart } from "@/components/CartContext";

const SIZES = [
  { label: "Petit", delta: -13_000 },
  { label: "Moyen", delta: 0 },
  { label: "Grand", delta: 16_500 },
  { label: "Luxe", delta: 42_500 },
];
const PALETTES = [
  { key: "pastel", label: "Tons pastel", premium: 0 },
  { key: "blanc-vert", label: "Blanc & vert", premium: 0 },
  { key: "vives", label: "Couleurs vives", premium: 5_000 },
  { key: "automne", label: "Tons automnaux", premium: 3_500 },
];
const BASE_BY_TYPE: Record<string, number> = { bouquets: 42_500, vase: 39_500, couronnes: 59_000, plantes: 36_000 };

export default function SurMesurePage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [type, setType] = useState("bouquets");
  const [sizeIdx, setSizeIdx] = useState(1);
  const [palette, setPalette] = useState("pastel");
  const [event, setEvent] = useState("mariage");

  const size = SIZES[sizeIdx];
  const paletteObj = PALETTES.find((p) => p.key === palette)!;
  const price = BASE_BY_TYPE[type] + size.delta + paletteObj.premium;

  function handleAdd() {
    const typeLabel = CATS.find((c) => c.key === type)?.label || type;
    addToCart({ slug: "composition-sur-mesure", variant: `${typeLabel} · ${size.label} · ${paletteObj.label}`, price, qty: 1 });
    router.push("/panier");
  }

  return (
    <section className="section">
      <div className="wrap">
        <span className="eyebrow center" style={{ display: "block" }}>Composition sur-mesure</span>
        <h1 className="center" style={{ fontSize: 36, margin: "10px 0 30px" }}>Créez votre composition</h1>
        <div className="layout-split" style={{ gap: 40 }}>
          <div>
            <Block n={1} label="Type de composition">
              <PillGrid>
                {CATS.filter((c) => c.key !== "all").map((c) => (
                  <Pill key={c.key} active={type === c.key} onClick={() => setType(c.key)}>{c.label}</Pill>
                ))}
              </PillGrid>
            </Block>
            <Block n={2} label="Taille">
              <PillGrid>
                {SIZES.map((s, i) => (
                  <Pill key={s.label} active={sizeIdx === i} onClick={() => setSizeIdx(i)}>
                    {s.label}<br /><span style={{ fontSize: 11, opacity: 0.7 }}>{s.delta === 0 ? "Prix standard" : (s.delta > 0 ? "+" : "") + fmt(s.delta)}</span>
                  </Pill>
                ))}
              </PillGrid>
            </Block>
            <Block n={3} label="Palette de couleurs">
              <PillGrid>
                {PALETTES.map((p) => (
                  <Pill key={p.key} active={palette === p.key} onClick={() => setPalette(p.key)}>{p.label}</Pill>
                ))}
              </PillGrid>
            </Block>
            <Block n={4} label="Occasion">
              <select className="form-field" value={event} onChange={(e) => setEvent(e.target.value)} style={{ width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid var(--line)" }}>
                {EVENTS.filter((e) => e.key !== "all").map((e) => (
                  <option key={e.key} value={e.key}>{e.label}</option>
                ))}
              </select>
            </Block>
          </div>
          <div className="card" style={{ padding: 26, position: "sticky", top: 100, height: "fit-content" }}>
            <h4 style={{ marginBottom: 16 }}>Votre composition</h4>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--forest)", margin: "4px 0 20px" }}>{fmt(price)}</div>
            <button className="btn btn-primary btn-block" onClick={handleAdd}>Ajouter au panier</button>
            <a href="/contact" className="btn btn-outline btn-block" style={{ marginTop: 10, display: "block", textAlign: "center" }}>
              Demander un devis personnalisé
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-display)", fontSize: 17, color: "var(--forest)", marginBottom: 12 }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--forest)", color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body)" }}>{n}</span>
        {label}
      </div>
      {children}
    </div>
  );
}
function PillGrid({ children }: { children: React.ReactNode }) {
  return <div className="cols-4" style={{ gap: 10 }}>{children}</div>;
}
function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: active ? "1.5px solid var(--forest)" : "1.5px solid var(--line)",
        background: active ? "var(--ivory)" : "var(--card)",
        color: active ? "var(--forest)" : "var(--ink-soft)",
        borderRadius: 14, padding: "12px 8px", fontSize: 13, fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}
