"use client";

import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function MarktanalysePage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages['marktanalyse'];
  return (
    <ServicePageTemplate
      title="Marktanalyse"
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
