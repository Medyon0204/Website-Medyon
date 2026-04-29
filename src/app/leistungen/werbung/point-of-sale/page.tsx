"use client";

import { SplashScreen } from "@/components/ui/SplashScreen";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function PointOfSalePage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages["point-of-sale"];
  return (
    <SplashScreen title="Point of Sale" accentColor="magenta">
      <ServicePageTemplate
        title="Point of Sale"
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
