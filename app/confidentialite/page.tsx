import LegalLayout from "@/components/LegalLayout";

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Responsable du traitement</h2>
      <p>All Services est responsable du traitement des données personnelles collectées sur ce site.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Données collectées</h2>
      <p>Nom, email, téléphone, adresse de livraison, historique de commandes. Aucune donnée bancaire n&apos;est collectée pour l&apos;instant (le paiement en ligne n&apos;est pas encore actif).</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Vos droits</h2>
      <p>
        Conformément au RGPD : accès, rectification, effacement, limitation, opposition, portabilité. Contact :{" "}
        <a href="mailto:confidentialite@allservices.fr" style={{ color: "var(--forest)", fontWeight: 700 }}>confidentialite@allservices.fr</a>.
      </p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Sécurité</h2>
      <p>Des mesures techniques et organisationnelles appropriées protègent vos données.</p>
    </LegalLayout>
  );
}
