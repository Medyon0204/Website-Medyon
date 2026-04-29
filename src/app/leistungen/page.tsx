"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function LeistungenPage() {
  const { locale } = useLanguage();
  const tr = t[locale].leistungenPage;
  const serviceCards = t[locale].serviceCards;

  const servicesWithTranslatedDesc = SERVICES.map((service) => ({
    ...service,
    description: serviceCards[service.id as keyof typeof serviceCards] ?? service.description,
  }));

  return (
    <>
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-magenta/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionLabel>{tr.label}</SectionLabel>
          <h1 className="text-5xl sm:text-6xl font-black text-text-primary tracking-tight mb-5">
            {tr.heading} <span className="text-gradient-magenta">{tr.headingAccent}</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            {tr.sub}
          </p>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesWithTranslatedDesc.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
