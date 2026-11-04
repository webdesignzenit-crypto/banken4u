"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenisOptions: LenisOptions = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
};

function GsapLenisBridge() {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root autoRaf={false} options={lenisOptions}>
      <GsapLenisBridge />
      {children}
    </ReactLenis>
  );
}
