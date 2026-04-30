"use client";

import { useEffect, useState } from "react";
import { MedyonLogo } from "@/components/ui/MedyonLogo";

export function HeroSplash() {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");

  useEffect(() => {
    const dismiss = () => {
      setPhase("fading");
      setTimeout(() => setPhase("done"), 750);
    };

    window.addEventListener("hero:canvas:ready", dismiss, { once: true });
    // Fallback: if canvas never fires (slow device / error), hide after 4s
    const fallback = setTimeout(dismiss, 4000);

    return () => {
      window.removeEventListener("hero:canvas:ready", dismiss);
      clearTimeout(fallback);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#010a1b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      <MedyonLogo iconSize={52} />

      {/* Gradient loading bar */}
      <div
        style={{
          width: 140,
          height: 2,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 2,
            background: "linear-gradient(90deg, #00c2cb, #e6007e)",
            animation: "splashBar 1.8s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
