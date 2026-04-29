import Link from "next/link";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { MedyonLogo } from "@/components/ui/MedyonLogo";
import { SERVICES, CONTACT_INFO } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night-50 border-t border-white/8 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <MedyonLogo iconSize={34} />
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Markenpositionierung, die wirkt. Wir verbinden Strategie, Design und digitale Werbung für B2B-Unternehmen.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://linkedin.com/company/medyon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-text-muted hover:text-teal hover:border-teal/40 transition-colors text-xs"
              >
                <ExternalLink size={12} />
                LinkedIn
              </a>
              <a
                href="https://instagram.com/medyon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-text-muted hover:text-magenta hover:border-magenta/40 transition-colors text-xs"
              >
                <ExternalLink size={12} />
                Instagram
              </a>
            </div>
          </div>

          {/* Col 2: Leistungen */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm mb-5 uppercase tracking-wider">Leistungen</h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-text-muted text-sm hover:text-text-secondary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Unternehmen */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm mb-5 uppercase tracking-wider">Unternehmen</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Medyon Methode", href: "/medyon-methode" },
                { label: "Über Uns", href: "/ueber-uns/vision" },
                { label: "Vision", href: "/ueber-uns/vision" },
                { label: "Werte", href: "/ueber-uns/werte" },
                { label: "Wir", href: "/ueber-uns/wir" },
                { label: "Insights", href: "/insights" },
                { label: "Karriere", href: "/karriere" },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Kontakt */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm mb-5 uppercase tracking-wider">Kontakt</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-text-muted text-sm hover:text-teal transition-colors"
                >
                  <Mail size={14} />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2 text-text-muted text-sm hover:text-text-secondary transition-colors"
                >
                  <Phone size={14} />
                  {CONTACT_INFO.phone}
                </a>
              </li>
            </ul>
            <Link
              href="/kontakt"
              className="mt-6 inline-flex items-center gap-2 bg-magenta/15 text-magenta text-sm font-semibold px-4 py-2.5 rounded-lg border border-magenta/25 hover:bg-magenta hover:text-white transition-all duration-200"
            >
              Termin vereinbaren
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © {year} Medyon GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/impressum" className="text-text-muted text-xs hover:text-text-secondary transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-text-muted text-xs hover:text-text-secondary transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
