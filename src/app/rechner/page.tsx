import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Split } from "@/components/Split";
import { BauCalc, KreditCalc } from "@/components/Calculators";
import { IconArrow } from "@/components/Icons";
import seiten from "../../../content/seiten.json";

const t = seiten.rechner;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/rechner/" },
};

export default function Page() {
  return (
    <>
      <PageHero
        img="rechner"
        title={t.title}
        lead={t.lead}
        crumbs={[{ href: "/rechner/", label: "Rechner" }]}
        kicker={t.kicker}
      />
      <main id="inhalt">
        <section className="sec" id="baufinanzierung" aria-labelledby="bau-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="bau-titel" className="t-h2" text="Baufinanzierungsrechner" />
              <p data-reveal>
                Darlehensbetrag, Sollzins und anfängliche Tilgung bestimmen Ihre Monatsrate. Wichtig ist auch die Restschuld nach der Zinsbindung, denn für diesen
                Betrag brauchen Sie später eine Anschlussfinanzierung.
              </p>
            </div>
            <div data-reveal>
              <BauCalc />
            </div>
          </div>
        </section>
        <section className="sec alt" id="ratenkredit" aria-labelledby="kredit-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="kredit-titel" className="t-h2" text="Ratenkreditrechner" />
              <p data-reveal>
                Für Auto, Möbel oder eine größere Anschaffung: Sehen Sie, welche Rate bei Ihrem Wunschbetrag und Ihrer Laufzeit entsteht.
              </p>
            </div>
            <div data-reveal>
              <KreditCalc />
            </div>
          </div>
        </section>
        <section className="sec alt cta-light" style={{ paddingTop: 0 }} aria-labelledby="rechner-cta">
          <div className="wrap cta-band" style={{ borderTop: "1px solid var(--linie)", paddingTop: "var(--sec)" }}>
            <div>
              <Split id="rechner-cta" className="t-h2" text="Aus der Beispielrechnung wird ein echtes Angebot." />
              <p data-reveal>
                Schicken Sie mir Ihre Eckdaten. Ich frage bei den Banken an und zeige Ihnen, welcher Zins mit Ihren Unterlagen tatsächlich möglich ist.
              </p>
            </div>
            <div data-reveal>
              <Link className="btn btn-tanne" href="/angebot/">
                Angebot anfordern
                <IconArrow />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
