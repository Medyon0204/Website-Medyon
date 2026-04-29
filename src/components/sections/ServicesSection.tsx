"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { fadeUpVariants } from "@/lib/animations";

export function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-28 px-6" id="leistungen">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionLabel>Was wir tun</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight tracking-tight mb-4">
              Unsere <span className="text-gradient-magenta">Leistungen</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl">
              Von der Strategie bis zum finalen Screen — wir begleiten Ihre Marke ganzheitlich über alle relevanten Touchpoints.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
