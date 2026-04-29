import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
export const metadata: Metadata = { title: "KI-Automatisierungen", description: "Intelligente Prozessautomatisierung für Marketing-Effizienz." };
export default function KIAutomatisierungenPage() {
  return (
    <ServicePageTemplate title="KI-Automatisierungen" subtitle="Leistung" description="Intelligente Prozessautomatisierung, die Ihre Marketingeffizienz auf das nächste Level hebt." accentColor="teal"
      problem="Marketing-Teams verbringen zu viel Zeit mit repetitiven Aufgaben. KI-Potenziale bleiben ungenutzt, während Wettbewerber effizienter werden."
      solution="Wir identifizieren Automatisierungspotenziale in Ihrem Marketing und implementieren KI-gestützte Lösungen — vom Content-Workflow bis zur Lead-Qualifizierung."
      deliverables={["KI-Potential-Audit","Automatisierungskonzept","Workflow-Implementierung","Content-KI Integration","Reporting-Automatisierung","Mitarbeiter-Schulung"]}
      processSteps={[
        { title: "Potential-Analyse", desc: "Welche Prozesse bringen den höchsten Automatisierungsgewinn?" },
        { title: "Konzeption", desc: "Technologieauswahl und Implementierungsplan." },
        { title: "Umsetzung", desc: "Entwicklung und Integration der KI-Workflows." },
        { title: "Training & Übergabe", desc: "Ihr Team sicher im Umgang mit den neuen Tools machen." },
      ]}
    />
  );
}
