"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUpVariants } from "@/lib/animations";

const REFERENCES = [
  {
    id: "edeka-dooh-outdoor",
    client: "EDEKA",
    category: "Digital Out-of-Home",
    title: "Großflächige DOOH-Kampagne am Point of Sale",
    description:
      "Aufmerksamkeitsstarke digitale Screens an der Außenfassade — maximale Sichtbarkeit für Kunden auf dem Weg zum Eingang.",
    image: "/images/references/edeka-outdoor.jpg",
    result: "3× mehr Aufmerksamkeit",
  },
  {
    id: "edeka-dooh-indoor",
    client: "EDEKA",
    category: "Point of Sale Werbung",
    title: "Digital Signage im Kassenbereiche",
    description:
      "Strategisch platzierte digitale Screens im Kassenbereich zur gezielten Ansprache von Kunden in der Kaufentscheidungsphase.",
    image: "/images/references/edeka-indoor.jpg",
    result: "+40 % Aktivierungsquote",
  },
];

export function ReferencesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-28 px-6" id="referenzen">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionLabel>Unsere Arbeit</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary leading-tight tracking-tight mb-4">
              Referenzen &amp; <span className="text-gradient-dual">Case Studies</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl">
              Echte Projekte, messbare Ergebnisse — so sieht unsere Arbeit in der Praxis aus.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {REFERENCES.map((ref, i) => (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden">
                {/* Image placeholder (real images would be in public/images/references/) */}
                <div className="relative aspect-[16/9] bg-night-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-text-muted text-sm mb-2">📷 {ref.client}</div>
                      <div className="text-xs text-text-muted opacity-60">{ref.category}</div>
                    </div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-magenta uppercase tracking-wider px-2.5 py-1 bg-magenta-muted rounded-full border border-magenta/15">
                      {ref.category}
                    </span>
                    <span className="text-xs text-text-muted">{ref.client}</span>
                  </div>
                  <h3 className="text-text-primary font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                    {ref.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">{ref.description}</p>
                  {ref.result && (
                    <div className="inline-flex items-center gap-2 text-teal text-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-teal" />
                      {ref.result}
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
