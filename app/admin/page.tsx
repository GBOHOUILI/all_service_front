import AdminShell from "@/components/AdminShell";
import { ORDERS, PRODUCTS, CUSTOMERS, WEEK_SALES, orderTotal, fmt } from "@/lib/data";

export default function AdminDashboardPage() {
  const revenue = ORDERS.filter((o) => o.status !== "Annulée").reduce((s, o) => s + orderTotal(o), 0);
  const max = Math.max(...WEEK_SALES.map((d) => d.v));

  return (
    <AdminShell title="Tableau de bord">
      <div className="cols-4" style={{ gap: 18, marginBottom: 26 }}>
        <Kpi label="Chiffre d'affaires" value={fmt(revenue)} />
        <Kpi label="Commandes" value={String(ORDERS.length)} />
        <Kpi label="Clients" value={String(CUSTOMERS.length)} />
        <Kpi label="Produits" value={String(PRODUCTS.length)} />
      </div>

      <div className="card" style={{ padding: 22, marginBottom: 22 }}>
        <h3 style={{ fontSize: 15.5, marginBottom: 16 }}>Évolution des ventes (7 jours)</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
          {WEEK_SALES.map((d) => (
            <div key={d.l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
              <div style={{ width: "100%", maxWidth: 34, borderRadius: "8px 8px 3px 3px", background: "linear-gradient(180deg, var(--sage), var(--forest))", height: `${(d.v / max) * 100}%` }} />
              <span style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>{d.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 22 }}>
        <h3 style={{ fontSize: 15.5, marginBottom: 16 }}>Commandes récentes</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 11, textTransform: "uppercase", color: "var(--ink-soft)" }}>
              <th style={{ paddingBottom: 10 }}>Numéro</th><th>Client</th><th>Date</th><th>Montant</th><th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "10px 0" }}><b>{o.id}</b></td>
                <td>{o.customerName}</td>
                <td>{o.date}</td>
                <td>{fmt(orderTotal(o))}</td>
                <td><span className="status-chip status-new">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--forest)" }}>{value}</div>
      <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{label}</div>
    </div>
  );
}
