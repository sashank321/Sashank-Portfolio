import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";
import LiveProjectButton from "./LiveProjectButton";
import { PROJECTS, type Project } from "../data/marqueeImages";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20"
    >
      <h2 className="text-center">
        <FadeIn as="span" delay={0} y={40}>
          <span
            className="hero-heading font-black uppercase leading-none tracking-tight block"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Project
          </span>
        </FadeIn>
      </h2>

      <div className="mx-auto mt-12 max-w-6xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            totalCards={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: Project;
  index: number;
  totalCards: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh] sticky top-24 md:top-32">
      <motion.div
        className="h-full w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
        style={{
          scale,
          top: index * 28,
          willChange: "transform",
        }}
      >
        {/* ───── Top row ───── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/50">
                {project.category}
              </span>
              <span
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* ───── Image grid ───── */}
        <div className="mt-4 sm:mt-6 flex flex-col gap-3 md:flex-row md:gap-3 h-[calc(100%-140px)] min-h-[280px]">
          {/* Left column 40% — 2 stacked images */}
          <div className="flex w-full flex-col gap-3 md:w-[40%]">
            <img
              src={project.images.col1Top}
              alt={`${project.name} 1`}
              loading="lazy"
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            <img
              src={project.images.col1Bottom}
              alt={`${project.name} 2`}
              loading="lazy"
              className="w-full flex-1 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>

          {/* Right column 60% — 1 tall image */}
          <div className="md:w-[60%]">
            <img
              src={project.images.col2}
              alt={`${project.name} 3`}
              loading="lazy"
              className="h-full min-h-[200px] w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
