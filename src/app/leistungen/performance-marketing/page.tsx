import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
export const metadata: Metadata = { title: "Performance Marketing", description: "Messbare Ergebnisse durch datengetriebene Kampagnen." };
export default function PerformanceMarketingPage() {
  return (
    <ServicePageTemplate title="Performance Marketing" subtitle="Leistung" description="Messbare Ergebnisse durch datengetriebene Kampagnen auf allen relevanten Kanälen." accentColor="magenta"
      problem="Viele Unternehmen investieren in Marketing, ohne zu wissen, was tatsächlich wirkt. Budget wird verschwendet, ROI bleibt unklar."
      solution="Wir planen, schalten und optimieren Kampagnen konsequent datenbasiert — mit klaren KPIs und transparentem Reporting."
      deliverables={["Kanal- & Zielgruppenanalyse","Kampagnenkonzept & Creatives","Setup auf Google, Meta, LinkedIn","Laufendes Monitoring","A/B-Testing","Monatliche Performance-Reports"]}
      processSteps={[
        { title: "Analyse & Zielsetzung", desc: "IST-Analyse, KPI-Definition und Kanalauswahl." },
        { title: "Kampagnenplanung", desc: "Strategie, Budget-Allokation und Creative-Briefing." },
        { title: "Setup & Launch", desc: "Technisches Setup, Tracking und Kampagnenstart." },
        { title: "Optimierung", desc: "Kontinuierliche Datenauswertung und Justierung." },
      ]}
    />
  );
}
