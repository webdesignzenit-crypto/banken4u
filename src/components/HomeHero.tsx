"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrow, Stars } from "./Icons";
import { Siegel } from "./Siegel";
import { site } from "@/content/site";
import { images, img, imgSet } from "@/content/images";
import startseite from "../../content/startseite.json";

const ht = startseite.hero;

gsap.registerPlugin(ScrollTrigger);

const PORTRAIT = "(max-aspect-ratio: 4/5)";

export default function HomeHero() {
  const wrap = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(hero.current);
      // Scroll: Hero bleibt stehen, der Inhalt gleitet darüber.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(q(".hero-img"), { yPercent: 0 }, { yPercent: -5, duration: 1 }, 0)
        .fromTo(q(".hero-claim, .hero-actions, .scroll-cue"), { opacity: 1, y: 0 }, { opacity: 0, y: -40, duration: 0.6, immediateRender: false }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="hero-wrap" ref={wrap}>
      <section className="hero" ref={hero} aria-label="Banken4U, Baufinanzierung aus über 570 Banken">
        <picture>
          <source media={PORTRAIT} srcSet={imgSet("hero-m")} sizes="100vw" />
          <img className="hero-img" src={img("hero-1920.webp")} srcSet={imgSet("hero")} sizes="100vw" alt={images.hero.alt} fetchPriority="high" decoding="async" />
        </picture>
        <div className="hero-shade" aria-hidden />
        <Siegel />
        <div className="hero-bottom wrap">
          <div className="hero-claim">
            <p className="kicker" data-in style={{ ["--d" as string]: "80ms" }}>
              {ht.kicker}
            </p>
            <h1 className="t-display">
              <span className="line">
                <span style={{ ["--d" as string]: "180ms" }}>{ht.zeile1}</span>
              </span>
              <span className="line">
                <span style={{ ["--d" as string]: "300ms" }}>
                  {ht.zeile2} <em>{ht.zeile2Betont}</em>
                </span>
              </span>
            </h1>
            <p className="hero-lead t-lead" data-in style={{ ["--d" as string]: "460ms" }}>
              {ht.text}
            </p>
          </div>
          <div className="hero-actions" data-in style={{ ["--d" as string]: "600ms" }}>
            <div className="proof">
              <Stars />
              <strong>{site.rating}</strong>
              <span>aus {site.ratingCount} Bewertungen</span>
            </div>
            <div className="btns">
              <a className="btn btn-hell" href={site.phoneHref}>
                {ht.buttonRueckruf}
              </a>
              <Link className="btn btn-messing" href="/angebot/">
                {ht.buttonAngebot}
                <IconArrow />
              </Link>
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden />
      </section>
    </div>
  );
}
