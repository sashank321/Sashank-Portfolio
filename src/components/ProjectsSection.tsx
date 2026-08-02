import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from "framer-motion";
import FadeIn from "./FadeIn";
import LiveProjectButton from "./LiveProjectButton";
import ProjectDetail from "./ProjectDetail";
import StarryBackground from "./StarryBackground";
import { PROJECTS, type Project } from "../data/marqueeImages";

/**
 * Spring preset used for all layout morphs — confident, no bounce.
 */
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isOpen = selectedProject !== null;

  /* ───── Scroll lock + background dimming ─────
     Dim + desaturate via a solid backdrop div behind the overlay instead of
     blurring the entire <main> (which re-rasterizes the WebGL canvas and
     thousands of pixels every frame of the transition). */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ───── Escape to close ───── */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const openProject = useCallback((p: Project) => setSelectedProject(p), []);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <LayoutGroup>
      <section
        id="projects"
        className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-black rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20"
        aria-hidden={isOpen}
      >
        <StarryBackground />
        <h2 className="text-center relative z-10">
          <FadeIn as="span" delay={0} y={40}>
            <span
              className="hero-heading font-black uppercase leading-none tracking-tight block"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Project
            </span>
          </FadeIn>
        </h2>

        <div className="mx-auto mt-12 max-w-6xl relative z-10">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={i}
              totalCards={PROJECTS.length}
              onOpen={() => openProject(project)}
            />
          ))}
        </div>
      </section>

      {/* ───── Expanded overlay ───── */}
      {typeof document !== "undefined" ? createPortal(
        <AnimatePresence mode="sync">
          {selectedProject && (
            <>
              {/* Solid dim underneath — opacity-only, zero repaint cost */}
              <motion.div
                key={`backdrop-${selectedProject.number}`}
                className="fixed inset-0 z-40 bg-[#0C0C0C]/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeProject}
                aria-hidden="true"
              />
              <motion.div
                key={`overlay-${selectedProject.number}`}
                layoutId={`project-expand-${selectedProject.number}`}
                className="fixed inset-0 z-50 overflow-auto bg-[#0C0C0C] rounded-none"
                style={{ willChange: "transform" }}
                transition={SPRING}
              >
                <ProjectDetail project={selectedProject} onClose={closeProject} />
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      ) : null}
    </LayoutGroup>
  );
}

/* ================================================================== */

function ProjectCard({
  project,
  index,
  totalCards,
  onOpen,
}: {
  project: Project;
  index: number;
  totalCards: number;
  onOpen: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh] sticky top-24 md:top-32">
      <motion.div
        layoutId={`project-expand-${project.number}`}
        className="h-full w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
        style={{
          scale,
          top: index * 28,
          willChange: "transform",
        }}
        transition={SPRING}
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
              <p
                className="mt-1 font-light leading-relaxed text-[#D7E2EA]/40"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 1rem)" }}
              >
                {project.description}
              </p>
            </div>
          </div>
          <LiveProjectButton
            layoutId={`project-btn-${project.number}`}
            onClick={onOpen}
          />
        </div>

        {/* ───── Image grid ───── */}
        <div className="mt-4 sm:mt-6 flex flex-col gap-3 md:flex-row md:gap-3 h-[calc(100%-140px)] min-h-[280px]">
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
