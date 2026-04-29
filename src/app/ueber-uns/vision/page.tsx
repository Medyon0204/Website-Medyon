import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
export const metadata: Metadata = { title: "Vision – Über Uns", description: "Die Vision von Medyon: B2B-Unternehmen zur stärksten Marke in ihrem Markt machen." };
export default function VisionPage() {
  return (
    <>
      <section className="pt-24 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-magenta/6 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionLabel>Über Uns</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-6">Unsere <span className="text-gradient-magenta">Vision</span></h1>
          <p className="text-text-secondary text-xl leading-relaxed mb-10 max-w-2xl">
            Wir glauben, dass jedes B2B-Unternehmen das Potenzial hat, die stärkste Marke in seinem Markt zu werden — wenn Strategie, Design und digitale Präsenz optimal zusammenspielen.
          </p>
          <div className="glass-card rounded-2xl p-8 border-l-4 border-magenta">
            <blockquote className="text-text-primary text-xl font-semibold leading-relaxed italic">
              "Markenpositionierung ist kein Luxus — sie ist der entscheidende Wettbewerbsvorteil im B2B-Markt."
            </blockquote>
            <footer className="mt-4 text-text-muted text-sm">— Medyon Gründerteam</footer>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-night-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Unsere Mission", desc: "B2B-Unternehmen dabei zu helfen, ihre Marktposition klar zu definieren und konsequent zu kommunizieren." },
            { title: "Unser Anspruch", desc: "Keine generischen Lösungen. Jedes Projekt ist maßgeschneidert auf die spezifischen Ziele und den Markt unserer Kunden." },
            { title: "Unser Versprechen", desc: "Messbare Ergebnisse, transparente Kommunikation und eine langfristige Partnerschaft auf Augenhöhe." },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-6">
              <h3 className="text-magenta font-semibold text-sm uppercase tracking-wider mb-3">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
