"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-white/10 overflow-hidden text-xs font-semibold">
      <button
        onClick={() => setLocale("de")}
        className={`px-2.5 py-1 transition-colors ${
          locale === "de"
            ? "bg-magenta/15 text-magenta"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-label="Deutsch"
      >
        DE
      </button>
      <div className="w-px h-3.5 bg-white/10" />
      <button
        onClick={() => setLocale("en")}
        className={`px-2.5 py-1 transition-colors ${
          locale === "en"
            ? "bg-magenta/15 text-magenta"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
