"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function InsightsPage() {
  const { locale } = useLanguage();
  const tr = t[locale].insights;

  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel color="teal">{tr.label}</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-5">
            <span className="text-gradient-teal">Insights</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">{tr.sub}</p>
        </div>
      </section>
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="text-4xl mb-4 text-text-muted">✦</div>
            <h2 className="text-text-primary font-bold text-xl mb-3">{tr.comingSoon}</h2>
            <p className="text-text-muted text-sm max-w-sm mx-auto">
              {tr.comingSoonText}
            </p>
            <a
              href="mailto:info@medyon.de?subject=Insights Newsletter"
              className="inline-flex items-center gap-2 mt-6 text-teal text-sm font-semibold hover:underline"
            >
              {tr.notifyText}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
