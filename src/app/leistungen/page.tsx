import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Alle Leistungen von Medyon: UI/UX Design, Website Design, Performance Marketing, KI-Automatisierungen, Branding, DOOH und mehr.",
};

export default function LeistungenPage() {
  return (
    <>
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-magenta/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionLabel>Was wir tun</SectionLabel>
          <h1 className="text-5xl sm:text-6xl font-black text-text-primary tracking-tight mb-5">
            Unsere <span className="text-gradient-magenta">Leistungen</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            Ganzheitliche Marketing- und Design-Leistungen — von der Strategie bis zum Screen.
          </p>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
