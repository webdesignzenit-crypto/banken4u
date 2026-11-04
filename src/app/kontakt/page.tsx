import type { Metadata } from "next";
import Band from "@/components/Band";
import ContactForm from "@/components/ContactForm";
import MapConsent from "@/components/MapConsent";
import { Split } from "@/components/Split";
import { IconClock, IconMail, IconPhone, IconPin } from "@/components/Icons";
import { site } from "@/content/site";
import seiten from "../../../content/seiten.json";

const t = seiten.kontakt;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/kontakt/" },
};

export default function Page() {
  return (
    <>
      <Band
        title={t.title}
        lead={t.lead}
        crumbs={[{ href: "/kontakt/", label: "Kontakt" }]}
      />
      <main id="inhalt">
        <section className="sec">
          <div className="wrap contact-page">
            <div className="contact-info">
              <Split className="t-h2" text="So erreichen Sie mich." />
              <dl>
                <div data-reveal>
                  <dt>
                    <IconPhone /> Telefon
                  </dt>
                  <dd>
                    <a className="big-link" href={site.phoneHref}>
                      {site.phone}
                    </a>
                    <span>
                      Mobil: <a href={site.mobileHref}>{site.mobile}</a>
                    </span>
                  </dd>
                </div>
                <div data-reveal>
                  <dt>
                    <IconMail /> E-Mail
                  </dt>
                  <dd>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                    <a href={`mailto:${site.emailPersonal}`}>{site.emailPersonal}</a>
                    <span>
                      Private Krankenversicherung: <a href={`mailto:${site.emailPkv}`}>{site.emailPkv}</a>
                    </span>
                  </dd>
                </div>
                <div data-reveal>
                  <dt>
                    <IconPin /> Adresse
                  </dt>
                  <dd>
                    <span>Banken4U · {site.owner}</span>
                    <span>{site.street}</span>
                    <span>
                      {site.zip} {site.city}
                    </span>
                  </dd>
                </div>
                <div data-reveal>
                  <dt>
                    <IconClock /> Erreichbarkeit
                  </dt>
                  <dd>
                    {site.hours.map((h) => (
                      <span key={h.days}>
                        {h.days}: {h.time}
                      </span>
                    ))}
                    <span>{site.hoursNote}</span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="contact-form" data-reveal>
              <h2 className="t-h3" style={{ marginBottom: 20 }}>
                Schreiben Sie mir
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
        <section className="sec alt" aria-labelledby="anfahrt-titel">
          <div className="wrap">
            <div className="sec-head">
              <Split id="anfahrt-titel" className="t-h2" text="Mitten im Elbland zwischen Meißen und Dresden." />
              <p data-reveal>
                Weinböhla liegt im Landkreis Meißen, wenige Minuten von Radebeul und Dresden entfernt. Termine vor Ort vereinbaren wir vorab telefonisch.
              </p>
            </div>
            <MapConsent />
          </div>
        </section>
      </main>
    </>
  );
}
