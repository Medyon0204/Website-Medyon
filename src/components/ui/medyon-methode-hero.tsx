"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARD_START_SCALE_DESKTOP = 0.6;
const CARD_START_SCALE_MOBILE = 0.82;
const IMMERSE_OVERFILL = 1.04;

const STEPS = [
  { num: "01", label: "Analyse", teal: true },
  { num: "02", label: "Strategie", teal: true },
  { num: "03", label: "Umsetzung", teal: false },
  { num: "04", label: "Optimierung", teal: false },
];

export function MedyonMethodeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleTopRef = useRef<HTMLHeadingElement>(null);
  const titleBottomRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const titleTop = titleTopRef.current;
      const titleBottom = titleBottomRef.current;
      const card = cardRef.current;
      if (!section || !titleTop || !titleBottom || !card) return;

      const isMobile = window.innerWidth < 768;
      const startScale = isMobile ? CARD_START_SCALE_MOBILE : CARD_START_SCALE_DESKTOP;

      gsap.set(card, { scale: startScale });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        })
        .to(titleTop, { xPercent: -130, duration: 1 }, 0)
        .to(titleBottom, { xPercent: 130, duration: 1 }, 0)
        .to(card, { scale: IMMERSE_OVERFILL, duration: 1 }, 0)
        .to({}, { duration: 0.5 })
        .to(titleTop, { xPercent: 0, duration: 1 })
        .to(titleBottom, { xPercent: 0, duration: 1 }, "<")
        .to(card, { scale: startScale, duration: 1 }, "<");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: "420vh" }}
      className="relative"
      aria-label="Medyon Methode – Cinematic Intro"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "#010a1b" }}
      >
        {/* Ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(0,194,203,0.06) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 80% 50%, rgba(230,0,126,0.06) 0%, transparent 55%)",
          }}
        />

        {/* Title top – "Medyon" */}
        <h2
          ref={titleTopRef}
          className="absolute left-0 w-full text-center select-none pointer-events-none"
          style={{
            top: "clamp(2.5rem, 14%, 7rem)",
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
            fontWeight: 900,
            color: "#f0f4f8",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          Medyon
        </h2>

        {/* Card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden"
          style={{
            width: "min(440px, 86vw)",
            aspectRatio: "9 / 16",
            borderRadius: "1.75rem",
            background: "#0d1f36",
            border: "1px solid rgba(255,255,255,0.09)",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            gap: "clamp(1.2rem, 3.5vh, 2.5rem)",
            padding: "clamp(2rem, 6vw, 3.5rem)",
            zIndex: 5,
          }}
        >
          {/* Animated dual-gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 25% 30%, rgba(0,194,203,0.22) 0%, transparent 58%), " +
                "radial-gradient(ellipse at 75% 72%, rgba(230,0,126,0.22) 0%, transparent 58%)",
              animation: "methodePulse 5s ease-in-out infinite",
            }}
          />

          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "2px",
              background: "linear-gradient(90deg, #00c2cb, #e6007e)",
            }}
          />

          {/* Process steps */}
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="relative flex items-center gap-4 w-full"
              style={{ zIndex: 10 }}
            >
              {/* Number */}
              <span
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: step.teal ? "#00c2cb" : "#e6007e",
                  minWidth: "2rem",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {step.num}
              </span>

              {/* Divider line */}
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: `linear-gradient(90deg, ${step.teal ? "#00c2cb" : "#e6007e"}55, transparent)`,
                }}
              />

              {/* Label */}
              <span
                style={{
                  fontSize: "clamp(1.2rem, 3.8vw, 2rem)",
                  fontWeight: 800,
                  color: "#f0f4f8",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.1,
                }}
              >
                {step.label}
              </span>
            </div>
          ))}

          {/* Bottom accent bar */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "2px",
              background: "linear-gradient(90deg, #e6007e, #00c2cb)",
            }}
          />
        </div>

        {/* Title bottom – "Methode" (gradient text) */}
        <h2
          ref={titleBottomRef}
          className="absolute left-0 w-full text-center select-none pointer-events-none"
          style={{
            bottom: "clamp(2.5rem, 14%, 7rem)",
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #e6007e 0%, #00c2cb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          Methode
        </h2>
      </div>
    </section>
  );
}
