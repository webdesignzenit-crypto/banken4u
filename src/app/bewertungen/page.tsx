import Link from "next/link";
import type { Metadata } from "next";
import Band from "@/components/Band";
import { Split } from "@/components/Split";
import { IconArrow, Stars } from "@/components/Icons";
import ReviewSlider from "@/components/ReviewSlider";
import ExternalEmbed from "@/components/ExternalEmbed";
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
              aus {site.ratingCount} Bewertungen von {site.ratingSources} Portalen, darunter KennstDuEinen und ImmobilienScout24
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
        <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="portale-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="portale-titel" className="t-h2" text="Direkt von den Portalen." />
              <div data-reveal>
                <p style={{ margin: 0 }}>Hier sehen Sie die aktuellen Bewertungen so, wie KennstDuEinen und ImmobilienScout24 sie anzeigen.</p>
                {site.auszeichnung ? (
                  <p className="award">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><circle cx="12" cy="9" r="6" /><path d="M8.5 13.8 7 22l5-3 5 3-1.5-8.2" /><path d="m12 6.2.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" /></svg>
                    <span>{site.auszeichnung}</span>
                  </p>
                ) : null}
              </div>
            </div>
            <div className="portal-widgets">
              <ExternalEmbed kind="kennstdueinen" />
              <ExternalEmbed kind="immoscout" />
            </div>
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
                Fordern Sie Ihr unverbindliches Angebot an. Ich vergleiche für Sie über {site.banks} Banken und melde mich persönlich bei Ihnen.
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
