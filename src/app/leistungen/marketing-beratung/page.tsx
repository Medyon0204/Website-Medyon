import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
export const metadata: Metadata = { title: "Marketing Beratung", description: "Strategische Beratung für gezieltes und messbares Marketing." };
export default function MarketingBeratungPage() {
  return (
    <ServicePageTemplate title="Marketing Beratung" subtitle="Leistung" description="Strategische Beratung, die Ihr Marketing gezielt ausrichtet und messbar macht." accentColor="teal"
      problem="Ohne klare Strategie verpufft Marketing-Budget wirkungslos. Viele Unternehmen handeln reaktiv statt proaktiv und verlieren dabei den Fokus auf das Wesentliche."
      solution="Wir analysieren Ihren Marketing-Status-Quo, identifizieren Potenziale und entwickeln eine klare, umsetzbare Strategie — abgestimmt auf Ihre Ziele und Ressourcen."
      deliverables={["Marketing-Audit","Strategie-Workshop","Kanalstrategie & Roadmap","Budget-Empfehlungen","KPI-Framework","Umsetzungsbegleitung (optional)"]}
      processSteps={[
        { title: "Status-Quo Analyse", desc: "Bestehende Maßnahmen, Kanäle und Ergebnisse analysieren." },
        { title: "Strategie-Workshop", desc: "Gemeinsam Ziele, Prioritäten und Maßnahmen definieren." },
        { title: "Strategie-Dokument", desc: "Klare, handlungsorientierte Roadmap übergeben." },
        { title: "Begleitung (optional)", desc: "Ongoing-Beratung bei der Umsetzung." },
      ]}
    />
  );
}
