import { Navbar } from "@/components/layout/Navbar";
import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  CTAFooterSection,
  ContentMascotsSection,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="content">
        <ContentMascotsSection />
      </div>
      <div id="stats">
        <StatsSection />
      </div>
      <div id="cta">
        <CTAFooterSection />
      </div>
    </div>
  );
}
