import { useEffect, useRef, useState } from "react";
import { ROW_ONE, ROW_TWO } from "../data/marqueeImages";

/**
 * Two rows of images that scroll horizontally based on page scroll position.
 * Row 1 moves RIGHT, Row 2 moves LEFT. Each row's image set is tripled so the
 * track is always wide enough to cover the viewport during the translate.
 */
export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(200);

  useEffect(() => {
    const update = () => {
      const sectionTop = sectionRef.current?.offsetTop ?? 0;
      const next = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10"
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow images={ROW_ONE} x={offset - 200} />
        <MarqueeRow images={ROW_TWO} x={-(offset - 200)} />
      </div>
    </section>
  );
}

function MarqueeRow({ images, x }: { images: string[]; x: number }) {
  // Triple the set for seamless scrolling.
  const tripled = [...images, ...images, ...images];

  return (
    <div
      className="flex w-max gap-3"
      style={{
        transform: `translateX(${x}px)`,
        willChange: "transform",
      }}
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
    </div>
  );
}
