import Link from "next/link";
import type { Metadata } from "next";
import PageHero, { type Crumb } from "./PageHero";
import Faq from "./Faq";
import { Split } from "./Split";
import { IconArrow, IconCheck } from "./Icons";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { imgAny, imgKey, imgSrc } from "@/content/images";
import type { ServicePage } from "@/content/types";

/** Bild je Leistungsseite. Keine Dopplung innerhalb einer Seite. */
export const serviceImage: Record<string, string> = {
  baufinanzierung: "bauhub",
  "baufinanzierung/immobilienkauf": "kauf",
  "baufinanzierung/neubau": "neubau",
  "baufinanzierung/anschlussfinanzierung": "anschluss",
  "baufinanzierung/umschuldung": "umschuldung",
  "baufinanzierung/foerderkredite": "foerder",
  "baufinanzierung/modernisierung": "modernisierung",
  ratenkredit: "ratenkredit",
  bausparen: "bausparen",
  geldanlage: "geldanlage",
  versicherungen: "versicherungen",
};

export function getService(slug: string): ServicePage {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Leistung fehlt: ${slug}`);
  return s;
}

export function serviceMeta(slug: string): Metadata {
  const s = getService(slug);
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/${s.slug}/` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, images: [imgSrc(serviceImage[slug])] },
  };
}

export default function ServiceView({ slug }: { slug: string }) {
  const s = getService(slug);
  const crumbs: Crumb[] =
    s.group === "baufinanzierung" && s.slug !== "baufinanzierung"
      ? [
          { href: "/baufinanzierung/", label: "Baufinanzierung" },
          { href: `/${s.slug}/`, label: s.navTitle },
        ]
      : [{ href: `/${s.slug}/`, label: s.navTitle }];
  const related = s.related.map((r) => services.find((x) => x.slug === r)).filter(Boolean) as ServicePage[];
  const isHub = s.slug === "baufinanzierung";
  const children = isHub ? services.filter((x) => x.group === "baufinanzierung" && x.slug !== "baufinanzierung") : [];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ href: "/", label: "Start" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, crumbLd]) }} />
      <PageHero
        img={s.heroImage ? imgKey(s.heroImage) : serviceImage[slug]}
        title={s.title}
        lead={s.lead}
        crumbs={crumbs}
        kicker={s.kicker}
      />
      <main id="inhalt">
        <section className="sec">
          <div className="wrap">
            <div className="lead-block">
              <div className="lb-big">
                <Split className="t-h2" text={s.introTitle} />
              </div>
              <div className="lb-text prose" data-reveal>
                {s.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="hl" style={{ ["--n" as string]: s.highlights.length }}>
              {s.highlights.map((h, i) => (
                <div key={h.title} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <IconCheck />
                  <b>{h.title}</b>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {isHub ? (
          <section className="sec alt" aria-labelledby="themen-titel">
            <div className="wrap">
              <div className="sec-head">
                <Split id="themen-titel" className="t-h2" text="Für jedes Vorhaben der passende Weg." />
                <p data-reveal>Wählen Sie Ihr Thema. Auf jeder Seite finden Sie die wichtigsten Fragen, Antworten und den direkten Weg zu Ihrem Angebot.</p>
              </div>
              <div className="related related-6">
                {children.map((c, i) => (
                  <Link className="rel" href={`/${c.slug}/`} key={c.slug} data-reveal style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
                    <img src={imgAny(c.heroImage || serviceImage[c.slug], true)} alt="" loading="lazy" />
                    <b>
                      {c.navTitle}
                      <IconArrow />
                    </b>
                    <small>{c.navText}</small>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="sec" style={{ paddingTop: isHub ? undefined : 0 }}>
          <div className="wrap">
            <div className="chapters">
              {s.sections.map((sec) => (
                <div className="chapter" key={sec.heading}>
                  <h2>{sec.heading}</h2>
                  <div className="prose" data-reveal>
                    {sec.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {sec.bullets?.length ? (
                      <ul className="checks" style={{ marginTop: 18 }}>
                        {sec.bullets.map((b) => (
                          <li key={b}>
                            <IconCheck />
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {s.links?.length ? (
          <section className="sec alt" aria-labelledby="abschluss-titel">
            <div className="wrap">
              <div className="sec-head">
                <Split id="abschluss-titel" className="t-h2" text="Direkt online abschließen." />
                <p data-reveal>
                  {s.linksText ?? "Hier können Sie direkt online abschließen. Wenn Sie vorher lieber mit mir sprechen möchten, rufen Sie mich einfach an."}
                </p>
              </div>
              <div className="golinks">
                {s.links.map((l, i) => (
                  <a key={l.href + i} href={l.href} target="_blank" rel="noopener" data-reveal style={{ ["--d" as string]: `${(i % 2) * 80}ms` }}>
                    <span>
                      <b>{l.label}</b>
                      {l.text ? <small>{l.text}</small> : null}
                    </span>
                    <IconArrow />
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {s.steps?.length ? (
          <section className="sec dark" aria-labelledby="ablauf-titel">
            <div className="wrap">
              <div className="sec-head">
                <Split id="ablauf-titel" className="t-h2" text="So läuft die Zusammenarbeit ab." />
                <p data-reveal>Vom ersten Telefonat bis zur Auszahlung haben Sie eine feste Ansprechpartnerin.</p>
              </div>
              <div className="steps-mini" style={{ ["--n" as string]: s.steps.length }}>
                {s.steps.map((st, i) => (
                  <div key={st.title} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                    <span>0{i + 1}</span>
                    <h3>{st.title}</h3>
                    <p>{st.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className={`sec${s.steps?.length ? "" : " alt"}`} aria-labelledby="faq-titel">
          <div className="wrap faq-wrap">
            <div>
              <Split id="faq-titel" className="t-h2" text="Häufige Fragen" />
              <p data-reveal style={{ color: "var(--text-2)", maxWidth: "36ch", margin: "18px 0 24px" }}>
                {s.faqNote}
              </p>
              <a className="link-u" href={site.phoneHref} data-reveal>
                {site.phone}
                <IconArrow />
              </a>
            </div>
            <div data-reveal>
              <Faq items={s.faqs} />
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="mehr-titel">
            <div className="wrap">
              <div className="sec-head" style={{ paddingTop: "var(--sec)", borderTop: "1px solid var(--linie)" }}>
                <Split id="mehr-titel" className="t-h3" as="h2" text="Das könnte Sie auch interessieren" />
              </div>
              <div className="related">
                {related.map((r, i) => (
                  <Link className="rel" href={`/${r.slug}/`} key={r.slug} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                    <img src={imgAny(r.heroImage || serviceImage[r.slug], true)} alt="" loading="lazy" />
                    <b>
                      {r.navTitle}
                      <IconArrow />
                    </b>
                    <small>{r.navText}</small>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="sec alt cta-light" aria-labelledby="cta-titel">
          <div className="wrap cta-band">
            <div>
              <Split id="cta-titel" className="t-h2" text={s.ctaTitle} />
              <p data-reveal>{s.ctaText}</p>
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
