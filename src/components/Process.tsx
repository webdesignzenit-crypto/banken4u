"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Step } from "@/content/types";
import { images, imgSrc } from "@/content/images";
import { Split } from "./Split";

gsap.registerPlugin(ScrollTrigger);

/** Ablauf in vier Schritten. Ab 1024 px als waagerechte Fahrt, die beim Scrollen mitläuft. */
export default function Process({ steps, title, text, caption }: { steps: Step[]; title: string; text: string; caption: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const dist = () => Math.max(0, el.scrollWidth - el.clientWidth);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${dist() + window.innerHeight * 0.25}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      tl.to(el, { x: () => -dist(), duration: 1 }, 0).fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
      gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".step-num")).forEach((n) => {
        gsap.fromTo(
          n,
          { yPercent: 40, opacity: 0.25 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: n, containerAnimation: tl, start: "left 92%", end: "left 55%", scrub: true },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="process dark" ref={root} aria-labelledby="ablauf-titel">
      <div className="process-pin wrap">
        <div className="process-head">
          <Split id="ablauf-titel" className="t-h2" text={title} />
          <p className="muted" data-reveal>
            {text}
          </p>
        </div>
        <div className="process-track" ref={track}>
          {steps.map((s, i) => (
            <article className="step" key={s.title}>
              <span className="step-num" aria-hidden>
                0{i + 1}
              </span>
              <div>
                <h3>
                  <span className="sr-only">Schritt {i + 1}: </span>
                  {s.title}
                </h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
          <figure className="step-img" style={{ margin: 0 }}>
            <img src={imgSrc("unterschrift", true)} alt={images.unterschrift.alt} loading="lazy" />
            <span>{caption}</span>
          </figure>
        </div>
        <div className="process-bar" aria-hidden>
          <i ref={bar} />
        </div>
      </div>
    </section>
  );
}
