"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Mail, CalendarDays } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { MedyonLogo } from "@/components/ui/MedyonLogo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";

function translateLabel(label: string, locale: "de" | "en"): string {
  const nav = t[locale].nav;
  const map: Record<string, string> = {
    "Medyon Methode": nav.methode,
    "Leistungen": nav.leistungen,
    "KI-Automatisierungen": nav.services.ki,
    "Marketing Beratung": nav.services.beratung,
    "Werbung": nav.services.werbung,
    "Unternehmensberatung": nav.services.unternehmens,
    "Marktanalyse": nav.services.markt,
    "Über Uns": nav.ueberUns,
    "Vision": nav.vision,
    "Werte": nav.werte,
    "Wir": nav.wir,
    "Karriere": nav.karriere,
  };
  return map[label] ?? label;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { locale } = useLanguage();
  const tr = t[locale];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-night-100 border-l border-white/8 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/8">
              <MedyonLogo iconSize={30} />
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/8 transition-colors"
                  aria-label="Menü schließen"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Pre-header info */}
            <div className="px-6 py-4 border-b border-white/8 flex flex-col gap-3">
              <a
                href="mailto:info@medyon.de"
                onClick={onClose}
                className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors text-sm"
              >
                <Mail size={14} />
                info@medyon.de
              </a>
              <a
                href="mailto:info@medyon.de?subject=Terminanfrage"
                onClick={onClose}
                className="flex items-center gap-2 text-teal text-sm font-medium"
              >
                <CalendarDays size={14} />
                {tr.preheader.termin}
              </a>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                if (item.dropdown) {
                  const isOpen = openDropdown === item.label;
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-text-primary font-medium hover:bg-white/6 transition-colors text-left"
                      >
                        {translateLabel(item.label, locale)}
                        <ChevronDown
                          size={16}
                          className={`text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 flex flex-col gap-0.5">
                              {item.dropdown.map((sub) => (
                                <div key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={onClose}
                                    className="block px-3 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                  >
                                    {translateLabel(sub.label, locale)}
                                  </Link>
                                  {sub.children && (
                                    <div className="pl-4 flex flex-col gap-0.5">
                                      {sub.children.map((child) => (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          onClick={onClose}
                                          className="block px-3 py-2 text-xs text-text-muted hover:text-text-secondary hover:bg-white/5 rounded-lg transition-colors"
                                        >
                                          → {translateLabel(child.label, locale)}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={onClose}
                    className="px-3 py-3 rounded-lg text-text-primary font-medium hover:bg-white/6 hover:text-white transition-colors block"
                  >
                    {translateLabel(item.label, locale)}
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="px-6 pb-8">
              <Link
                href="/kontakt"
                onClick={onClose}
                className="block w-full text-center bg-magenta text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-magenta-light transition-colors shadow-[0_0_20px_rgba(230,0,126,0.3)]"
              >
                {tr.nav.kontakt}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
