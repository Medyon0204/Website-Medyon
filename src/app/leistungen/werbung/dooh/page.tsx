"use client";

import { SplashScreen } from "@/components/ui/SplashScreen";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function DoohPage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages["dooh"];
  return (
    <SplashScreen title="DOOH" accentColor="teal">
      <ServicePageTemplate
        title="DOOH"
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
