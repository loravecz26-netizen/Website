import HeroSection from "@/components/HeroSection";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import { BentoGrid } from "@/components/BentoGrid";
import DriftOrb from "@/components/DriftOrb";
import IndustriesSection from "@/components/IndustriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DriftEmblem from "@/components/DriftEmblem";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

/* Wrapper that adds the section header + divider around the bento grid */
function PlatformSection() {
  return (
    <section id="platform" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(201,168,76,0.04),transparent)]" />
      <div className="divider w-full max-w-7xl mx-auto mb-24" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10 relative z-10">
        <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-3">
          The Platform
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Everything in one place.
          <br />
          <span className="gold-text">Nothing left out.</span>
        </h2>
      </div>
      <BentoGrid />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CinematicHero />
      <main>
        <HowItWorks />
        <PlatformSection />
        <DriftOrb />
        <IndustriesSection />
        <TestimonialsSection />
        <DriftEmblem />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
