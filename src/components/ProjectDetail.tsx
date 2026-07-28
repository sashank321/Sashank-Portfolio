import { motion } from "framer-motion";
import type { Project } from "../data/marqueeImages";
import SplitFlapDisplay from "./SplitFlapDisplay";

type ProjectDetailProps = {
  project: Project;
  onClose: () => void;
};

/* ───── Staggered reveal variants ───── */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
};

/**
 * Cyber-dossier project detail page.
 *
 * Renders inside the AnimatePresence overlay in ProjectsSection.
 * Content reveals in a staggered sequence.
 * Close collapses back into the origin button via `layoutId`.
 */
export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <div className="relative min-h-screen bg-[#0C0C0C] text-[#D7E2EA]">
      {/* ───── Scrollable content ───── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-28 md:px-12 md:py-32"
      >
        {/* ── Close button ── */}
        <motion.div variants={item} className="mb-12">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/40 transition-colors duration-300 hover:text-[#D7E2EA]"
          >
            {/* Arrow icon */}
            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 12 12"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H2m4 4L2 6l4-4" />
            </svg>
            Close
          </button>
        </motion.div>

        {/* ── Project header ── */}
        <motion.div variants={item} className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <span className="mb-2 block text-xs tracking-[0.25em] text-[#D7E2EA]/40 uppercase">
              {project.category} &middot; {project.year}
            </span>
            <h1
              className="font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
            >
              {project.name}
            </h1>
          </div>
          <div className="shrink-0">
            <SplitFlapDisplay
              text={`#${project.number}`}
              columns={4}
              size="lg"
            />
          </div>
        </motion.div>

        {/* ── Hero image ── */}
        <motion.div variants={item} className="mb-16 overflow-hidden rounded-[24px] border border-[#D7E2EA]/10">
          <img
            src={project.images.col2}
            alt={project.name}
            className="h-[300px] w-full object-cover sm:h-[400px] md:h-[500px]"
          />
        </motion.div>

        {/* ── Content grid ── */}
        <div className="space-y-20">
          {/* Overview */}
          <Section
            label="Overview"
            heading="The Vision & Context"
            text={project.overview}
          />

          {/* Problem */}
          <Section
            label="Problem"
            heading="The Challenge"
            text={project.problem}
          />

          {/* Tech Stack */}
          <motion.div variants={item}>
            <span className="mb-3 block text-xs tracking-[0.25em] text-[#D7E2EA]/40 uppercase">
              Technology
            </span>
            <h2 className="mb-6 font-medium uppercase tracking-tight text-[#D7E2EA]" style={{ fontSize: "clamp(1rem, 2.2vw, 1.8rem)" }}>
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 px-4 py-2 font-mono text-xs tracking-wider text-[#D7E2EA]/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Result */}
          <Section
            label="Result"
            heading="Outcome & Impact"
            text={project.result}
          />

          {/* Action links */}
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
            <ActionButton label="GitHub" href="#" />
            <ActionButton label="Live Demo" href="#" />
            <ActionButton label="Case Study" href="#" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ───── Reusable section block ───── */
function Section({
  label,
  heading,
  text,
}: {
  label: string;
  heading: string;
  text: string;
}) {
  return (
    <motion.div variants={item}>
      <span className="mb-3 block text-xs tracking-[0.25em] text-[#D7E2EA]/40 uppercase">
        {label}
      </span>
      <h2
        className="mb-6 font-medium uppercase tracking-tight text-[#D7E2EA]"
        style={{ fontSize: "clamp(1rem, 2.2vw, 1.8rem)" }}
      >
        {heading}
      </h2>
      <p
        className="max-w-3xl font-light leading-relaxed text-[#D7E2EA]/60"
        style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.15rem)" }}
      >
        {text}
      </p>
    </motion.div>
  );
}

/* ───── Action button ───── */
function ActionButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/70 transition-colors duration-300 hover:border-[#D7E2EA]/60 hover:text-[#D7E2EA]"
    >
      {label}
    </a>
  );
}
