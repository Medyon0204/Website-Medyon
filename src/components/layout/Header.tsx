"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { MedyonLogo } from "@/components/ui/MedyonLogo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/cn";
import type { NavDropdownItem } from "@/types/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import t from "@/lib/translations";
import type { Locale } from "@/lib/translations";

function translateNavLabel(label: string, locale: Locale): string {
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

function DropdownPanel({ items, locale }: { items: NavDropdownItem[]; locale: Locale }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass-card rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-50"
    >
      <div className="py-2">
        {items.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-text-secondary hover:text-magenta hover:bg-magenta/8 transition-colors group"
            >
              <span>{translateNavLabel(item.label, locale)}</span>
              {item.children && (
                <ChevronDown size={13} className="text-text-muted rotate-[-90deg]" />
              )}
            </Link>
            {item.children && (
              <div className="pl-4 border-l border-white/6 ml-4 my-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-3 py-2 text-xs text-text-muted hover:text-teal transition-colors"
                  >
                    {translateNavLabel(child.label, locale)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function NavItem({ item, locale }: { item: (typeof NAV_ITEMS)[number]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!item.dropdown) {
    return (
      <Link
        href={item.href!}
        className="text-sm text-text-secondary hover:text-white transition-colors duration-200 font-medium px-1 py-1"
      >
        {translateNavLabel(item.label, locale)}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors duration-200 font-medium px-1 py-1 cursor-pointer">
        {translateNavLabel(item.label, locale)}
        <ChevronDown
          size={14}
          className={`text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>{open && <DropdownPanel items={item.dropdown} locale={locale} />}</AnimatePresence>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale } = useLanguage();
  const tr = t[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-night/85 backdrop-blur-md border-b border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          {/* Logo + Subtitle */}
          <div className="flex flex-col gap-0.5 shrink-0">
            <MedyonLogo iconSize={32} />
            <span className="hidden lg:block text-[10px] text-text-muted tracking-wide leading-tight pl-0.5">
              {tr.headerSubtext}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 ml-4">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} item={item} locale={locale} />
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Kontakt Button */}
          <Link
            href="/kontakt"
            className="hidden lg:inline-flex items-center gap-2 bg-magenta text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-magenta-light transition-all duration-200 shadow-[0_0_16px_rgba(230,0,126,0.3)] hover:shadow-[0_0_28px_rgba(230,0,126,0.5)] active:scale-95"
          >
            {tr.nav.kontakt}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Menü öffnen"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
