import { motion } from "framer-motion";

type LiveProjectButtonProps = {
  label?: string;
  layoutId?: string;
  onClick?: () => void;
  className?: string;
};

const SPRING_HOVER = { type: "spring" as const, stiffness: 300, damping: 15 };
const SPRING_TAP = { type: "spring" as const, stiffness: 500, damping: 20 };

/**
 * Premium glass pill button.
 *
 * Calm glass-surface aesthetic with a subtle specular highlight,
 * soft inner glow, faint backdrop blur, and refined border.
 * Hover produces a ~1.02 spring lift; click compresses to ~0.96.
 * Accepts a `layoutId` for Framer Motion shared layout transitions.
 */
export default function LiveProjectButton({
  label = "View Project",
  layoutId,
  onClick,
  className = "",
}: LiveProjectButtonProps) {
  return (
    <motion.button
      layoutId={layoutId}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        rounded-full border-2 border-[#D7E2EA]
        font-medium uppercase tracking-widest text-[#D7E2EA]
        px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base
        select-none cursor-pointer
        ${className}
      `}
      style={{
        background:
          "linear-gradient(135deg, rgba(215,226,234,0.08) 0%, rgba(215,226,234,0.02) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow:
          "inset 0 1px 0 rgba(215,226,234,0.2), 0 0 20px rgba(215,226,234,0.05)",
        willChange: "transform",
      }}
      whileHover={{
        scale: 1.02,
        background:
          "linear-gradient(135deg, rgba(215,226,234,0.14) 0%, rgba(215,226,234,0.04) 100%)",
        borderColor: "#e8edf2",
        boxShadow:
          "inset 0 1px 0 rgba(215,226,234,0.3), 0 0 30px rgba(215,226,234,0.1)",
        transition: SPRING_HOVER,
      }}
      whileTap={{
        scale: 0.96,
        transition: SPRING_TAP,
      }}
      transition={SPRING_HOVER}
    >
      {label}
    </motion.button>
  );
}
