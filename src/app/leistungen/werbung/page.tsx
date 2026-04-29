"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function WerbungPage() {
  const { locale } = useLanguage();
  const tr = t[locale].werbungPage;
  const hrefs = ["/leistungen/werbung/point-of-sale", "/leistungen/werbung/dooh"];
  const colors = ["magenta", "teal"] as const;

  return (
    <SplashScreen title="Werbung" accentColor="magenta">
      <>
        <section className="pt-24 pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionLabel>{tr.subtitle}</SectionLabel>
            <h1 className="text-5xl sm:text-6xl font-black text-text-primary tracking-tight mb-5">
              <span className="text-gradient-magenta">{tr.heading}</span>
            </h1>
            <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">
              {tr.description}
            </p>
          </div>
        </section>
        <section className="pb-32 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {tr.items.map((item, i) => (
              <Link key={hrefs[i]} href={hrefs[i]} className="glass-card rounded-2xl p-8 hover:border-white/15 transition-all group">
                <h2 className={`text-2xl font-black mb-3 ${colors[i] === "magenta" ? "text-magenta" : "text-teal"}`}>{item.title}</h2>
                <p className="text-text-secondary mb-5 leading-relaxed">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted group-hover:text-white transition-colors">
                  {tr.learnMore} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </>
    </SplashScreen>
  );
}
