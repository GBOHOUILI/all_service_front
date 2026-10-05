import LegalLayout from "@/components/LegalLayout";
import { BRAND } from "@/lib/brand";

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales">
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Éditeur du site</h2>
      <p>
        {BRAND.name}, {BRAND.legal.form}. RCCM {BRAND.legal.rccm}, IFU {BRAND.legal.ifu}. {BRAND.address}. Téléphone :{" "}
        {BRAND.phone}. Email : {BRAND.email}.
      </p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Directrice de la publication</h2>
      <p>{BRAND.legal.director}.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Hébergement</h2>
      <p>{BRAND.legal.host}.</p>
      <h2 style={{ color: "var(--forest)", fontSize: 18 }}>Propriété intellectuelle</h2>
      <p>L&apos;ensemble des contenus est la propriété exclusive de {BRAND.name}.</p>
    </LegalLayout>
  );
}
