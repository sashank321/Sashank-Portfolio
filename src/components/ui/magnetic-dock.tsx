"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";

const DOCK_ITEMS = [
  { name: "LINKEDIN", url: "https://www.linkedin.com/in/sashank-junnuru-63a4b8395/", icon: <FaLinkedinIn size={20} /> },
  { name: "GITHUB", url: "https://github.com/sashank321", icon: <FaGithub size={20} /> },
  { name: "TWITTER", url: "https://twitter.com", icon: <FaXTwitter size={20} /> },
];

export default function MagneticDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex items-center justify-center gap-4">
      <div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-4 rounded-2xl bg-white/5 px-4 pb-3 backdrop-blur-md border border-white/10 shadow-xl"
      >
        {DOCK_ITEMS.map((item, i) => (
          <DockIcon key={i} mouseX={mouseX} item={item} />
        ))}
      </div>
    </div>
  );
}

function DockIcon({ mouseX, item }: { mouseX: any, item: any }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        className="flex aspect-square items-center justify-center rounded-full bg-[#111] border border-white/20 text-white font-bold text-sm"
      >
        {item.icon}
      </motion.div>
    </a>
  );
}
