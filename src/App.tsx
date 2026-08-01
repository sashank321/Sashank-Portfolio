import { ReactLenis } from "@studio-freight/react-lenis";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <main
        className="min-h-screen bg-[#0C0C0C]"
        style={{ overflowX: "clip" }}
      >
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <FooterSection />
      </main>
    </ReactLenis>
  );
}
