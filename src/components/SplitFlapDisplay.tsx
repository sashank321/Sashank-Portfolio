import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type SplitFlapDisplayProps = {
  text: string;
  /** Max character columns (defaults to text length). */
  columns?: number;
  /** Tile size variant. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_MAP = {
  sm: { width: 24, height: 32, fontSize: "0.65rem" },
  md: { width: 32, height: 42, fontSize: "0.85rem" },
  lg: { width: 44, height: 56, fontSize: "1.1rem" },
};

/**
 * Lightweight split-flap display.
 *
 * Renders each character of `text` inside a tile with a vertical flip
 * animation.  Uses CSS perspective + rotateX for the card-flip feel.
 * Non-alphanumeric characters render as a dimmed tile.
 */
export default function SplitFlapDisplay({
  text,
  columns,
  size = "md",
  className = "",
}: SplitFlapDisplayProps) {
  const chars = text
    .toUpperCase()
    .padEnd(columns ?? text.length, " ")
    .split("");
  const dims = SIZE_MAP[size];

  return (
    <div
      className={`inline-flex gap-[2px] ${className}`}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <FlapTile key={`${i}-${char}`} char={char} dims={dims} index={i} />
      ))}
    </div>
  );
}

function FlapTile({
  char,
  dims,
  index,
}: {
  char: string;
  dims: { width: number; height: number; fontSize: string };
  index: number;
}) {
  const isEmpty = char === " ";
  const [flipped, setFlipped] = useState(false);

  // stagger the flip per tile
  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 40 + index * 60);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className="relative overflow-hidden rounded border border-[#D7E2EA]/20 bg-[#1a1a1a]"
      style={{ width: dims.width, height: dims.height }}
    >
      {/* Top half (static) */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#1a1a1a]">
        <span
          className="absolute inset-x-0 top-0 h-[200%] flex items-center justify-center font-mono font-bold leading-none text-[#D7E2EA]"
          style={{ fontSize: dims.fontSize }}
        >
          {isEmpty ? "" : char}
        </span>
      </div>

      {/* Bottom half (static) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#111]">
        <span
          className="absolute inset-x-0 bottom-0 h-[200%] flex items-center justify-center font-mono font-bold leading-none text-[#D7E2EA]"
          style={{ fontSize: dims.fontSize }}
        >
          {isEmpty ? "" : char}
        </span>
      </div>

      {/* Flap — flips on mount */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 origin-bottom overflow-hidden bg-[#1a1a1a]"
        style={{
          transformOrigin: "bottom center",
          zIndex: 2,
          backfaceVisibility: "hidden",
        }}
        initial={{ rotateX: 0 }}
        animate={flipped ? { rotateX: -180 } : {}}
        transition={{
          duration: 0.4,
          ease: [0.65, 0, 0.35, 1],
          delay: 0.08,
        }}
      >
        <span
          className="absolute inset-x-0 top-0 h-[200%] flex items-center justify-center font-mono font-bold leading-none text-[#D7E2EA]"
          style={{ fontSize: dims.fontSize }}
        >
          {isEmpty ? "" : char}
        </span>
      </motion.div>

      {/* Divider line */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-[#D7E2EA]/10" />
    </div>
  );
}
