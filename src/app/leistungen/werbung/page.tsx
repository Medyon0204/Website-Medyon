import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
export const metadata: Metadata = { title: "Werbung", description: "Point of Sale und Digital Out-of-Home Werbung von Medyon." };
export default function WerbungPage() {
  return (
    <>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Leistung</SectionLabel>
          <h1 className="text-5xl sm:text-6xl font-black text-text-primary tracking-tight mb-5">
            <span className="text-gradient-magenta">Werbung</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            Aufmerksamkeitsstarke Werbung am Point of Sale und im öffentlichen Raum — physisch präsent, digital gesteuert.
          </p>
        </div>
      </section>
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Point of Sale", href: "/leistungen/werbung/point-of-sale", desc: "Gezielte Werbemaßnahmen direkt am Ort der Kaufentscheidung — effektiv und messbar.", color: "magenta" as const },
            { title: "DOOH", href: "/leistungen/werbung/dooh", desc: "Digital Out-of-Home Screens für maximale Sichtbarkeit im öffentlichen Raum.", color: "teal" as const },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="glass-card rounded-2xl p-8 hover:border-white/15 transition-all group">
              <h2 className={`text-2xl font-black mb-3 ${item.color === "magenta" ? "text-magenta" : "text-teal"}`}>{item.title}</h2>
              <p className="text-text-secondary mb-5 leading-relaxed">{item.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted group-hover:text-white transition-colors">
                Mehr erfahren <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
