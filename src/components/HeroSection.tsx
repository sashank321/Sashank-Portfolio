import FadeIn from "./FadeIn";
import AsciiHead from "./AsciiHead";
import { motion } from "framer-motion";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

export default function HeroSection() {
  return (
    <section
      className="relative flex h-screen w-full flex-col bg-black overflow-hidden"
    >
      {/* ───── Navbar ───── */}
      <FadeIn as="nav" delay={0} y={-20} className="px-6 md:px-10 pt-6 md:pt-8 relative z-50">
        <ul className="flex w-full items-center justify-between">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 text-sm md:text-lg lg:text-[1.4rem]"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* ───── Hero Heading ───── */}
      <FadeIn
        delay={0.15}
        y={40}
        as="div"
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 text-shadow-depth"
      >
        <div className="relative flex items-center justify-center -ml-[6vw]">
          <span className="hero-heading absolute bottom-[95%] left-[0] sm:left-[1vw] md:left-[1.5vw] lg:left-[2vw] text-[4.5vw] sm:text-[5vw] md:text-[5.5vw] lg:text-[6vw] font-black uppercase tracking-tight leading-none whitespace-nowrap">
            Hi, i&apos;m
          </span>
          <motion.span 
            initial={{ filter: "blur(12px)", scale: 0.9, opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="shimmer-red text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw] font-['Anton'] uppercase tracking-normal leading-none"
          >
            sashank
          </motion.span>
        </div>
      </FadeIn>

      {/* ───── Hero Portrait (3D ASCII) ───── */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute right-0 bottom-0 z-40 pointer-events-auto"
      >
        <AsciiHead />
      </FadeIn>

      {/* ───── Bottom Bar ───── */}
      <div className="mt-auto flex items-end justify-between pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn
          delay={0.35}
          y={20}
          as="p"
          className="font-light uppercase tracking-wide leading-snug text-[#D7E2EA] max-w-[140px] sm:max-w-[180px] md:max-w-[220px]"
          // fluid font size
        >
          <span
            style={{
              fontSize: "clamp(0.6rem, 1vw, 1.1rem)",
            }}
          >
            a software engineer building thoughtful digital products that combine engineering, clean design, and delightful interactions.
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
