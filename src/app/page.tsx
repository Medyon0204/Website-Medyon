import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MethodeSection } from "@/components/sections/MethodeSection";
import { ReferencesSection } from "@/components/sections/ReferencesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";

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
