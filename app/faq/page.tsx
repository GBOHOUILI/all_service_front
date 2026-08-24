import { FAQ } from "@/lib/data";

export default function FAQPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 className="center" style={{ fontSize: 32 }}>Questions fréquentes</h1>
        <div style={{ marginTop: 30 }}>
          {FAQ.map((f) => (
            <details key={f.q} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, color: "var(--forest)", fontSize: 15 }}>{f.q}</summary>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 10 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
