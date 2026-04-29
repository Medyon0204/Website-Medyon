"use client";

import { SplashScreen } from "@/components/ui/SplashScreen";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function UnternehmensberatungPage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages["unternehmensberatung"];
  return (
    <SplashScreen title="Unternehmensberatung" accentColor="magenta">
      <ServicePageTemplate
        title="Unternehmensberatung"
        subtitle={tr.subtitle}
        description={tr.description}
        accentColor="magenta"
        problem={tr.problem}
        solution={tr.solution}
        deliverables={tr.deliverables}
        processSteps={tr.processSteps}
      />
    </SplashScreen>
  );
}
