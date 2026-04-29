"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUpVariants } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

const REFERENCE_CLIENTS = ["EDEKA", "EDEKA"];
const REFERENCE_IMAGES = ["/images/references/edeka-outdoor.jpg", "/images/references/edeka-indoor.jpg"];

export function ReferencesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { locale } = useLanguage();
  const tr = t[locale].references;

  return (
    <section className="py-28 px-6" id="referenzen">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionLabel>{tr.label}</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight tracking-tight mb-4">
              {tr.heading} <span className="text-gradient-dual">{tr.headingAccent}</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl">
              {tr.sub}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tr.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="relative aspect-[16/9] bg-night-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-text-muted text-sm mb-2">📷 {REFERENCE_CLIENTS[i]}</div>
                      <div className="text-xs text-text-muted opacity-60">{item.category}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-magenta uppercase tracking-wider px-2.5 py-1 bg-magenta-muted rounded-full border border-magenta/15">
                      {item.category}
                    </span>
                    <span className="text-xs text-text-muted">{REFERENCE_CLIENTS[i]}</span>
                  </div>
                  <h3 className="text-text-primary font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">{item.description}</p>
                  {item.result && (
                    <div className="inline-flex items-center gap-2 text-teal text-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-teal" />
                      {item.result}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
