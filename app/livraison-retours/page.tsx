import LegalLayout from "@/components/LegalLayout";
import { BRAND } from "@/lib/brand";
import { DELIVERY_FEE, FREE_DELIVERY_FROM, fmt } from "@/lib/data";

export default function LivraisonPage() {
  return (
    <LegalLayout title="Livraison & retours">
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Zone de livraison</h2>
      <p>Cotonou et ses environs (Abomey-Calavi, Porto-Novo), du lundi au samedi.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Délais</h2>
      <p>Commande avant 12h → livraison le jour même. Après → le lendemain.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Frais de livraison</h2>
      <p>{fmt(DELIVERY_FEE)} à {BRAND.city}, offerts dès {fmt(FREE_DELIVERY_FROM)} d&apos;achat.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Retours</h2>
      <p>Produits périssables : pas de retour après livraison. Contactez-nous sous 24h en cas de composition non conforme.</p>
    </LegalLayout>
  );
}
