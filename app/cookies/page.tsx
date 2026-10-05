import LegalLayout from "@/components/LegalLayout";

export default function CookiesPage() {
  return (
    <LegalLayout title="Politique de cookies">
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Cookies essentiels</h2>
      <p>Nécessaires au fonctionnement du site (panier, préférences). Ils ne peuvent pas être désactivés.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Cookies de mesure d&apos;audience</h2>
      <p>Aident à comprendre l&apos;usage du site, de façon anonymisée.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Durée de conservation</h2>
      <p>13 mois maximum, conformément aux recommandations de l&apos;Autorité de Protection des Données à caractère Personnel (APDP).</p>
    </LegalLayout>
  );
}
