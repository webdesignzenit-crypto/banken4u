import Link from "next/link";
import type { Metadata } from "next";
import Band from "@/components/Band";
import { IconArrow } from "@/components/Icons";
import { site } from "@/content/site";
import seiten from "../../../content/seiten.json";

const t = seiten.danke;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <Band
        title={t.title}
        lead={t.lead}
        crumbs={[{ href: "/danke/", label: "Vielen Dank" }]}
      />
      <main id="inhalt">
        <section className="sec">
          <div className="wrap cards3">
            <div className="acard" style={{ padding: 0 }}>
              <div className="acard-body">
                <h2>Unterlagen vorbereiten</h2>
                <p>Welche Unterlagen die Bank sehen möchte, lesen Sie in meinem Ratgeber.</p>
                <Link className="link-u" href="/ratgeber/unterlagen-baufinanzierung/" style={{ justifySelf: "start" }}>
                  Zur Checkliste
                  <IconArrow />
                </Link>
              </div>
            </div>
            <div className="acard">
              <div className="acard-body">
                <h2>Schon einmal rechnen</h2>
                <p>Mit dem Baufinanzierungsrechner sehen Sie, wie sich Zins und Tilgung auf Ihre Rate auswirken.</p>
                <Link className="link-u" href="/rechner/" style={{ justifySelf: "start" }}>
                  Zum Rechner
                  <IconArrow />
                </Link>
              </div>
            </div>
            <div className="acard" style={{ background: "var(--tanne)", color: "var(--papier)" }}>
              <div className="acard-body">
                <h2>Es eilt?</h2>
                <p style={{ color: "rgba(244,246,249,.92)" }}>Dann rufen Sie mich gern direkt an.</p>
                <a className="link-u" href={site.phoneHref} style={{ justifySelf: "start" }}>
                  {site.phone}
                  <IconArrow />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
