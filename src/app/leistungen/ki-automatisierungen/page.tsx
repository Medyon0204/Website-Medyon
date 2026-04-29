"use client";

import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function KIAutomatisierungenPage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages['ki-automatisierungen'];
  return (
    <ServicePageTemplate
      title="KI-Automatisierungen"
      subtitle={tr.subtitle}
      description={tr.description}
      accentColor="teal"
      problem={tr.problem}
      solution={tr.solution}
      deliverables={tr.deliverables}
      processSteps={tr.processSteps}
    />
  );
}
