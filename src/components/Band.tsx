import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb } from "./PageHero";

/** Schlichter dunkler Kopfbereich für Formular-, Bewertungs- und Rechtsseiten. */
export default function Band({ title, lead, crumbs, children }: { title: string; lead?: string; crumbs: Crumb[]; children?: ReactNode }) {
  return (
    <section className="band">
      <div className="wrap band-in">
        <div>
          <nav className="crumbs" aria-label="Brotkrumen">
            <ol>
              <li>
                <Link href="/">Start</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href}>{i === crumbs.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}</li>
              ))}
            </ol>
          </nav>
          <h1 className="t-h1" style={{ marginTop: 22 }}>
            {title}
          </h1>
          {lead ? <p className="t-lead">{lead}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
