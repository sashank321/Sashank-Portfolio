import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import ContactButton from "./ContactButton";
import { PORTRAIT_URL } from "../data/marqueeImages";

const NAV_LINKS = ["About", "Price", "Projects", "Contact"];

export default function HeroSection() {
  return (
    <section
      className="relative flex h-screen w-full flex-col"
      style={{ overflowX: "clip" }}
    >
      {/* ───── Navbar ───── */}
      <FadeIn as="nav" delay={0} y={-20} className="px-6 md:px-10 pt-6 md:pt-8">
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
        className="overflow-hidden mt-6 sm:mt-4 md:-mt-5"
      >
        <h1 className="hero-heading w-full whitespace-nowrap font-black uppercase tracking-tight leading-none text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Hi, i&apos;m jack
        </h1>
      </FadeIn>

      {/* ───── Hero Portrait (absolute, magnetic) ───── */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 z-10 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 sm:translate-y-0"
      >
        <Magnet padding={150} strength={3}>
          <img
            src={PORTRAIT_URL}
            alt="Jack portrait"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] h-auto object-contain select-none"
            draggable={false}
          />
        </Magnet>
      </FadeIn>

      {/* ───── Bottom Bar ───── */}
      <div className="mt-auto flex items-end justify-between pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn
          delay={0.35}
          y={20}
          as="p"
          className="font-light uppercase tracking-wide leading-snug text-[#D7E2EA] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          // fluid font size
        >
          <span
            style={{
              fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
            }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </span>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
