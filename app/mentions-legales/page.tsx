import LegalLayout from "@/components/LegalLayout";

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales">
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Éditeur du site</h2>
      <p>All Services, SASU au capital de 5 000 €, SIRET [à compléter], 12 Rue des Fleurs, 75016 Paris.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Directrice de la publication</h2>
      <p>La fondatrice d&apos;All Services.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Hébergement</h2>
      <p>[Nom de l&apos;hébergeur à compléter selon votre déploiement].</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Propriété intellectuelle</h2>
      <p>L&apos;ensemble des contenus est la propriété exclusive d&apos;All Services.</p>
    </LegalLayout>
  );
}
