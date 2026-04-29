import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
export const metadata: Metadata = { title: "Point of Sale Werbung", description: "Gezielte Werbung am Ort der Kaufentscheidung." };
export default function PointOfSalePage() {
  return (
    <ServicePageTemplate title="Point of Sale" subtitle="Werbung" description="Gezielte Werbemaßnahmen direkt am Ort der Kaufentscheidung — effektiv und messbar." accentColor="magenta"
      problem="Werbung, die nicht am entscheidenden Moment greift, verpufft. Viele Unternehmen erreichen Kunden zu früh oder zu spät in der Customer Journey."
      solution="Wir entwickeln und platzieren Werbemaßnahmen genau dort, wo Kaufentscheidungen fallen — physisch präsent, visuell überzeugend."
      deliverables={["Standortanalyse & Platzierungskonzept","Kreative Gestaltung der Werbemittel","Produktion & Installation","Digital-Signage-Integration (optional)","Performance-Tracking","Kampagnen-Reporting"]}
      processSteps={[
        { title: "Standortanalyse", desc: "Optimale Platzierungspunkte im Verkaufsraum identifizieren." },
        { title: "Kreation", desc: "Aufmerksamkeitsstarke Gestaltung für den Einsatzort." },
        { title: "Produktion & Platzierung", desc: "Umsetzung und Installation der Werbemittel." },
        { title: "Erfolgsmessung", desc: "Reichweite und Wirkung messen und optimieren." },
      ]}
    />
  );
}
