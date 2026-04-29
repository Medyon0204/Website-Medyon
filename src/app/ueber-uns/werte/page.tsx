import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
export const metadata: Metadata = { title: "Werte – Über Uns", description: "Die Werte, die Medyon antreiben." };
const VALUES = [
  { title: "Klarheit", icon: "◈", desc: "Wir kommunizieren direkt, transparent und ohne Buzzword-Bingo. Unsere Empfehlungen sind nachvollziehbar und begründet." },
  { title: "Wirkung", icon: "→", desc: "Jede Maßnahme muss messbare Ergebnisse liefern. Wir denken in Outcomes, nicht in Outputs." },
  { title: "Partnerschaft", icon: "◎", desc: "Wir sehen uns als verlängerten Arm Ihres Teams — kein Dienstleister auf Abstand, sondern echter strategischer Partner." },
  { title: "Mut", icon: "▲", desc: "Wir sagen auch unbequeme Wahrheiten und empfehlen das, was Ihr Unternehmen wirklich voranbringt." },
  { title: "Exzellenz", icon: "★", desc: "Mittelmäßigkeit ist keine Option. Wir ringen um die beste Lösung — nicht um die schnellste oder günstigste." },
  { title: "Neugier", icon: "◉", desc: "Märkte ändern sich. Wir bleiben am Puls der Zeit und entwickeln uns mit unseren Kunden weiter." },
];
export default function WertePage() {
  return (
    <>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel color="teal">Über Uns</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-5">Unsere <span className="text-gradient-teal">Werte</span></h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">Die Überzeugungen, die unsere Arbeit täglich prägen.</p>
        </div>
      </section>
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((value, i) => (
            <div key={value.title} className="glass-card rounded-2xl p-6">
              <div className={`text-2xl mb-4 ${i % 2 === 0 ? "text-magenta" : "text-teal"}`}>{value.icon}</div>
              <h3 className="text-text-primary font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
