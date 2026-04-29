"use client";

import { SplashScreen } from "@/components/ui/SplashScreen";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function WebsiteDesignPage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages["website-design"];
  return (
    <SplashScreen title="Website Design" accentColor="teal">
      <ServicePageTemplate
        title="Website Design"
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
