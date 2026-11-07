import Link from "next/link";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { IconArrow } from "@/components/Icons";
import { articles } from "@/content/ratgeber";
import { site } from "@/content/site";
import seiten from "../../../content/seiten.json";

const t = seiten.ratgeber;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/ratgeber/" },
};

export default function Page() {
  return (
    <>
      <PageIntro
        variant="list"
        title={t.title}
        lead={t.lead}
        crumbs={[{ href: "/ratgeber/", label: "Ratgeber" }]}
        kicker={t.kicker}
        aside={
          <div className="pintro-note">
            <p>Jeder Artikel endet mit den wichtigsten Punkten zum Mitnehmen. Haben Sie eine Frage, die hier fehlt? Rufen Sie mich an, ich nehme sie gern auf.</p>
            <a className="link-u" href={site.phoneHref} style={{ justifySelf: "start", color: "var(--tinte)" }}>
              Anrufen: {site.phone}
              <IconArrow />
            </a>
          </div>
        }
      />
      <main id="inhalt">
        <section className="sec sec-snug">
          <div className="wrap">
            <div className="cards3">
              {articles.map((a, i) => (
                <Link className="acard acard-text" href={`/ratgeber/${a.slug}/`} key={a.slug} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <div className="acard-body">
                    <div className="acard-top">
                      <span className="acard-nr">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        {a.readingMinutes} Minuten Lesezeit · {a.updated}
                      </span>
                    </div>
                    <h2>{a.title}</h2>
                    <p>{a.lead}</p>
                    <span className="link-u">
                      Artikel lesen
                      <IconArrow />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
