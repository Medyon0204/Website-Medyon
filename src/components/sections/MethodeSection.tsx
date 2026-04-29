"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUpVariants } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export function MethodeSection() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { locale } = useLanguage();
  const tr = t[locale];

  return (
    <section className="py-28 px-6 bg-night-50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <SectionLabel color="teal">{tr.methode.label}</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight tracking-tight">
              {tr.methode.heading} <span className="text-gradient-teal">{tr.methode.headingAccent}</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
          >
            <Link
              href="/medyon-methode"
              className="inline-flex items-center gap-2 text-teal font-medium text-sm hover:gap-3 transition-all duration-200"
            >
              {tr.methode.detail}
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-8 left-0 right-0 h-px hidden lg:block">
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={stepsInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
              className="h-full bg-gradient-to-r from-magenta via-teal to-magenta/20"
            />
          </div>

          {tr.methodeSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 32 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Step number */}
              <div className="relative z-10 flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-night border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(230,0,126,0.15)]">
                  <span className="text-magenta font-black text-xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-text-primary font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">{step.description}</p>

              <ul className="flex flex-col gap-1.5">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-xs text-text-muted">
                    <span className="text-teal mt-0.5 shrink-0">→</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
