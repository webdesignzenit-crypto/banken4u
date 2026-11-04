import Link from "next/link";
import Band from "@/components/Band";
import { IconArrow } from "@/components/Icons";

export const metadata = { title: "Seite nicht gefunden | Banken4U", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Band
        title="Diese Seite gibt es nicht mehr."
        lead="Vielleicht hat sich die Adresse geändert. Hier geht es weiter:"
        crumbs={[{ href: "/404/", label: "Seite nicht gefunden" }]}
      />
      <main id="inhalt">
        <section className="sec">
          <div className="wrap" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn btn-tanne" href="/">
              Zur Startseite
              <IconArrow />
            </Link>
            <Link className="btn btn-linie" href="/baufinanzierung/">
              Baufinanzierung
            </Link>
            <Link className="btn btn-linie" href="/kontakt/">
              Kontakt
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
