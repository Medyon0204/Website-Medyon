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
            ? "bg-white/10 text-text-primary"
            : "text-text-muted hover:text-text-secondary"
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
            ? "bg-white/10 text-text-primary"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
