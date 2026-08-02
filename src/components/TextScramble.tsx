import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function TextScramble({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, "\u00A0")); // Start blank
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  
  useEffect(() => {
    if (!inView) {
      setDisplayText(text.replace(/./g, "\u00A0"));
      return;
    }
    
    let frame = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const queue = text.split("").map((char) => ({
      from: chars[Math.floor(Math.random() * chars.length)],
      to: char,
      start: Math.floor(Math.random() * 15),
      end: Math.floor(Math.random() * 15) + Math.floor(Math.random() * 15) + 10,
      char: ""
    }));

    let animationId: number;

    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }
      setDisplayText(output);
      if (complete === queue.length) {
        setDisplayText(text);
      } else {
        animationId = requestAnimationFrame(update);
        frame++;
      }
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, [inView, text]);

  return <span ref={ref} className={className}>{displayText}</span>;
}
