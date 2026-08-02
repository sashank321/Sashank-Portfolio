import { motion } from "framer-motion";
import { useMemo, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  /** Render as a different element, e.g. "h1", "span". Defaults to div. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Framer Motion wrapper using whileInView with viewport once/once-margin.
 * `motion.create()` lets us pick the underlying element dynamically.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className = "",
}: FadeInProps) {
  // Memoize so `motion.create` doesn't re-instantiate a component every render.
  const MotionTag = useMemo(() => motion.create(as as any), [as]);

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
