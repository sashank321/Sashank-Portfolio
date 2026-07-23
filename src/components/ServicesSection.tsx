import FadeIn from "./FadeIn";
import { SERVICES, type Service } from "../data/marqueeImages";

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="mb-16 sm:mb-20 md:mb-28 text-center font-black uppercase text-[#0C0C0C]"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)", lineHeight: 1 }}
      >
        Skills
      </h2>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.number}
            delay={i * 0.1}
            y={30}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8 py-8 sm:py-10 md:py-12"
          >
            {/* 1px separator border between items (not above the first) */}
            <div
              className={`flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8 ${
                i !== 0 ? "border-t border-[rgba(12,12,12,0.15)] pt-8 sm:pt-10 md:pt-12" : ""
              }`}
            >
              {/* Number */}
              <span
                className="font-black leading-none text-[#0C0C0C] shrink-0"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {service.number}
              </span>

              {/* Name + description */}
              <div className="flex flex-col gap-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]/60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// Re-export type alias to keep file self-documenting.
export type { Service };
