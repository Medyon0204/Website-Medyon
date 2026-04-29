"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { fadeUpVariants } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { locale } = useLanguage();
  const tr = t[locale];

  const servicesWithTranslatedDesc = SERVICES.map((service) => ({
    ...service,
    title: tr.serviceNames[service.id as keyof typeof tr.serviceNames] ?? service.title,
    description: tr.serviceCards[service.id as keyof typeof tr.serviceCards] ?? service.description,
  }));

  return (
    <section className="py-28 px-6" id="leistungen">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionLabel>{tr.services.label}</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight tracking-tight mb-4">
              {tr.services.heading} <span className="text-gradient-magenta">{tr.services.headingAccent}</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl">
              {tr.services.sub}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesWithTranslatedDesc.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
