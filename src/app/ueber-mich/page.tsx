import Link from "next/link";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { Split } from "@/components/Split";
import { IconArrow, IconCheck } from "@/components/Icons";
import { img } from "@/content/images";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
  alternates: { canonical: "/ueber-mich/" },
};

export default function Page() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.owner,
    jobTitle: "Finanzmaklerin",
    hasCredential: ["Bankfachwirtin (IHK)", "Versicherungsfachfrau (IHK)"],
    worksFor: { "@type": "FinancialService", name: site.name, url: site.url },
    address: { "@type": "PostalAddress", streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressCountry: "DE" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <PageIntro
        variant="person"
        title={about.title}
        lead={about.lead}
        crumbs={[{ href: "/ueber-mich/", label: "Über mich" }]}
        kicker={about.kicker}
        aside={
          <figure className="pintro-portrait">
            <img
              src={img("ilonka-karras.webp")}
              srcSet={`${img("ilonka-karras-sm.webp")} 525w, ${img("ilonka-karras.webp")} 1050w`}
              sizes="(max-width: 980px) 100vw, 40vw"
              alt="Ilonka Karras, Bankfachwirtin (IHK) und Versicherungsfachfrau (IHK)"
              width={1050}
              height={1120}
              fetchPriority="high"
            />
            <figcaption>
              <b>{site.owner}</b>
              Bankfachwirtin (IHK) und Versicherungsfachfrau (IHK)
            </figcaption>
          </figure>
        }
      >
        <Link className="btn btn-tanne" href="/angebot/">
          Angebot anfordern
          <IconArrow />
        </Link>
        <a className="btn btn-linie" href={site.phoneHref}>
          Anrufen: {site.phone}
        </a>
      </PageIntro>
      <main id="inhalt">
        <section className="sec">
          <div className="wrap about-grid">
            <div className="prose about-story" data-reveal>
              {about.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <blockquote className="about-quote" data-reveal>
              <p>{about.quote}</p>
              <footer>{site.owner}</footer>
            </blockquote>
          </div>
        </section>

        <section className="sec dark" aria-labelledby="weg-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="weg-titel" className="t-h2" text={about.wegTitel} />
              <p data-reveal>{about.wegText}</p>
            </div>
            <ol className="milestones" style={{ ["--cols" as string]: Math.min(about.milestones.length, 5) }}>
              {about.milestones.map((m, i) => (
                <li key={m.title} data-reveal style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}>
                  <span aria-hidden>0{i + 1}</span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sec" aria-labelledby="arbeit-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="arbeit-titel" className="t-h2" text={about.arbeitTitel} />
              <p data-reveal>{about.arbeitText}</p>
            </div>
            <div className="hl" style={{ ["--n" as string]: about.principles.length, marginTop: 0 }}>
              {about.principles.map((h, i) => (
                <div key={h.title} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <IconCheck />
                  <b>{h.title}</b>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec alt cta-light" aria-labelledby="ueber-cta">
          <div className="wrap cta-band">
            <div>
              <Split id="ueber-cta" className="t-h2" text={about.ctaTitel} />
              <p data-reveal>{about.ctaText}</p>
            </div>
            <div data-reveal>
              <Link className="btn btn-tanne" href="/angebot/">
                Angebot anfordern
                <IconArrow />
              </Link>
              <a className="btn btn-linie" href={site.phoneHref}>
                Anrufen: {site.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
