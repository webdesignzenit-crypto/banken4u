import Link from "next/link";
import type { Metadata } from "next";
import Band from "@/components/Band";
import { Split } from "@/components/Split";
import { IconArrow, Stars } from "@/components/Icons";
import ReviewSlider from "@/components/ReviewSlider";
import { site } from "@/content/site";
import seiten from "../../../content/seiten.json";

const t = seiten.bewertungen;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/bewertungen/" },
};

export default function Page() {
  return (
    <>
      <Band
        title={t.title}
        lead={t.lead}
        crumbs={[{ href: "/bewertungen/", label: "Bewertungen" }]}
      >
        <div className="band-rating">
          <strong>{site.rating}</strong>
          <div>
            <Stars />
            <p>
              aus {site.ratingCount} geprüften Bewertungen bei KennstDuEinen, zusätzlich Bewertungen bei ImmobilienScout24
            </p>
          </div>
        </div>
      </Band>
      <main id="inhalt">
        <section className="sec" aria-labelledby="themen-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="themen-titel" className="t-h2" text="In ihren eigenen Worten." />
              <div data-reveal>
                <p style={{ margin: "0 0 18px" }}>{t.stimmenText}</p>
                <div className="rating-links" style={{ marginTop: 0 }}>
                  <a className="link-u" href={site.reviewLinks.kennstDuEinen} target="_blank" rel="noopener">
                    KennstDuEinen
                    <IconArrow />
                  </a>
                  <a className="link-u" href={site.reviewLinks.immoscout} target="_blank" rel="noopener">
                    ImmobilienScout24
                    <IconArrow />
                  </a>
                </div>
              </div>
            </div>
            <ReviewSlider />
          </div>
        </section>
        <section className="sec alt" aria-labelledby="cta-titel">
          <div className="wrap cta-band cta-light">
            <div>
              <p className="kicker" style={{ color: "var(--messing-tief)" }} data-reveal>
                Ihr nächster Schritt
              </p>
              <Split id="cta-titel" className="t-h2" text="Überzeugen Sie sich selbst." />
              <p data-reveal style={{ color: "var(--text-2)" }}>
                Fordern Sie Ihr unverbindliches Angebot an. Ich vergleiche für Sie über 570 Banken und melde mich persönlich bei Ihnen.
              </p>
            </div>
            <div data-reveal style={{ justifyItems: "start" }}>
              <Link className="btn btn-tanne" href="/angebot/">
                Selbst überzeugen: Angebot anfordern
                <IconArrow />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
