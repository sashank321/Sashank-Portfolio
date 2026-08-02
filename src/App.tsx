import { ReactLenis } from "@studio-freight/react-lenis";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  return (
    <ReactLenis
      root
      options={{
        // Single source of truth: `lerp` drives smoothing; `duration` is ignored
        // while lerp is set. 0.09 = present but buttery, not syrupy.
        lerp: 0.09,
        smoothWheel: true,
        // Exponential ease-out so it settles softly rather than linearly.
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      <main
        className="min-h-screen bg-[#0C0C0C]"
        style={{ overflowX: "clip" }}
      >
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <FooterSection />
      </main>
    </ReactLenis>
  );
}
