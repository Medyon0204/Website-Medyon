"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export function HeroSection() {
  const { locale } = useLanguage();
  const tr = t[locale].hero;
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-night" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-magenta/10 blur-[120px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-teal/8 blur-[100px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(240,244,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,244,248,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 w-full">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel>{tr.label}</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-[1.75rem] sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-[1.03] tracking-tight mb-6"
          >
            <span className="text-text-primary block">{tr.headline1}</span>
            <span className="text-gradient-dual block mt-1">{tr.headline2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
          >
            {tr.sub}{" "}
            <span className="text-text-primary">{tr.subBold}</span>{tr.subEnd}
          </motion.p>

          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-magenta text-white font-semibold px-7 py-4 rounded-lg hover:bg-magenta-light transition-all duration-200 shadow-[0_0_28px_rgba(230,0,126,0.4)] hover:shadow-[0_0_48px_rgba(230,0,126,0.6)] active:scale-95 text-sm"
            >
              {tr.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/medyon-methode"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-200 font-medium text-sm group"
            >
              {tr.ctaSecondary}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>
    </section>
  );
}
