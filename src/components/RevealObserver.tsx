"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Blendet Elemente mit data-reveal bzw. .split[data-split] ein, sobald sie sichtbar werden. */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], .split[data-split]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => {
      if (!el.classList.contains("is-in")) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
