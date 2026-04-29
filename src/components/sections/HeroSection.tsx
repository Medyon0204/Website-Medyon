"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

export function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 90]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-night" />
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Magenta radial glow top-center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-magenta/10 blur-[120px]" />
        {/* Teal glow right */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-teal/8 blur-[100px]" />
        {/* Night blue depth */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full bg-night-300/60 blur-[80px]" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(240,244,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,244,248,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 w-full">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel>B2B Marketing &amp; Digitale Werbung</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-[1.75rem] sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-[1.03] tracking-tight mb-6"
          >
            <span className="text-text-primary block">Markenpositionierung,</span>
            <span className="text-gradient-dual block mt-1">die wirkt.</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
          >
            Wir verbinden Strategie, Design und digitale Werbung –{" "}
            <span className="text-text-primary">für B2B-Unternehmen</span>, die mehr als nur
            sichtbar sein wollen.
          </motion.p>

          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-magenta text-white font-semibold px-7 py-4 rounded-lg hover:bg-magenta-light transition-all duration-200 shadow-[0_0_28px_rgba(230,0,126,0.4)] hover:shadow-[0_0_48px_rgba(230,0,126,0.6)] active:scale-95 text-sm"
            >
              Jetzt Termin vereinbaren
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/medyon-methode"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-200 font-medium text-sm group"
            >
              Unsere Methode entdecken
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative accent lines */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-2 opacity-20">
          <div className="w-32 h-px bg-gradient-to-l from-magenta to-transparent" />
          <div className="w-20 h-px bg-gradient-to-l from-teal to-transparent" />
          <div className="w-40 h-px bg-gradient-to-l from-magenta/50 to-transparent" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
