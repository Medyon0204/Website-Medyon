"use client";

import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function UIUXDesignPage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages['ui-ux-design'];
  return (
    <ServicePageTemplate
      title="UI/UX Design"
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
