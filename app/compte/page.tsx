"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ORDERS, orderTotal, fmt } from "@/lib/data";
import { useCart } from "@/components/CartContext";

export default function ComptePage() {
  const router = useRouter();
  const { wishlist } = useCart();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("as_client_logged_in");
    if (!logged) {
      router.push("/connexion");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;

  // DÉMO : on affiche toujours les commandes du même client fictif,
  // en attendant une vraie session utilisateur reliée à une base de données.
  const myOrders = ORDERS.filter((o) => o.customerId === "CL-01");

  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--forest)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 18 }}>
            CR
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Camille Rousseau</h2>
            <p style={{ margin: "2px 0 0", color: "var(--ink-soft)", fontSize: 13.5 }}>camille.rousseau@gmail.com</p>
          </div>
        </div>

        <div className="cols-3" style={{ gap: 16, marginBottom: 34 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--forest)" }}>{myOrders.length}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Commandes passées</div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--forest)" }}>{wishlist.length}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Favoris enregistrés</div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--forest)" }}>
              {fmt(myOrders.reduce((s, o) => s + orderTotal(o), 0))}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Total dépensé</div>
          </div>
        </div>

        <div className="card" style={{ padding: 22, marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>Commandes récentes</h3>
          {myOrders.length ? (
            myOrders.map((o) => (
              <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                <div>
                  <b style={{ fontSize: 14 }}>{o.id}</b>
                  <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "var(--ink-soft)" }}>{o.date} · {fmt(orderTotal(o))}</p>
                </div>
                <span className="status-chip status-new">{o.status}</span>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--ink-soft)", fontSize: 13.5 }}>Aucune commande pour le moment.</p>
          )}
        </div>

        <button
          className="btn btn-outline"
          onClick={() => {
            localStorage.removeItem("as_client_logged_in");
            router.push("/");
          }}
        >
          Déconnexion
        </button>
      </div>
    </section>
  );
}
