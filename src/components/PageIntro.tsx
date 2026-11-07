"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { Siegel } from "./Siegel";
import type { Crumb } from "./PageHero";

/**
 * Heller Seitenkopf ohne Foto (Ratgeber, Über mich): Brotkrumen, Überzeile und H1 links,
 * rechts ein eigener Inhalt der Seite (Porträt, Autorin, kurzer Hinweis). Die Seite beginnt
 * damit direkt mit Inhalt statt mit einem leeren Farbblock.
 */
export default function PageIntro({
  title,
  lead,
  crumbs,
  kicker,
  aside,
  children,
  variant,
}: {
  title: string;
  lead?: string;
  crumbs: Crumb[];
  kicker?: string;
  aside?: ReactNode;
  children?: ReactNode;
  variant?: "person" | "article" | "list";
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root.current);
      gsap.fromTo(q(".pintro-w > span"), { yPercent: 112 }, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.04, delay: 0.05 });
      gsap.fromTo(q("[data-in]"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.3 });
    });
    return () => mm.revert();
  }, []);

  const words = title.split(" ");

  return (
    <section className={`pintro${variant ? ` pintro-${variant}` : ""}`} ref={root}>
      <Siegel />
      <div className="wrap pintro-in">
        <div className="pintro-text">
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
            <p className="kicker" data-in>
              {kicker}
            </p>
          ) : null}
          <h1 className="t-h1 pintro-title" aria-label={title}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="pintro-w" aria-hidden>
                  <span>{w}</span>
                </span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>
          {lead ? (
            <p className="t-lead pintro-lead" data-in>
              {lead}
            </p>
          ) : null}
          {children ? (
            <div className="pintro-actions" data-in>
              {children}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="pintro-aside" data-in>
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
