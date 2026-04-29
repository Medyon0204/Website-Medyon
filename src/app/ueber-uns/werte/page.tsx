"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

const VALUE_ICONS = ["◈", "→", "◎", "▲", "★", "◉"];

export default function WertePage() {
  const { locale } = useLanguage();
  const tr = t[locale].wertePage;

  return (
    <>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel color="teal">{tr.label}</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-5">
            {tr.heading} <span className="text-gradient-teal">{tr.headingAccent}</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">{tr.sub}</p>
        </div>
      </section>
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tr.values.map((value, i) => (
            <div key={value.title} className="glass-card rounded-2xl p-6">
              <div className={`text-2xl mb-4 ${i % 2 === 0 ? "text-magenta" : "text-teal"}`}>{VALUE_ICONS[i]}</div>
              <h3 className="text-text-primary font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
