import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ROW_ONE, ROW_TWO } from "../data/marqueeImages";

/**
 * Two rows of images that scroll horizontally based on page scroll position.
 * Row 1 moves RIGHT, Row 2 moves LEFT. Each row's image set is tripled so the
 * track is always wide enough to cover the viewport during the translate.
 *
 * Scroll position lives in a MotionValue (written inside a rAF-throttled,
 * passive scroll listener) so React never re-renders on scroll — the transform
 * is applied directly, GPU-composited, every frame.
 */
export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Progress of the section through the viewport, ~0.5 → 1.5.
  const progress = useMotionValue(0.5);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Cache the section's document top once on mount / resize instead of
    // reading offsetTop every scroll frame (that forces a sync layout).
    let sectionTop = section.offsetTop;
    let frameId = 0;
    let needsUpdate = false;

    const measure = () => {
      sectionTop = section.offsetTop;
    };

    const update = () => {
      needsUpdate = false;
      const raw =
        (window.scrollY - sectionTop + window.innerHeight) * 0.0015 + 0.5;
      // Clamp to a sane range so rows never fly off.
      progress.set(Math.min(Math.max(raw, 0), 1.5));
    };

    const onScroll = () => {
      if (!needsUpdate) {
        needsUpdate = true;
        frameId = requestAnimationFrame(update);
      }
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frameId);
    };
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow images={ROW_ONE} progress={progress} dir={1} />
        <MarqueeRow images={ROW_TWO} progress={progress} dir={-1} />
      </div>
    </section>
  );
}

type MarqueeRowProps = {
  images: string[];
  progress: MotionValue<number>;
  /** 1 = moves right on scroll, -1 = moves left. */
  dir: 1 | -1;
};

const MarqueeRow = ({ images, progress, dir }: MarqueeRowProps) => {
  // Map scroll progress (0.5 → 1.5) to a translate range. Each row drifts
  // ~40% of its own width so motion reads feel fast without overshooting.
  const x = useTransform(progress, (v) => `${(v - 1) * dir * 40 - 10}%`);

  // Triple the set for seamless looping.
  const tripled = [...images, ...images, ...images];

  return (
    <motion.div
      className="flex w-max gap-3"
      style={{ x, willChange: "transform" }}
    >
      {tripled.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          loading="lazy"
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      ))}
    </motion.div>
  );
};
