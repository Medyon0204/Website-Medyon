"use client";

import { KIHero } from "@/components/ui/ki-hero";
import { ServicePageTemplate } from "@/components/ui/ServicePageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export default function KIAutomatisierungenPage() {
  const { locale } = useLanguage();
  const tr = t[locale].servicePages["ki-automatisierungen"];

  const heroHeadline =
    locale === "de"
      ? "Intelligenz,\ndie für Sie arbeitet."
      : "Intelligence\nthat works for you.";

  const heroDescription =
    locale === "de"
      ? "Automatisieren Sie wiederkehrende Marketingprozesse mit KI – von Content-Erstellung über Lead-Qualifizierung bis zur Kampagnen-Optimierung."
      : "Automate repetitive marketing processes with AI – from content creation and lead qualification to campaign optimisation.";

  return (
    <>
      <KIHero headline={heroHeadline} description={heroDescription} />
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
    </>
  );
}
