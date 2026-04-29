import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
export const metadata: Metadata = { title: "Branding", description: "Unverwechselbare Markenidentitäten für B2B-Unternehmen." };
export default function BrandingPage() {
  return (
    <ServicePageTemplate title="Branding" subtitle="Leistung" description="Unverwechselbare Markenidentitäten, die in den Köpfen Ihrer Zielgruppe bleiben." accentColor="magenta"
      problem="Viele B2B-Unternehmen haben ein inkonsistentes oder austauschbares Erscheinungsbild. Die Marke spricht nicht klar an, für was das Unternehmen steht."
      solution="Wir entwickeln ganzheitliche Markenidentitäten — von der Positionierungs-Strategie über Logo und Design System bis zum vollständigen Brand Guideline."
      deliverables={["Markenpositionierung & Messaging","Logo-Design & Varianten","Farb- & Typografie-System","Design System & Brand Guidelines","Stationäre Anwendungen (Briefpapier, etc.)","Digital Brand Kit"]}
      processSteps={[
        { title: "Brand Discovery", desc: "Werte, Vision und Zielgruppe der Marke herausarbeiten." },
        { title: "Positionierung", desc: "Unique Value Proposition und Messaging-Architektur definieren." },
        { title: "Visuelles Design", desc: "Logo, Farben, Typografie — das visuelle System entwickeln." },
        { title: "Guidelines & Rollout", desc: "Brand Guideline erstellen und Rollout begleiten." },
      ]}
    />
  );
}
