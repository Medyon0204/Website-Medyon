import type { Metadata } from "next";
import { Mail, Phone, CalendarDays } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/ui/ContactForm";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Nehmen Sie Kontakt mit Medyon auf und vereinbaren Sie ein kostenloses Erstgespräch.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Schreiben Sie uns</SectionLabel>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-4">
            Jetzt <span className="text-gradient-magenta">Kontakt</span> aufnehmen
          </h1>
          <p className="text-text-secondary text-xl max-w-xl leading-relaxed">
            Lernen Sie uns in einem kostenlosen Erstgespräch kennen — unverbindlich und auf Augenhöhe.
          </p>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
              <h2 className="text-text-primary font-bold">Direkt erreichen</h2>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-text-secondary hover:text-teal transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-muted flex items-center justify-center shrink-0 group-hover:bg-teal/20 transition-colors">
                  <Mail size={16} className="text-teal" />
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-0.5">E-Mail</div>
                  <div className="text-sm font-medium">{CONTACT_INFO.email}</div>
                </div>
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-night-200 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-text-muted" />
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-0.5">Telefon</div>
                  <div className="text-sm font-medium">{CONTACT_INFO.phone}</div>
                </div>
              </a>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-magenta/15 bg-magenta-muted">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-magenta/15 flex items-center justify-center">
                  <CalendarDays size={16} className="text-magenta" />
                </div>
                <h3 className="text-text-primary font-semibold text-sm">Termin vereinbaren</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Lieber direkt einen Termin buchen? Wählen Sie einfach einen freien Slot in unserem Kalender.
              </p>
              <a
                href="mailto:info@medyon.de?subject=Terminanfrage"
                className="inline-flex items-center gap-2 bg-magenta text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-magenta-light transition-all active:scale-95"
              >
                <CalendarDays size={14} />
                Termin anfragen
              </a>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-3">Antwortzeit</h3>
              <p className="text-text-secondary text-sm">Wir antworten in der Regel <span className="text-teal font-semibold">innerhalb von 24 Stunden</span> auf Ihre Anfragen.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
