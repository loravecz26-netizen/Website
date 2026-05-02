import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import DriftOrb from "@/components/DriftOrb";
import IndustriesSection from "@/components/IndustriesSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DriftEmblem from "@/components/DriftEmblem";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import { GlassFilter } from "@/components/GlassFilter";

export default function Home() {
  return (
    <>
      {/* SVG filter definition — referenced as filter: url(#radio-glass) */}
      <GlassFilter />

      {/* Navbar floats over the 3D hero */}
      <Navbar />

      {/* Three.js full-scroll hero — creates 300vh of scroll space */}
      <HeroSection />

      {/* Standard sections below the 3D hero */}
      <main>
        <HowItWorks />
        <DriftOrb />
        <IndustriesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <DriftEmblem />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
