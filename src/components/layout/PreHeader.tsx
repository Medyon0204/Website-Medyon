"use client";

import { Mail, CalendarDays } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import t from "@/lib/translations";

export function PreHeader() {
  const { locale } = useLanguage();
  const tr = t[locale].preheader;

  return (
    <div className="bg-night-50 border-b border-white/5 hidden sm:block">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <a
          href="mailto:info@medyon.de"
          className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors duration-200 text-xs"
        >
          <Mail size={12} />
          <span>info@medyon.de</span>
        </a>

        <div className="flex items-center gap-4">
          <a
            href="mailto:info@medyon.de?subject=Terminanfrage"
            className="flex items-center gap-2 text-text-muted hover:text-teal transition-colors duration-200 text-xs"
          >
            <CalendarDays size={12} />
            <span>{tr.termin}</span>
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
