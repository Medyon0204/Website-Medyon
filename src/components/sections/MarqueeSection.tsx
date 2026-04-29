"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

export function MarqueeSection() {
  const { locale } = useLanguage();
  const items = t[locale].marqueeItems;
  const doubled = [...items, ...items];

  return (
    <div className="py-5 border-y border-white/6 bg-night-50 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-night-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-night-50 to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-0 animate-marquee marquee-pause"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-0 text-sm font-medium text-text-muted px-6 whitespace-nowrap"
          >
            {item}
            <span className="ml-6 text-magenta/50 text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
