import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
export const metadata: Metadata = { title: "DOOH – Digital Out-of-Home", description: "Digitale Außenwerbung auf großflächigen Screens." };
export default function DoohPage() {
  return (
    <ServicePageTemplate title="DOOH" subtitle="Digital Out-of-Home" description="Digital Out-of-Home Screens für maximale Sichtbarkeit im öffentlichen Raum — dynamisch, skalierbar, messbar." accentColor="teal"
      problem="Klassische Außenwerbung ist statisch, teuer und schwer zu messen. Unternehmen verpassen die Chance, dynamisch und situationsgerecht zu kommunizieren."
      solution="Wir konzipieren, produzieren und steuern DOOH-Kampagnen auf digitalen Großflächen — von der Fassade bis zum Innenraum-Screen."
      deliverables={["Netzwerk-Analyse & Standortauswahl","Kreativkonzept & Motion Design","Content-Produktion","Screen-Steuerungssystem","Echtzeit-Ausspielung","Kampagnen-Analyse"]}
      processSteps={[
        { title: "Netzwerk & Standorte", desc: "Geeignete DOOH-Netzwerke und Standorte auswählen." },
        { title: "Content-Strategie", desc: "Inhalte und Ausspielregeln definieren (Uhrzeit, Wetter, etc.)." },
        { title: "Kreation & Produktion", desc: "Bewegtbild-Content für maximale Wirkung produzieren." },
        { title: "Launch & Optimierung", desc: "Ausspielung starten und kontinuierlich optimieren." },
      ]}
    />
  );
}
