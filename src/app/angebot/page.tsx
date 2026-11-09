import type { Metadata } from "next";
import Band from "@/components/Band";
import OfferForm from "@/components/OfferForm";
import { IconCheck, IconPhone, Stars } from "@/components/Icons";
import { site } from "@/content/site";
import seiten from "../../../content/seiten.json";

const t = seiten.angebot;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/angebot/" },
};

export default function Page() {
  return (
    <>
      <Band
        title={t.title}
        lead={t.lead}
        crumbs={[{ href: "/angebot/", label: "Angebot anfordern" }]}
      />
      <main id="inhalt">
        <section className="sec">
          <div className="wrap form-wrap">
            <aside className="form-side">
              <h2 className="t-h3">So geht es weiter</h2>
              <ul className="checks">
                <li>
                  <IconCheck /> Ich prüfe Ihre Angaben persönlich
                </li>
                <li>
                  <IconCheck /> Wir besprechen Ihr Anliegen am Telefon
                </li>
                <li>
                  <IconCheck /> Sie erhalten passende Angebote im Vergleich
                </li>
                <li>
                  <IconCheck /> Unverbindlich und ohne Verpflichtung
                </li>
              </ul>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Stars />
                <span className="t-small">
                  {site.rating} aus {site.ratingCount} geprüften Bewertungen
                </span>
              </div>
              <div style={{ borderTop: "1px solid var(--linie)", paddingTop: 20 }}>
                <p className="t-small" style={{ margin: "0 0 8px", color: "var(--grau)" }}>
                  Lieber direkt sprechen?
                </p>
                <a className="link-u" href={site.phoneHref} style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 400 }}>
                  <IconPhone /> {site.phone}
                </a>
              </div>
            </aside>
            <div className="form-main">
              <OfferForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
