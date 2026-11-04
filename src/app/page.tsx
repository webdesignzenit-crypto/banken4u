import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Process from "@/components/Process";
import CountUp from "@/components/CountUp";
import { BauCalc } from "@/components/Calculators";
import { Split } from "@/components/Split";
import { IconArrow, IconCheck, IconShield, Stars } from "@/components/Icons";
import { navBaufinanzierung, navLeistungen, site } from "@/content/site";
import ReviewSlider from "@/components/ReviewSlider";
import { images, img, imgSet, imgSrc } from "@/content/images";
import startseite from "../../content/startseite.json";

const home = startseite;
const leistungsText: Record<string, string> = {
  "/ratenkredit/": home.leistungen.ratenkredit,
  "/bausparen/": home.leistungen.bausparen,
  "/geldanlage/": home.leistungen.geldanlage,
  "/versicherungen/": home.leistungen.versicherungen,
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <main id="inhalt" className="main-over">
        {/* Vorstellung */}
        <section className="sec" aria-labelledby="vorstellung-titel">
          <div className="wrap">
            <div className="intro">
              <figure className="portrait has-photo" data-reveal>
                <img
                  src={img("ilonka-karras.webp")}
                  srcSet={`${img("ilonka-karras-sm.webp")} 525w, ${img("ilonka-karras.webp")} 1050w`}
                  sizes="(max-width: 980px) 100vw, 34vw"
                  alt="Ilonka Karras, Inhaberin von Banken4U"
                  width={1050}
                  height={1120}
                  loading="lazy"
                />
                <figcaption>
                  <b>{site.owner}</b>
                  {home.vorstellung.bildunterschrift}
                </figcaption>
              </figure>
              <div className="intro-text">
                <div>
                  <p className="kicker" data-reveal>
                    {home.vorstellung.kicker}
                  </p>
                  <Split
                    id="vorstellung-titel"
                    className="t-h2"
                    text={home.vorstellung.titel}
                  />
                </div>
                <div className="intro-cols">
                  <p data-reveal>{home.vorstellung.text}</p>
                  <ul className="checks" data-reveal style={{ ["--d" as string]: "120ms" }}>
                    {home.vorstellung.punkte.map((t) => (
                      <li key={t}>
                        <IconCheck /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sign" data-reveal>
                  <p className="sign-name">
                    {site.owner}
                    <small>{home.vorstellung.unterschriftZusatz}</small>
                  </p>
                  <Link className="link-u" href="/ueber-mich/">
                    Mehr über mich
                    <IconArrow />
                  </Link>
                </div>
              </div>
            </div>

            <dl className="facts">
              <div className="fact" data-reveal>
                <dt>{home.zahlen.banken}</dt>
                <dd>
                  <CountUp to={Number(site.banks)} from={120} />
                  <i>+</i>
                </dd>
              </div>
              <div className="fact" data-reveal style={{ ["--d" as string]: "80ms" }}>
                <dt>{home.zahlen.versicherer}</dt>
                <dd>
                  <CountUp to={Number(site.insurers)} from={10} />
                </dd>
              </div>
              <div className="fact" data-reveal style={{ ["--d" as string]: "160ms" }}>
                <dt>{home.zahlen.jahre}</dt>
                <dd>
                  <CountUp to={Number(site.years)} from={5} />
                  <i>+</i>
                </dd>
              </div>
              <div className="fact" data-reveal style={{ ["--d" as string]: "240ms" }}>
                <dt>{home.zahlen.bewertung}</dt>
                <dd>
                  {site.rating}
                  <small>von 5</small>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Leistungen */}
        <section className="sec alt" aria-labelledby="leistungen-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="leistungen-titel" className="t-h2" text={home.leistungen.titel} />
              <p data-reveal>{home.leistungen.text}</p>
            </div>
            <div className="svc">
              <article className="svc-main" data-reveal="clip">
                <img src={imgSrc("schluessel")} srcSet={imgSet("schluessel")} sizes="(max-width: 980px) 100vw, 60vw" alt={images.schluessel.alt} loading="lazy" />
                <div className="svc-body">
                  <span className="svc-tag">Schwerpunkt</span>
                  <h3>
                    <Link href="/baufinanzierung/">Baufinanzierung</Link>
                  </h3>
                  <p>{home.leistungen.schwerpunktText}</p>
                  <nav className="sub" aria-label="Themen der Baufinanzierung">
                    {navBaufinanzierung.map((n) => (
                      <Link key={n.href} href={n.href}>
                        {n.label}
                        <IconArrow />
                      </Link>
                    ))}
                  </nav>
                  <p className="note-line">
                    <IconShield />
                    {home.leistungen.hinweis}
                  </p>
                </div>
              </article>
              <div className="svc-list">
                {navLeistungen.map((n) => (
                  <Link className="row" key={n.href} href={n.href} data-reveal>
                    <h3>{n.label}</h3>
                    <p>{leistungsText[n.href]}</p>
                    <span className="arr" aria-hidden>
                      <IconArrow />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ablauf */}
        <Process
          steps={home.ablauf.schritte}
          title={home.ablauf.titel}
          text={home.ablauf.text}
          caption={home.ablauf.bildtext}
        />

        {/* Bewertungen */}
        <section className="sec" aria-labelledby="bewertungen-titel">
          <div className="wrap">
            <div className="rating-row">
              <div className="rating-big" data-reveal>
                <strong>{site.rating}</strong>
                <div>
                  <Stars />
                  <p>{home.bewertungen.zusatz}</p>
                </div>
              </div>
              <div className="rating-txt">
                <Split id="bewertungen-titel" className="t-h2" text={home.bewertungen.titel} />
                <p className="muted" data-reveal style={{ margin: 0, color: "var(--text-2)", maxWidth: "52ch" }}>
                  {home.bewertungen.text}
                </p>
                <div className="rating-links" data-reveal>
                  <a className="link-u" href={site.reviewLinks.kennstDuEinen} target="_blank" rel="noopener">
                    Bewertungen auf KennstDuEinen
                    <IconArrow />
                  </a>
                  <a className="link-u" href={site.reviewLinks.immoscout} target="_blank" rel="noopener">
                    Bewertungen auf ImmobilienScout24
                    <IconArrow />
                  </a>
                </div>
              </div>
            </div>
            <ReviewSlider />
          </div>
        </section>

        {/* Vergütung, transparent erklärt */}
        <section className="sec dark" aria-labelledby="verguetung-titel">
          <div className="wrap free">
            <div className="free-big">
              <p className="kicker" style={{ color: "var(--papier)" }} data-reveal>
                {home.verguetung.kicker}
              </p>
              <h2 id="verguetung-titel" className="t-h2" style={{ marginTop: 18 }} data-reveal>
                {home.verguetung.titel} <em>{home.verguetung.titelBetont}</em>
              </h2>
            </div>
            <div className="free-side" data-reveal>
              <p>{home.verguetung.text}</p>
              <Link className="btn btn-messing" href="/angebot/">
                Angebot anfordern
                <IconArrow />
              </Link>
            </div>
            <div className="free-points">
              {home.verguetung.punkte.map((pt, i) => (
                <div key={pt.title} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <h3>{pt.title}</h3>
                  <p>{pt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rechner */}
        <section className="sec alt" aria-labelledby="rechner-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="rechner-titel" className="t-h2" text={home.rechner.titel} />
              <div data-reveal>
                <p style={{ margin: "0 0 16px" }}>{home.rechner.text}</p>
                <Link className="link-u" href="/rechner/">
                  Alle Rechner
                  <IconArrow />
                </Link>
              </div>
            </div>
            <div data-reveal>
              <BauCalc cta />
            </div>
          </div>
        </section>

        {/* Region und Kontakt */}
        <section className="contact" aria-labelledby="kontakt-titel">
          <div className="contact-in wrap">
            <div>
              <p className="kicker" style={{ color: "var(--papier)" }} data-reveal>
                {home.kontakt.kicker}
              </p>
              <Split
                id="kontakt-titel"
                className="t-h2"
                text={home.kontakt.titel}
              />
              <p data-reveal style={{ maxWidth: "52ch", margin: "22px 0 0", color: "rgba(244,246,249,.92)" }}>
                {home.kontakt.text}
              </p>
            </div>
            <div data-reveal>
              <dl>
                <div>
                  <dt>Adresse</dt>
                  <dd>
                    {site.street}, {site.zip} {site.city}
                  </dd>
                </div>
                {site.hours.map((h) => (
                  <div key={h.days}>
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
                <div>
                  <dt>Telefon</dt>
                  <dd>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </dd>
                </div>
              </dl>
              <p className="t-small" style={{ margin: "4px 0 6px", opacity: 0.75 }}>
                {site.hoursNote}.
              </p>
              <Link className="btn btn-messing" href="/kontakt/">
                Kontakt und Anfahrt
                <IconArrow />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
