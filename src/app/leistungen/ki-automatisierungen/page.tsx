"use client";

import { KIHero } from "@/components/ui/ki-hero";
import { KIAgentSection } from "@/components/ui/ki-agent-section";
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

  const agentHeadline =
    locale === "de"
      ? "Ihr persönlicher\nKI-Agent."
      : "Your personal\nAI Agent.";

  const agentDescription =
    locale === "de"
      ? "Interagieren Sie mit Ihrem KI-Agenten – er analysiert Märkte, optimiert Kampagnen und skaliert Ihre Marketingprozesse ganz nach Ihren Unternehmenszielen."
      : "Interact with your AI agent – it analyses markets, optimises campaigns and scales your marketing processes according to your business goals.";

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
        midSection={
          <KIAgentSection
            headline={agentHeadline}
            description={agentDescription}
          />
        }
      />
    </>
  );
}
