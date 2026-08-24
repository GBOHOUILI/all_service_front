import AdminShell from "@/components/AdminShell";
import { ADMIN_MESSAGES } from "@/lib/data";

export default function AdminMessagesPage() {
  return (
    <AdminShell title="Messages">
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: "left", fontSize: 11, textTransform: "uppercase", color: "var(--ink-soft)" }}>
              <th style={{ padding: "16px 16px 12px" }}>Contact</th><th>Sujet</th><th>Date</th><th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {ADMIN_MESSAGES.map((m) => (
              <tr key={m.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "14px 16px" }}><b>{m.name}</b><br /><span style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{m.email}</span></td>
                <td>{m.subject}</td>
                <td>{m.date}</td>
                <td><span className="status-chip status-pending">{m.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
