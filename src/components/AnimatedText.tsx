import { useRef } from "react";
import type { CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Character-by-character scroll-reveal text animation.
 *
 * Each character fades from opacity 0.2 -> 1 based on its position in the
 * string relative to the overall scroll progress of the paragraph element.
 * Each character is rendered as an invisible placeholder (to reserve layout
 * space) with an absolutely positioned animated span on top.
 */
export default function AnimatedText({
  text,
  className = "",
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const characters = Array.from(text);

  return (
    <motion.p ref={ref} className={`relative ${className}`} style={style}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;
        return (
          <CharSpan
            key={`${char}-${i}`}
            char={char}
            index={i}
            total={characters.length}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </motion.p>
  );
}

function CharSpan({
  char,
  range,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  // Newlines render as spaces inside the inline flow.
  const display = char === "\n" ? "\u00A0" : char;

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder reserves the layout space */}
      <span className="opacity-0">{display === " " ? "\u00A0" : display}</span>
      {/* Absolutely positioned animated span */}
      <motion.span
        className="absolute inset-0"
        style={{ opacity }}
        aria-hidden="true"
      >
        {display}
      </motion.span>
    </span>
  );
}
