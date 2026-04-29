import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  accentColor?: "magenta" | "teal";
  problem: string;
  solution: string;
  deliverables: string[];
  processSteps: { title: string; desc: string }[];
}

export function ServicePageTemplate({
  title,
  subtitle,
  description,
  accentColor = "magenta",
  problem,
  solution,
  deliverables,
  processSteps,
}: ServicePageTemplateProps) {
  const isMagenta = accentColor === "magenta";

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-8 pb-0 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-text-secondary transition-colors"
          >
            <ArrowLeft size={14} />
            Alle Leistungen
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-12 pb-20 px-6 relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[100px] pointer-events-none ${
            isMagenta ? "bg-magenta/8" : "bg-teal/8"
          }`}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionLabel color={accentColor}>{subtitle}</SectionLabel>
          <h1 className="text-[clamp(1.6rem,6.5vw,3rem)] sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight mb-5 hyphens-auto break-words">
            {title.split(" ").map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className={isMagenta ? "text-gradient-magenta" : "text-gradient-teal"}>
                  {word}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl leading-relaxed">{description}</p>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-7">
            <h2 className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-4">Das Problem</h2>
            <p className="text-text-secondary leading-relaxed">{problem}</p>
          </div>
          <div
            className={`rounded-2xl p-7 border ${
              isMagenta ? "bg-magenta-muted border-magenta/20" : "bg-teal-muted border-teal/20"
            }`}
          >
            <h2
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                isMagenta ? "text-magenta" : "text-teal"
              }`}
            >
              Unsere Lösung
            </h2>
            <p className="text-text-secondary leading-relaxed">{solution}</p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 px-6 bg-night-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-text-primary mb-8">Was Sie erhalten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deliverables.map((item) => (
              <div key={item} className="flex items-start gap-3 glass-card rounded-xl p-4">
                <span className={`shrink-0 font-bold mt-0.5 ${isMagenta ? "text-magenta" : "text-teal"}`}>✓</span>
                <span className="text-text-secondary text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-text-primary mb-8">Unser Vorgehen</h2>
          <div className="flex flex-col gap-0">
            {processSteps.map((step, i) => (
              <div key={step.title} className="flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isMagenta ? "bg-magenta text-white" : "bg-teal text-night"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < processSteps.length - 1 && <div className="flex-1 w-px bg-white/8" />}
                </div>
                <div className="pb-2">
                  <h3 className="text-text-primary font-semibold mb-1">{step.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-black text-text-primary mb-4">{title} anfragen</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto text-sm">
          Lernen Sie uns kennen und erfahren Sie, wie wir Ihnen konkret helfen können.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 bg-magenta text-white font-bold px-8 py-4 rounded-lg hover:bg-magenta-light transition-all hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(230,0,126,0.4)]"
        >
          Jetzt anfragen
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
