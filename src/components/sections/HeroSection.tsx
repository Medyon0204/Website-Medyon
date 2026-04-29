"use client";

import dynamic from "next/dynamic";

const WovenLightHero = dynamic(
  () =>
    import("@/components/ui/woven-light-hero").then((m) => ({
      default: m.WovenLightHero,
    })),
  { ssr: false }
);

export function HeroSection() {
  return <WovenLightHero />;
}
