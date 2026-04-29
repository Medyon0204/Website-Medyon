"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { STATS } from "@/lib/constants";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

export function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 px-6 bg-night-50 border-y border-white/6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUpVariants} className="text-center">
              <div className="text-4xl sm:text-5xl font-black mb-2 text-gradient-dual">
                {stat.value}
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
