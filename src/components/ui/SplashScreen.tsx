"use client";

import { useState, useEffect, ReactNode } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const SpiralAnimation = dynamic(
  () => import("@/components/ui/spiral-animation").then((m) => m.SpiralAnimation),
  { ssr: false }
);

interface SplashScreenProps {
  children: ReactNode;
  title: string;
  accentColor?: "magenta" | "teal";
}

export function SplashScreen({ children, title, accentColor = "magenta" }: SplashScreenProps) {
  const [phase, setPhase] = useState<"splash" | "exiting" | "content">("splash");
  const [buttonVisible, setButtonVisible] = useState(false);
  const isMagenta = accentColor === "magenta";

  useEffect(() => {
    const timer = setTimeout(() => setButtonVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setPhase("exiting");
    setTimeout(() => setPhase("content"), 800);
  };

  if (phase === "content") return <>{children}</>;

  const accentHex = isMagenta ? "#e6007e" : "#00c2cb";
  const accentRgb = isMagenta ? "230,0,126" : "0,194,203";
  const contrastHex = isMagenta ? "#00c2cb" : "#e6007e";

  const renderTitle = (text: string) => {
    if (!text.includes("/")) return text;
    const parts = text.split("/");
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && <span style={{ color: accentHex }}>/</span>}
      </span>
    ));
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-700 ${
        phase === "exiting" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#010a1b" }}
    >
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(1,10,27,0.55) 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(1,10,27,0.7), transparent)" }}
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-10 z-10 transition-all duration-1000 ${
          buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center select-none">
          <p className="text-[10px] uppercase tracking-[0.45em] mb-2" style={{ color: "rgba(240,244,248,0.35)" }}>
            Medyon
          </p>
          <p className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: "rgba(240,244,248,0.9)" }}>
            {renderTitle(title)}
          </p>
        </div>

        <button
          onClick={handleEnter}
          className="group relative flex items-center gap-3 px-10 py-4 rounded-full text-sm uppercase tracking-[0.25em] font-light transition-all duration-500"
          style={{
            color: "rgba(240,244,248,0.9)",
            border: `1px solid rgba(${accentRgb},0.35)`,
            backdropFilter: "blur(12px)",
            background: `rgba(${accentRgb},0.06)`,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = `rgba(${accentRgb},0.9)`;
            el.style.background = `rgba(${accentRgb},0.14)`;
            el.style.boxShadow = `0 0 40px rgba(${accentRgb},0.35), inset 0 0 20px rgba(${accentRgb},0.06)`;
            el.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = `rgba(${accentRgb},0.35)`;
            el.style.background = `rgba(${accentRgb},0.06)`;
            el.style.boxShadow = "";
            el.style.color = "rgba(240,244,248,0.9)";
          }}
        >
          <span>Enter</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <div
          className="w-8 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${contrastHex}, transparent)` }}
        />
      </div>
    </div>
  );
}
