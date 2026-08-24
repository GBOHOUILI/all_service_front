import AdminShell from "@/components/AdminShell";
import { CUSTOMERS, fmt } from "@/lib/data";

export default function AdminClientsPage() {
  return (
    <AdminShell title="Clients">
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 11, textTransform: "uppercase", color: "var(--ink-soft)" }}>
              <th style={{ padding: "16px 16px 12px" }}>Client</th><th>Téléphone</th><th>Commandes</th><th>Dépensé</th><th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px" }}><b>{c.name}</b><br /><span style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{c.email}</span></td>
                <td>{c.phone}</td>
                <td>{c.orders}</td>
                <td>{fmt(c.spent)}</td>
                <td><span className="status-chip status-active">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
