import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
export const metadata: Metadata = { title: "Marktanalyse", description: "Fundierte Marktanalysen für strategische Entscheidungen." };
export default function MarktanalysePage() {
  return (
    <ServicePageTemplate title="Marktanalyse" subtitle="Leistung" description="Fundierte Marktanalysen, die Potenziale aufdecken und strategische Entscheidungen untermauern." accentColor="teal"
      problem="Ohne belastbare Marktdaten basieren strategische Entscheidungen auf Annahmen. Das kostet Ressourcen und birgt Risiken, die vermeidbar wären."
      solution="Wir liefern präzise, handlungsorientierte Marktanalysen — aus Primär- und Sekundärquellen, aufbereitet in klare strategische Empfehlungen."
      deliverables={["Wettbewerbsanalyse","Zielgruppenanalyse & Personas","Trendanalyse","Marktgrößen & -potenziale","SWOT-Analyse","Strategische Handlungsempfehlungen"]}
      processSteps={[
        { title: "Scope Definition", desc: "Analyseumfang, Märkte und Fragestellungen festlegen." },
        { title: "Datenerhebung", desc: "Primär- und Sekundärquellen systematisch auswerten." },
        { title: "Analyse & Synthese", desc: "Daten interpretieren und strategische Schlüsse ziehen." },
        { title: "Präsentation", desc: "Ergebnisse klar und handlungsorientiert aufbereiten." },
      ]}
    />
  );
}
