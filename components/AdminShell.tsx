"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/avis", label: "Avis" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ivory)" }}>
      <aside style={{ width: 240, flexShrink: 0, background: "var(--forest-deep)", color: "#d9e0d5", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "22px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--brass)", color: "#241a0c", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700 }}>AS</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "#fff" }}>All Services</div>
            <div style={{ fontSize: 9, letterSpacing: "0.1em", color: "#93a08d", textTransform: "uppercase" }}>Administration</div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              style={{
                padding: "10px 12px", borderRadius: 10, fontSize: 13.5,
                background: pathname === n.href ? "var(--brass)" : "transparent",
                color: pathname === n.href ? "#241a0c" : "#c4ccbe",
                fontWeight: pathname === n.href ? 700 : 500,
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: "14px 20px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#93a08d", fontSize: 12.5, display: "flex", alignItems: "center", gap: 8 }}>
            ← Déconnexion
          </button>
        </div>
      </aside>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ padding: "16px 30px", borderBottom: "1px solid var(--line)", background: "rgba(247,244,236,0.9)" }}>
          <h1 style={{ fontSize: 20 }}>{title}</h1>
        </div>
        <div style={{ padding: "26px 30px 60px" }}>{children}</div>
      </div>
    </div>
  );
}
