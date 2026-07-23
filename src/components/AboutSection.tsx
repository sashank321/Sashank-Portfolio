import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import { ABOUT_IMAGES } from "../data/marqueeImages";

const ABOUT_PARAGRAPH =
  "I'm a Computer Science undergraduate who turns ideas into polished, usable digital products. My work bridges engineering and design — I focus on Frontend Architecture, Machine Learning, Java, Python, and Design Systems, building applications that are structurally sound and delightfully interactive. I believe software should be an experience. Every interface I build prioritizes craftsmanship, precision, and human-centered interaction.";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* ───── Decorative 3D images (absolute corners) ───── */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none"
      >
        <img
          src={ABOUT_IMAGES.moon}
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
        />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none"
      >
        <img
          src={ABOUT_IMAGES.object}
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
        />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none"
      >
        <img
          src={ABOUT_IMAGES.lego}
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
        />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none"
      >
        <img
          src={ABOUT_IMAGES.group}
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto"
        />
      </FadeIn>

      {/* ───── Center column ───── */}
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn as="h2" delay={0} y={40} className="text-center">
            <span
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              About Sashank
            </span>
          </FadeIn>

          <AnimatedText
            text={ABOUT_PARAGRAPH}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
        </div>

        <ContactButton />
      </div>
    </section>
  );
}
