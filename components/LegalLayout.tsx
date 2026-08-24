export default function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 className="center" style={{ fontSize: 32, marginBottom: 30 }}>{title}</h1>
        <div style={{ color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.8 }}>{children}</div>
      </div>
    </section>
  );
}
