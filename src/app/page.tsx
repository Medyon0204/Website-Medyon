import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";

const ServicesSection = dynamic(() =>
  import("@/components/sections/ServicesSection").then((m) => ({ default: m.ServicesSection }))
);
const MethodeSection = dynamic(() =>
  import("@/components/sections/MethodeSection").then((m) => ({ default: m.MethodeSection }))
);
const ReferencesSection = dynamic(() =>
  import("@/components/sections/ReferencesSection").then((m) => ({ default: m.ReferencesSection }))
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <MethodeSection />
      <StatsSection />
      <ReferencesSection />
      <CTASection />
    </>
  );
}
