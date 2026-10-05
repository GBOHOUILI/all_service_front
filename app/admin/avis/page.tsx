import AdminShell from "@/components/AdminShell";
import { REVIEWS } from "@/lib/data";

export default function AdminAvisPage() {
  return (
    <AdminShell title="Avis clients">
      {REVIEWS.map((r) => (
        <div key={r.id} className="card" style={{ padding: 18, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <b>{r.customer}</b> · <span style={{ color: "var(--ink-soft)", fontSize: 12.5 }}>{r.product}</span>
              <div style={{ color: "var(--brass)" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            </div>
            <span className={`status-chip ${r.status === "Approuvé" ? "status-approved" : r.status === "En attente" ? "status-pending" : "status-cancelled"}`}>
              {r.status}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-soft)" }}>« {r.comment} »</p>
        </div>
      ))}
    </AdminShell>
  );
}
