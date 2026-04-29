import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
export const metadata: Metadata = { title: "Insights", description: "Strategische Einblicke, Trends und Expertise aus dem Hause Medyon." };
export default function InsightsPage() {
  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel color="teal">Wissen & Trends</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-5">
            <span className="text-gradient-teal">Insights</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">Strategische Einblicke, Branchentrends und Expertise aus der Praxis — für B2B-Entscheider.</p>
        </div>
      </section>
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="text-4xl mb-4 text-text-muted">✦</div>
            <h2 className="text-text-primary font-bold text-xl mb-3">Bald verfügbar</h2>
            <p className="text-text-muted text-sm max-w-sm mx-auto">
              Unsere ersten Insights und Artikel werden in Kürze veröffentlicht. Schreiben Sie uns, wenn Sie über neue Beiträge informiert werden möchten.
            </p>
            <a
              href="mailto:info@medyon.de?subject=Insights Newsletter"
              className="inline-flex items-center gap-2 mt-6 text-teal text-sm font-semibold hover:underline"
            >
              info@medyon.de benachrichtigen
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
