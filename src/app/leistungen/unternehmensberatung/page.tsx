import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
export const metadata: Metadata = { title: "Unternehmensberatung", description: "Ganzheitliche Beratung für nachhaltiges Wachstum." };
export default function UnternehmensberatungPage() {
  return (
    <ServicePageTemplate title="Unternehmensberatung" subtitle="Leistung" description="Ganzheitliche Beratung für nachhaltiges Wachstum und klare Marktpositionierung." accentColor="magenta"
      problem="Unternehmen verlieren sich oft im Tagesgeschäft und verlieren den strategischen Blick auf Marktveränderungen, Wettbewerb und eigene Stärken."
      solution="Wir bringen externe Perspektive und fundierte Branchenexpertise ein — für klare strategische Entscheidungen, die Ihr Unternehmen langfristig stärken."
      deliverables={["Unternehmens-Analyse","Strategie-Workshops","Wachstums-Roadmap","Positionierungskonzept","Umsetzungsbegleitung","Quarterly Reviews"]}
      processSteps={[
        { title: "Analyse", desc: "Status-Quo des Unternehmens, Marktumfeld und Wettbewerb verstehen." },
        { title: "Strategie-Entwicklung", desc: "Klare Handlungsoptionen und Empfehlungen erarbeiten." },
        { title: "Roadmap", desc: "Priorisierte Maßnahmenpläne für die Umsetzung erstellen." },
        { title: "Begleitung", desc: "Umsetzung begleiten und regelmäßig reviewen." },
      ]}
    />
  );
}
