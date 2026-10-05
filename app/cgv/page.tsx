import LegalLayout from "@/components/LegalLayout";

export default function CGVPage() {
  return (
    <LegalLayout title="Conditions générales de vente">
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Commandes</h2>
      <p>Toute commande implique l&apos;acceptation des présentes CGV. La création d&apos;un compte n&apos;est pas requise.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Prix</h2>
      <p>Les prix sont indiqués en francs CFA (FCFA), toutes taxes comprises.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Paiement</h2>
      <p>Le paiement en ligne n&apos;est pas encore disponible : notre équipe vous contacte après votre demande de commande pour convenir du règlement.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Rétractation</h2>
      <p>Les fleurs coupées et compositions périssables ne bénéficient pas d&apos;un droit de rétractation une fois la préparation engagée.</p>
    </LegalLayout>
  );
}
