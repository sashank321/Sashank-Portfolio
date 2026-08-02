import FadeIn from "./FadeIn";

/**
 * SKILLS — editorial numbered list on a white panel that sits on top of
 * the dark About section. Active rows read dark; inactive rows dim to ~40%.
 *
 * Content below is placeholder data shaped to match your screenshots —
 * swap in your real skills / descriptions later.
 *
 * (Row-hover image reveal intentionally omitted for now — add the image map
 *  once you provide the real assets.)
 */

type SkillRow = {
  number: string;
  name: string;
  description: string;
  primary?: boolean; // true = full-dark; false/undefined = dimmed
};

const SKILLS: SkillRow[] = [
  {
    number: "01",
    name: "Frontend",
    description:
      "React, Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion — building performant, interactive user interfaces with modern frameworks and animation libraries.",
    primary: true,
  },
  {
    number: "02",
    name: "Backend",
    description:
      "Node.js, Python, Java, RESTful APIs, GraphQL, Microservices — architecting scalable server-side systems and clean API designs.",
  },
  {
    number: "03",
    name: "Data & ML",
    description:
      "PyTorch, TensorFlow, Scikit-Learn, Pandas, Jupyter, NumPy — training predictive models, neural networks, and data pipelines for real-world classification and regression tasks.",
    primary: true,
  },
  {
    number: "04",
    name: "Tools",
    description:
      "Git / GitHub, Figma, Docker, Vercel, VS Code, CI/CD — leveraging professional-grade tooling for version control, design collaboration, containerization, and deployment.",
  },
  {
    number: "05",
    name: "Java",
    description:
      "Object-oriented programming, multithreading, design patterns, and system architecture — building robust, scalable, enterprise-grade systems with clean, maintainable code.",
  },
  {
    number: "06",
    name: "DSA",
    description:
      "Data Structures & Algorithms — arrays, trees, graphs, dynamic programming, and complexity analysis for solving computationally intensive problems efficiently.",
    primary: true,
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative -mt-10 sm:-mt-14 md:-mt-16 bg-white rounded-t-[40px] sm:rounded-t-[56px] md:rounded-t-[72px] px-6 md:px-12 lg:px-16 py-16 md:py-24 z-10"
    >
      {/* ───── Heading ───── */}
      <FadeIn as="h2" y={40} delay={0}>
        <span
          className="block text-center font-black uppercase text-[#0C0C0C] leading-[0.9] tracking-tight select-none"
          style={{ fontSize: "clamp(4rem, 14vw, 220px)" }}
        >
          SKILLS
        </span>
      </FadeIn>

      {/* ───── Numbered list ───── */}
      <div className="mx-auto mt-12 sm:mt-16 md:mt-24 max-w-5xl">
        {SKILLS.map((row, i) => {
          const dim = !row.primary;
          return (
            <FadeIn
              key={row.number}
              y={30}
              delay={i * 0.08}
              className={`grid grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start py-10 sm:py-12 md:py-14 transition-opacity duration-300 ${
                i !== 0 ? "border-t border-[#0C0C0C]/10" : ""
              } ${dim ? "opacity-40" : "opacity-100"}`}
            >
              {/* Big number */}
              <span
                className="font-black leading-[0.85] text-[#0C0C0C] select-none"
                style={{ fontSize: "clamp(4rem, 10vw, 160px)" }}
              >
                {row.number}
              </span>

              {/* Name + description */}
              <div className="flex flex-col gap-1.5 sm:gap-3 pt-1 sm:pt-2">
                <h3
                  className="font-medium text-[#0C0C0C] leading-none"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  {row.name}
                </h3>
                <p
                  className="max-w-xl font-light leading-relaxed text-[#0C0C0C]/60"
                  style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)" }}
                >
                  {row.description}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
