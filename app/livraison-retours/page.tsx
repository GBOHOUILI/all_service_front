import LegalLayout from "@/components/LegalLayout";

export default function LivraisonPage() {
  return (
    <LegalLayout title="Livraison & retours">
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Zone de livraison</h2>
      <p>Cotonou et ses environs (Abomey-Calavi, Porto-Novo), du lundi au samedi.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Délais</h2>
      <p>Commande avant 12h → livraison le jour même. Après → le lendemain.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Frais de livraison</h2>
      <p>2 000 FCFA à Cotonou, offerts dès 60 000 FCFA d&apos;achat.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Retours</h2>
      <p>Produits périssables : pas de retour après livraison. Contactez-nous sous 24h en cas de composition non conforme.</p>
    </LegalLayout>
  );
}
