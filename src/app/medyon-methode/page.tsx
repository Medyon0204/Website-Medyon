"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function MedyonMethodePage() {
  const { locale } = useLanguage();
  const tr = t[locale].methodePage;
  const steps = t[locale].methodeSteps;

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-teal/8 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionLabel color="teal">{tr.label}</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-7xl font-black text-text-primary tracking-tight mb-6">
            {tr.heading} <span className="text-gradient-teal">{tr.headingAccent}</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            {tr.sub}
          </p>
        </div>
      </section>

      {/* Steps Detail */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          {steps.map((step, i) => (
            <div key={step.title} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Number + Title */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-night-100 border border-white/10 flex items-center justify-center">
                    <span className="text-magenta font-black text-2xl">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="w-12 h-px bg-gradient-to-r from-magenta to-teal" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-3">{step.title}</h2>
                <p className="text-text-secondary text-lg leading-relaxed">{step.description}</p>
              </div>

              {/* Details */}
              <div className={`glass-card rounded-2xl p-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-5">{tr.detailLabel}</h3>
                <ul className="flex flex-col gap-3.5">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="text-teal mt-0.5 shrink-0 font-bold">→</span>
                      <span className="text-text-secondary text-sm leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-4">
          {tr.ctaHeading}
        </h2>
        <p className="text-text-secondary mb-8 max-w-lg mx-auto">
          {tr.ctaSub}
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 bg-magenta text-white font-bold px-8 py-4 rounded-lg hover:bg-magenta-light transition-all hover:scale-105 active:scale-95 shadow-[0_0_28px_rgba(230,0,126,0.4)]"
        >
          {tr.ctaButton}
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
