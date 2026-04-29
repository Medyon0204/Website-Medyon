"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Layout, Globe, TrendingUp, Cpu, Layers, MessageSquare, Monitor, Briefcase, BarChart2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { GlowCard } from "@/components/ui/spotlight-card";
import type { Service } from "@/types/content";

const ICON_MAP: Record<string, React.ReactNode> = {
  Layout: <Layout size={22} />,
  Globe: <Globe size={22} />,
  TrendingUp: <TrendingUp size={22} />,
  Cpu: <Cpu size={22} />,
  Layers: <Layers size={22} />,
  MessageSquare: <MessageSquare size={22} />,
  Monitor: <Monitor size={22} />,
  Briefcase: <Briefcase size={22} />,
  BarChart2: <BarChart2 size={22} />,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const isMagenta = service.accentColor === "magenta";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5 }}
    >
      <GlowCard
        customSize
        glowColor={isMagenta ? "magenta" : "teal"}
        className="w-full h-full"
      >
        <Link
          href={service.href}
          className="group flex flex-col p-6 h-full rounded-2xl"
        >
          {/* Icon */}
          <div
            className={cn(
              "inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 transition-all duration-300",
              isMagenta
                ? "bg-magenta-muted text-magenta group-hover:bg-magenta group-hover:text-white"
                : "bg-teal-muted text-teal group-hover:bg-teal group-hover:text-night"
            )}
          >
            {ICON_MAP[service.icon]}
          </div>

          {/* Title */}
          <h3 className="text-text-primary font-semibold text-base mb-2 group-hover:text-white transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-text-muted text-sm leading-relaxed flex-1">{service.description}</p>

          {/* Arrow */}
          <div
            className={cn(
              "mt-4 inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0",
              isMagenta ? "text-magenta" : "text-teal"
            )}
          >
            Mehr erfahren
            <ArrowUpRight size={13} />
          </div>
        </Link>
      </GlowCard>
    </motion.div>
  );
}
