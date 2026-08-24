import AdminShell from "@/components/AdminShell";
import { ORDERS, orderTotal, fmt } from "@/lib/data";

export default function AdminCommandesPage() {
  return (
    <AdminShell title="Commandes">
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 11, textTransform: "uppercase", color: "var(--ink-soft)" }}>
              <th style={{ padding: "16px 16px 12px" }}>Numéro</th><th>Client</th><th>Date</th><th>Montant</th><th>Paiement</th><th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px" }}><b>{o.id}</b></td>
                <td>{o.customerName}</td>
                <td>{o.date}</td>
                <td>{fmt(orderTotal(o))}</td>
                <td>{o.payment}</td>
                <td><span className="status-chip status-pending">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
