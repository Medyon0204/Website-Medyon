"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function KarrierePage() {
  const { locale } = useLanguage();
  const tr = t[locale].karriere;
  const values = t[locale].karriereValues;

  return (
    <>
      <section className="pt-24 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-magenta/6 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionLabel>{tr.label}</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-5">
            {tr.heading} <span className="text-gradient-magenta">{tr.headingAccent}</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            {tr.sub}
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 px-6 bg-night-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-text-primary mb-8">{tr.whyHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((point, i) => (
              <div key={point.title} className="glass-card rounded-xl p-5">
                <div className={`text-sm font-semibold mb-2 ${i % 2 === 0 ? "text-magenta" : "text-teal"}`}>{point.title}</div>
                <p className="text-text-muted text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions / Initiative */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-text-primary mb-4">{tr.positionsHeading}</h2>
          <div className="glass-card rounded-2xl p-8 mb-8 text-center">
            <p className="text-text-secondary mb-2">{tr.noneText}</p>
            <p className="text-text-muted text-sm">{tr.noneSubText}</p>
          </div>
          <div className="glass-card rounded-2xl p-7 border border-magenta/20 bg-magenta-muted">
            <h3 className="text-text-primary font-bold text-lg mb-2">{tr.initiativeHeading}</h3>
            <p className="text-text-secondary text-sm mb-5 leading-relaxed">
              {tr.initiativeText}
            </p>
            <Link
              href="mailto:info@medyon.de?subject=Initiativbewerbung"
              className="inline-flex items-center gap-2 bg-magenta text-white font-semibold px-6 py-3 rounded-lg hover:bg-magenta-light transition-all active:scale-95 text-sm"
            >
              <Mail size={15} />
              {tr.initiativeButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
