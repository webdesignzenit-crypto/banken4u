"use client";

import { useRef } from "react";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";
import { IconArrow, Stars } from "./Icons";

/** Eine Zeile mit den fünf besten Bewertungen, seitlich durchscrollbar. */
export default function ReviewSlider() {
  const row = useRef<HTMLDivElement>(null);
  const move = (dir: number) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".review");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 16), behavior: "smooth" });
  };
  return (
    <div className="reviews-wrap">
      <div className="reviews" ref={row} tabIndex={0} aria-label="Bewertungen von KennstDuEinen">
        {reviews.map((r) => (
          <figure className="review" key={r.name}>
            <Stars />
            <blockquote>
              <p className="review-title">„{r.title}“</p>
              <p>{r.text}</p>
            </blockquote>
            <figcaption>
              <b>{r.name}</b> · {r.date} · KennstDuEinen
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="reviews-nav">
        <button type="button" className="icon-nav" onClick={() => move(-1)} aria-label="Vorherige Bewertung">
          <IconArrow style={{ transform: "rotate(180deg)" }} />
        </button>
        <button type="button" className="icon-nav" onClick={() => move(1)} aria-label="Nächste Bewertung">
          <IconArrow />
        </button>
        <a className="link-u" href={site.reviewLinks.kennstDuEinen} target="_blank" rel="noopener">
          Alle {site.ratingCount} Bewertungen lesen
          <IconArrow />
        </a>
      </div>
    </div>
  );
}
