import type { Metadata } from "next";
import Band from "./Band";
import { legalPages } from "@/content/legal";

export function legalMeta(slug: string): Metadata {
  const p = legalPages.find((x) => x.slug === slug)!;
  return { title: p.metaTitle, description: p.metaDescription, alternates: { canonical: `/${slug}/` } };
}

const anchor = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function LegalView({ slug }: { slug: string }) {
  const p = legalPages.find((x) => x.slug === slug)!;
  return (
    <>
      <Band title={p.title} crumbs={[{ href: `/${slug}/`, label: p.title }]} />
      <main id="inhalt">
        <section className="sec">
          <div className="wrap legal">
            <aside aria-label="Inhalt">
              {p.blocks.map((b) => (
                <a key={b.heading} href={`#${anchor(b.heading)}`}>
                  {b.heading}
                </a>
              ))}
            </aside>
            <div className="legal-body">
              {p.note ? <p className="note-box">{p.note}</p> : null}
              {p.blocks.map((b) => (
                <section className="legal-block prose" key={b.heading} id={anchor(b.heading)} style={{ scrollMarginTop: 100 }}>
                  <h2>{b.heading}</h2>
                  {b.paragraphs.map((t, i) => (
                    <p key={i} style={{ whiteSpace: "pre-line" }}>
                      {t}
                    </p>
                  ))}
                  {b.bullets?.length ? (
                    <ul>
                      {b.bullets.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
