import type { NavItem } from "@/types/navigation";
import type { Service, MethodeStep, Stat } from "@/types/content";

export const NAV_ITEMS: NavItem[] = [
  { label: "Medyon Methode", href: "/medyon-methode" },
  {
    label: "Leistungen",
    dropdown: [
      { label: "UI/UX Design", href: "/leistungen/ui-ux-design" },
      { label: "Website Design", href: "/leistungen/website-design" },
      { label: "Performance Marketing", href: "/leistungen/performance-marketing" },
      { label: "KI-Automatisierungen", href: "/leistungen/ki-automatisierungen" },
      { label: "Branding", href: "/leistungen/branding" },
      { label: "Marketing Beratung", href: "/leistungen/marketing-beratung" },
      {
        label: "Werbung",
        href: "/leistungen/werbung",
        children: [
          { label: "Point of Sale", href: "/leistungen/werbung/point-of-sale" },
          { label: "DOOH", href: "/leistungen/werbung/dooh" },
        ],
      },
      { label: "Unternehmensberatung", href: "/leistungen/unternehmensberatung" },
      { label: "Marktanalyse", href: "/leistungen/marktanalyse" },
    ],
  },
  {
    label: "Über Uns",
    dropdown: [
      { label: "Vision", href: "/ueber-uns/vision" },
      { label: "Werte", href: "/ueber-uns/werte" },
      { label: "Wir", href: "/ueber-uns/wir" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Karriere", href: "/karriere" },
];

export const CONTACT_INFO = {
  email: "info@medyon.de",
  phone: "+49 (0) 800 000 000",
};

export const SERVICES: Service[] = [
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Interfaces, die Nutzer begeistern und Conversions steigern – durch datenbasiertes Design.",
    href: "/leistungen/ui-ux-design",
    icon: "Layout",
    accentColor: "magenta",
  },
  {
    id: "website-design",
    title: "Website Design",
    description: "Performante, markenkonforme Websites, die Vertrauen schaffen und Leads generieren.",
    href: "/leistungen/website-design",
    icon: "Globe",
    accentColor: "teal",
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    description: "Messbare Ergebnisse durch datengetriebene Kampagnen auf allen relevanten Kanälen.",
    href: "/leistungen/performance-marketing",
    icon: "TrendingUp",
    accentColor: "magenta",
  },
  {
    id: "ki-automatisierungen",
    title: "KI-Automatisierungen",
    description: "Intelligente Prozessautomatisierung, die Ihre Marketingeffizienz auf das nächste Level hebt.",
    href: "/leistungen/ki-automatisierungen",
    icon: "Cpu",
    accentColor: "teal",
  },
  {
    id: "branding",
    title: "Branding",
    description: "Unverwechselbare Markenidentitäten, die in den Köpfen Ihrer Zielgruppe bleiben.",
    href: "/leistungen/branding",
    icon: "Layers",
    accentColor: "magenta",
  },
  {
    id: "marketing-beratung",
    title: "Marketing Beratung",
    description: "Strategische Beratung, die Ihr Marketing gezielt ausrichtet und messbar macht.",
    href: "/leistungen/marketing-beratung",
    icon: "MessageSquare",
    accentColor: "teal",
  },
  {
    id: "werbung",
    title: "Werbung",
    description: "Aufmerksamkeitsstarke Werbung am Point of Sale und im öffentlichen Raum – DOOH und mehr.",
    href: "/leistungen/werbung",
    icon: "Monitor",
    accentColor: "magenta",
  },
  {
    id: "unternehmensberatung",
    title: "Unternehmensberatung",
    description: "Ganzheitliche Beratung für nachhaltiges Wachstum und klare Marktpositionierung.",
    href: "/leistungen/unternehmensberatung",
    icon: "Briefcase",
    accentColor: "teal",
  },
  {
    id: "marktanalyse",
    title: "Marktanalyse",
    description: "Fundierte Marktanalysen, die Potenziale aufdecken und strategische Entscheidungen untermauern.",
    href: "/leistungen/marktanalyse",
    icon: "BarChart2",
    accentColor: "magenta",
  },
];

export const METHODE_STEPS: MethodeStep[] = [
  {
    step: 1,
    title: "Analyse",
    description: "Tiefes Verständnis Ihrer Marktposition, Zielgruppe und Wettbewerber.",
    details: [
      "Wettbewerbsanalyse & Marktpotenzial",
      "Zielgruppen-Profiling & Buyer Personas",
      "Audit bestehender Maßnahmen",
      "Identifikation von Quick Wins",
    ],
  },
  {
    step: 2,
    title: "Strategie",
    description: "Entwicklung eines maßgeschneiderten Positionierungskonzepts für Ihre Marke.",
    details: [
      "Positionierungsstrategie & Messaging",
      "Kanalauswahl & Budget-Allokation",
      "Content- & Kommunikationsstrategie",
      "KPI-Definition & Erfolgsmessung",
    ],
  },
  {
    step: 3,
    title: "Umsetzung",
    description: "Präzise Implementierung über alle relevanten Touchpoints Ihrer Marke.",
    details: [
      "Kreative Konzeption & Design",
      "Technische Implementierung",
      "Kampagnen-Setup & Launch",
      "Cross-Channel-Koordination",
    ],
  },
  {
    step: 4,
    title: "Optimierung",
    description: "Kontinuierliche Messung, Analyse und datengetriebene Verbesserung.",
    details: [
      "Performance-Monitoring & Reporting",
      "A/B-Testing & Conversion-Optimierung",
      "Iterative Anpassungen",
      "Skalierung erfolgreicher Maßnahmen",
    ],
  },
];

export const STATS: Stat[] = [
  { value: "50", suffix: "+", label: "Projekte umgesetzt" },
  { value: "98", suffix: "%", label: "Kundenzufriedenheit" },
  { value: "12", suffix: "+", label: "Jahre Erfahrung" },
  { value: "3x", label: "Durchschn. ROI-Steigerung" },
];

export const MARQUEE_ITEMS = [
  "Strategie",
  "Branding",
  "Performance",
  "Website Design",
  "UI/UX Design",
  "DOOH",
  "Point of Sale",
  "KI-Automatisierung",
  "Marktanalyse",
  "Unternehmensberatung",
  "B2B Marketing",
  "Markenpositionierung",
];
