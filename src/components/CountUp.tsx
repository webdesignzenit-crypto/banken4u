"use client";

import { useEffect, useRef, useState } from "react";

/** Zählt beim ersten Sichtbarwerden hoch. Ohne JS steht sofort der Endwert da. */
export default function CountUp({ to, from = 0, duration = 1600 }: { to: number; from?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return; // schon sichtbar: Endwert stehen lassen
    setVal(from);
    let raf = 0;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const e = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(from + (to - from) * e));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, from, duration]);
  return (
    <span ref={ref} className="tnum">
      {val}
    </span>
  );
}
