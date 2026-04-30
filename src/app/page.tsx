import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import DriftOrb from "@/components/DriftOrb";
import IndustriesSection from "@/components/IndustriesSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DriftEmblem from "@/components/DriftEmblem";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
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
