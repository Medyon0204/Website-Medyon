import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";

export const metadata: Metadata = { title: "Website Design", description: "Performante, markenkonforme Websites, die Vertrauen schaffen und Leads generieren." };

export default function WebsiteDesignPage() {
  return (
    <ServicePageTemplate
      title="Website Design"
      subtitle="Leistung"
      description="Performante, markenkonforme Websites, die Vertrauen schaffen und qualifizierte Leads generieren."
      accentColor="teal"
      problem="Eine veraltete oder generische Website sendet die falsche Botschaft. Interessenten verlassen sie innerhalb von Sekunden, bevor sie verstehen, was Sie eigentlich tun."
      solution="Wir entwickeln Websites, die Ihre Positionierung auf den Punkt bringen — visuell überzeugend, technisch performant und auf Ihre Zielgruppe optimiert."
      deliverables={["Konzept & Seitenstruktur","Custom Design (kein Template)","Responsive auf allen Geräten","Core Web Vitals optimiert","CMS-Integration (optional)","SEO-Grundoptimierung"]}
      processSteps={[
        { title: "Briefing & Konzept", desc: "Ziele, Zielgruppe und Inhaltsstruktur gemeinsam erarbeiten." },
        { title: "Design", desc: "Markenkonforme Gestaltung aller Seiten und Komponenten." },
        { title: "Entwicklung", desc: "Technisch saubere Umsetzung mit Next.js oder dem passenden Stack." },
        { title: "Optimierung", desc: "Ladezeiten, SEO und Accessibility auf Höchstmaß bringen." },
        { title: "Launch & Support", desc: "Go-live Begleitung und optionaler Ongoing-Support." },
      ]}
    />
  );
}
