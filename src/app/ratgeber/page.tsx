import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Split } from "@/components/Split";
import { IconArrow } from "@/components/Icons";
import { articles } from "@/content/ratgeber";
import { articleImage } from "@/content/articleImages";
import { imgAny } from "@/content/images";
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
      <PageHero
        img="ratgeber"
        title={t.title}
        lead={t.lead}
        crumbs={[{ href: "/ratgeber/", label: "Ratgeber" }]}
        kicker={t.kicker}
      />
      <main id="inhalt">
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <Split className="t-h2" text="Gut vorbereitet ins erste Gespräch." />
              <p data-reveal>
                Jeder Artikel endet mit den wichtigsten Punkten zum Mitnehmen. Haben Sie eine Frage, die hier fehlt? Rufen Sie mich an, ich nehme sie gern auf.
              </p>
            </div>
            <div className="cards3">
              {articles.map((a, i) => (
                <Link className="acard" href={`/ratgeber/${a.slug}/`} key={a.slug} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <div className="acard-img">
                    <img src={imgAny(articleImage[a.slug], true)} alt="" loading="lazy" />
                  </div>
                  <div className="acard-body">
                    <span className="t-small" style={{ color: "var(--grau)" }}>
                      {a.readingMinutes} Minuten Lesezeit · {a.updated}
                    </span>
                    <h2>{a.title}</h2>
                    <p>{a.lead}</p>
                    <span className="link-u" style={{ justifySelf: "start", marginTop: 6 }}>
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
