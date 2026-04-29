import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";

export const metadata: Metadata = { title: "UI/UX Design", description: "Interfaces, die Nutzer begeistern und Conversions steigern." };

export default function UIUXDesignPage() {
  return (
    <ServicePageTemplate
      title="UI/UX Design"
      subtitle="Leistung"
      description="Interfaces, die Nutzer begeistern und Conversions steigern – durch datenbasiertes, nutzerzentriertes Design."
      accentColor="magenta"
      problem="Viele Unternehmen kämpfen mit Interfaces, die zwar technisch funktionieren, aber Nutzer nicht abholen. Schlechte UX kostet Conversions, erhöht den Support-Aufwand und schadet dem Markenbild."
      solution="Wir entwickeln UI/UX-Konzepte, die auf echten Nutzerdaten basieren. Von der Research-Phase bis zum fertigen Prototypen begleiten wir Sie durch einen strukturierten, messbaren Design-Prozess."
      deliverables={["User Research & Nutzerbefragungen","Wireframes & Prototypen","High-Fidelity UI Designs","Design System & Komponenten-Bibliothek","Usability-Tests & Iteration","Entwickler-Übergabe (Handoff)"]}
      processSteps={[
        { title: "Discovery & Research", desc: "Nutzerinterviews, Konkurrenzanalyse, Analyse bestehender Touchpoints." },
        { title: "Information Architecture", desc: "Seitenstruktur, User Flows und Navigationskonzept definieren." },
        { title: "Wireframing", desc: "Lo-Fi Wireframes zur schnellen Iteration und Validierung." },
        { title: "UI Design", desc: "High-Fidelity Designs auf Basis Ihres Brand Designs." },
        { title: "Prototyping & Testing", desc: "Interaktiver Prototyp + Usability-Test mit echten Nutzern." },
      ]}
    />
  );
}
