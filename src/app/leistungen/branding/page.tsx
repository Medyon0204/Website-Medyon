"use client";

import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function BrandingPage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages["branding"];
  return (
    <ServicePageTemplate
      title="Branding"
      subtitle={tr.subtitle}
      description={tr.description}
      accentColor="magenta"
      problem={tr.problem}
      solution={tr.solution}
      deliverables={tr.deliverables}
      processSteps={tr.processSteps}
    />
  );
}
