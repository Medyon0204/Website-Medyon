"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function WirPage() {
  const { locale } = useLanguage();
  const tr = t[locale].wirPage;

  return (
    <>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>{tr.label}</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-5">
            {tr.heading} <span className="text-gradient-magenta">{tr.headingAccent}</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">{tr.sub}</p>
        </div>
      </section>
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 mb-12">
            <p className="text-text-secondary text-lg leading-relaxed">
              {tr.bodyText}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tr.depts.map((dept, i) => (
              <div key={dept} className="glass-card rounded-xl p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${i % 2 === 0 ? "bg-magenta-muted text-magenta" : "bg-teal-muted text-teal"}`}>
                  {dept[0]}
                </div>
                <span className="text-text-secondary font-medium text-sm">{dept}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 text-center bg-night-50">
        <h2 className="text-2xl font-black text-text-primary mb-4">{tr.joinHeading}</h2>
        <p className="text-text-secondary mb-6 max-w-md mx-auto text-sm">{tr.joinSub}</p>
        <Link href="/karriere" className="inline-flex items-center gap-2 bg-magenta text-white font-semibold px-6 py-3 rounded-lg hover:bg-magenta-light transition-all active:scale-95">
          {tr.joinButton} <ArrowRight size={15} />
        </Link>
      </section>
    </>
  );
}
