import FadeIn from "./FadeIn";
import LocalTime from "./LocalTime";
import StarryBackground from "./StarryBackground";
import TextScramble from "./TextScramble";
import MagneticDock from "./ui/magnetic-dock";

const SOCIAL_LINKS = [
  { name: "LINKEDIN", url: "https://www.linkedin.com/in/sashank-junnuru-63a4b8395/" },
  { name: "GITHUB", url: "https://github.com/sashank321" },
  { name: "TWITTER", url: "https://twitter.com" },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative w-full pt-32 pb-12 select-none bg-black overflow-hidden"
    >
      <StarryBackground />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 flex flex-col justify-between">
        {/* Header */}
        <div className="max-w-[1000px] mt-8 mb-32">
          <FadeIn>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D7E2EA]/40 uppercase block mb-6">
              05 / Let's Connect
            </span>
          </FadeIn>
          
          <FadeIn delay={0.1} y={40}>
            <h2 
              className="hero-heading font-black uppercase leading-none tracking-tight text-[#D7E2EA] mb-12"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Let's Create<br/>Something Exceptional.
            </h2>
          </FadeIn>

          {/* Email */}
          <FadeIn delay={0.2} y={30}>
            <div className="group inline-block mt-4">
              <a
                href="mailto:junnurusasank@gmail.com"
                className="font-medium text-[clamp(1.5rem,4vw,4rem)] text-[#D7E2EA] hover:text-[#D7E2EA]/80 transition-colors duration-500 flex items-center gap-4 py-2 border-b border-[#D7E2EA]/20 pb-4"
              >
                <TextScramble text="junnurusasank@gmail.com" />
                <span className="inline-block transform transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-1">
                  &rarr;
                </span>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Footer */}
        <div className="border-t border-[#D7E2EA]/20 pt-16 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16">
            <div className="md:col-span-12 flex flex-col items-center justify-center space-y-4">
              <FadeIn delay={0.3} y={20}>
                <span className="text-[10px] font-bold text-[#D7E2EA]/40 tracking-[0.2em] uppercase block text-center mb-4">
                  Channels
                </span>
                <MagneticDock />
              </FadeIn>
            </div>

            <div className="md:col-span-12 flex flex-col items-center justify-center space-y-2 mt-8">
              <FadeIn delay={0.4} y={20}>
                <span className="text-[10px] font-bold text-[#D7E2EA]/40 tracking-[0.2em] uppercase block text-center">
                  Local Time
                </span>
                <div className="text-center">
                  <LocalTime />
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.5} y={20}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#D7E2EA]/40 border-t border-[#D7E2EA]/10 pt-8">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase">
                &copy; {currentYear} Sashank. All rights reserved.
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                Built with precision
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Engineered editorial
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
