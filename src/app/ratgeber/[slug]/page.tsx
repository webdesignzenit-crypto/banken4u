import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import { IconArrow, IconCheck } from "@/components/Icons";
import { articles } from "@/content/ratgeber";
import { articleImage } from "@/content/articleImages";
import { img, imgAny } from "@/content/images";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `/ratgeber/${a.slug}/` },
    openGraph: { type: "article", title: a.metaTitle, description: a.metaDescription, images: [imgAny(articleImage[a.slug])] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const others = articles.filter((x) => x.slug !== a.slug);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.metaDescription,
    author: { "@type": "Person", name: site.owner },
    publisher: { "@type": "Organization", name: site.name },
    inLanguage: "de-DE",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero
        title={a.title}
        lead={a.lead}
        crumbs={[
          { href: "/ratgeber/", label: "Ratgeber" },
          { href: `/ratgeber/${a.slug}/`, label: a.title },
        ]}
        kicker={`${a.readingMinutes} Minuten Lesezeit · Stand ${a.updated}`}
        actions={false}
      />
      <main id="inhalt">
        <section className="sec">
          <div className="wrap article">
            <aside className="article-aside">
              <img className="article-author" src={img("ilonka-karras-kopf.webp")} alt="" width={120} height={120} loading="lazy" />
              <span>Von {site.owner}</span>
              <span>Bankfachwirtin (IHK)</span>
              <a className="link-u" href={site.phoneHref} style={{ color: "var(--tinte)", justifySelf: "start" }}>
                Frage stellen
                <IconArrow />
              </a>
            </aside>
            <article className="article-body prose">
              {a.sections.map((s) => (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {s.bullets?.length ? (
                    <ul className="checks">
                      {s.bullets.map((b) => (
                        <li key={b}>
                          <IconCheck />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
              <div className="takeaway">
                <h2>Das Wichtigste in Kürze</h2>
                <ul>
                  {a.takeaway.map((t) => (
                    <li key={t}>
                      <IconCheck />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              {a.faqs?.length ? (
                <>
                  <h2>Häufige Fragen</h2>
                  <Faq items={a.faqs} />
                </>
              ) : null}
            </article>
          </div>
        </section>
        <section className="sec alt">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="t-h3">Weitere Artikel</h2>
            </div>
            <div className="cards3">
              {others.map((o) => (
                <Link className="acard" href={`/ratgeber/${o.slug}/`} key={o.slug}>
                  <div className="acard-img">
                    <img src={imgAny(articleImage[o.slug], true)} alt="" loading="lazy" />
                  </div>
                  <div className="acard-body">
                    <h3>{o.title}</h3>
                    <p>{o.lead}</p>
                  </div>
                </Link>
              ))}
              <Link className="acard" href="/angebot/" style={{ background: "var(--tanne)", color: "var(--papier)", justifyContent: "flex-end" }}>
                <div className="acard-body">
                  <h3>Persönlich statt allgemein</h3>
                  <p style={{ color: "rgba(244,246,249,.92)" }}>Lassen Sie Ihre Finanzierung unverbindlich vergleichen.</p>
                  <span className="link-u" style={{ justifySelf: "start", marginTop: 6 }}>
                    Angebot anfordern
                    <IconArrow />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
