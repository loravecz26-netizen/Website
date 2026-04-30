import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DriftOrb from "@/components/DriftOrb";
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
        <DriftOrb />
        <FeaturesSection />
        <TestimonialsSection />
        <DriftEmblem />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
