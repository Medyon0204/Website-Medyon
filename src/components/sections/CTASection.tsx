import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-night" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-magenta/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-teal/6 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-magenta">
          <span className="inline-block w-6 h-px bg-magenta" />
          Nächster Schritt
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-tight tracking-tight">
          Bereit für den <span className="text-gradient-dual">nächsten Schritt</span>?
        </h2>
        <p className="text-text-secondary text-lg max-w-xl leading-relaxed">
          Vereinbaren Sie ein kostenloses Erstgespräch und erfahren Sie, wie die Medyon Methode Ihre Marke transformiert.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-magenta text-white font-bold px-8 py-4 rounded-lg hover:bg-magenta-light transition-all duration-200 animate-pulse-glow hover:scale-105 active:scale-95 text-base"
          >
            Termin vereinbaren
            <ArrowRight size={17} />
          </Link>
        </div>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-text-secondary transition-colors"
        >
          <Mail size={14} />
          oder schreiben Sie uns: {CONTACT_INFO.email}
        </a>
      </div>
    </section>
  );
}
