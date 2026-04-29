"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function VisionPage() {
  const { locale } = useLanguage();
  const tr = t[locale].visionPage;

  return (
    <>
      <section className="pt-24 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-magenta/6 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionLabel>{tr.label}</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-6">
            {tr.heading} <span className="text-gradient-magenta">{tr.headingAccent}</span>
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed mb-10 max-w-2xl">
            {tr.sub}
          </p>
          <div className="glass-card rounded-2xl p-8 border-l-4 border-magenta">
            <blockquote className="text-text-primary text-xl font-semibold leading-relaxed italic">
              {tr.quote}
            </blockquote>
            <footer className="mt-4 text-text-muted text-sm">— Medyon Gründerteam</footer>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-night-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {tr.cards.map((item) => (
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
