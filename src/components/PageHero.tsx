"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hasPortrait, images, img as imgUrl, imgSet, imgSrc } from "@/content/images";
import { IconArrow } from "./Icons";
import { Siegel } from "./Siegel";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export type Crumb = { href: string; label: string };

/** Kopfbereich der Unterseiten: Vollbild-Foto (oder ohne Foto auf Logo-Blau), Brotkrumen, H1 unten links, Aktionen unten rechts. */
export default function PageHero({
  img,
  title,
  lead,
  crumbs,
  kicker,
  actions = true,
  children,
}: {
  img?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  kicker?: string;
  actions?: boolean;
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const pic = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root.current);
      gsap.fromTo(q(".phero-w > span"), { yPercent: 112 }, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.04, delay: 0.05 });
      gsap.fromTo(q("[data-in]"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.35 });
      if (pic.current) gsap.to(pic.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  const words = title.split(" ");

  return (
    <section className={img ? "phero" : "phero is-plain"} ref={root}>
      {!img ? null : img.startsWith("/") ? (
        // Hochgeladenes Bild aus dem Bearbeitungsbereich
        <img ref={pic} className="phero-img" src={img} alt="" fetchPriority="high" />
      ) : (
        <picture>
          {hasPortrait(img) ? <source media="(max-aspect-ratio: 4/5)" srcSet={imgUrl(`${img}-m.webp`)} /> : null}
          <img
            ref={pic}
            className={hasPortrait(img) ? "phero-img has-m" : "phero-img"}
            src={imgSrc(img)}
            srcSet={imgSet(img)}
            sizes="100vw"
            alt={images[img]?.alt ?? ""}
            style={{ objectPosition: images[img]?.pos }}
            fetchPriority="high"
          />
        </picture>
      )}
      <Siegel />
      <div className="phero-in wrap">
        <div>
          <nav className="crumbs" aria-label="Brotkrumen" data-in>
            <ol>
              <li>
                <Link href="/">Start</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href}>{i === crumbs.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}</li>
              ))}
            </ol>
          </nav>
          {kicker ? (
            <p className="kicker" style={{ color: "var(--messing)", marginTop: 26 }} data-in>
              {kicker}
            </p>
          ) : null}
          <h1 className="t-h1 phero-title" style={{ marginTop: kicker ? 16 : 26 }} aria-label={title}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="phero-w" aria-hidden>
                  <span>{w}</span>
                </span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>
          {lead ? (
            <p className="t-lead" data-in>
              {lead}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="phero-actions" data-in>
            {children ?? (
              <>
                <Link className="btn btn-messing" href="/angebot/">
                  Angebot anfordern
                  <IconArrow />
                </Link>
                <a className="btn btn-hell" href={site.phoneHref}>
                  Anrufen: {site.phone}
                </a>
              </>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
