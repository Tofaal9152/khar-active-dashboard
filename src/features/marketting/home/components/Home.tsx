import BackgroundSketches from "./BackgroundSketches";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <div className="min-h-[80vh] relative overflow-hidden bg-[#F3F1EE]">
      {/* sketches must be edge-to-edge (NOT inside padded main) */}
      <BackgroundSketches />

      {/* HERO */}
      <HeroSection />
    </div>
  );
}
