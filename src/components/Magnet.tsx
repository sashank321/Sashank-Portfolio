import { useRef, useState, type ReactNode } from "react";

type MagnetProps = {
  children: ReactNode;
  /** Distance (px) from the element edge within which the magnet activates. */
  padding?: number;
  /** Higher = weaker pull. The translate is divided by this factor. */
  strength?: number;
  /** CSS transition string applied while the cursor is active. */
  activeTransition?: string;
  /** CSS transition string applied while returning to rest. */
  inactiveTransition?: string;
  className?: string;
};

/**
 * Mouse-following magnetic hover effect.
 *
 * Tracks the cursor position relative to the element center and applies a
 * translate3d transform divided by `strength`. The magnet "arms" when the
 * cursor comes within `padding` of the element's edge, so the pull engages
 * slightly before the user actually touches the element.
 */
export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0)");

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = elRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const relX = e.clientX - centerX;
    const relY = e.clientY - centerY;

    // Activate when cursor is within `padding` of the element edge.
    const withinX = Math.abs(relX) < rect.width / 2 + padding;
    const withinY = Math.abs(relY) < rect.height / 2 + padding;

    if (withinX && withinY) {
      setActive(true);
      const tx = relX / strength;
      const ty = relY / strength;
      setTransform(`translate3d(${tx}px, ${ty}px, 0)`);
    }
  };

  const handleMouseLeave = () => {
    setActive(false);
    setTransform("translate3d(0px, 0px, 0)");
  };

  return (
    <div
      ref={elRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: active ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
