import AdminShell from "@/components/AdminShell";
import { PRODUCTS, CATS, fmt } from "@/lib/data";

export default function AdminProduitsPage() {
  const list = PRODUCTS.filter((p) => !p.hidden);
  return (
    <AdminShell title="Produits">
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 11, textTransform: "uppercase", color: "var(--ink-soft)" }}>
              <th style={{ padding: "16px 16px 12px" }}>Produit</th><th>Catégorie</th><th>Prix</th><th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.slug} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px" }}><b>{p.name}</b></td>
                <td>{CATS.find((c) => c.key === p.cat)?.label}</td>
                <td>{fmt(p.base)}</td>
                <td><span className="status-chip status-approved">Publié</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
