"use client";

import { SplashScreen } from "@/components/ui/SplashScreen";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function MarketingBeratungPage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages["marketing-beratung"];
  return (
    <SplashScreen title="Marketing Beratung" accentColor="teal">
      <ServicePageTemplate
        title="Marketing Beratung"
        subtitle={tr.subtitle}
        description={tr.description}
        accentColor="teal"
        problem={tr.problem}
        solution={tr.solution}
        deliverables={tr.deliverables}
        processSteps={tr.processSteps}
      />
    </SplashScreen>
  );
}
