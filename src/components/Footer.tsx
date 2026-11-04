import Link from "next/link";
import { navBaufinanzierung, navLeistungen, site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-cols">
          <div>
            <h3>Kontakt</h3>
            <ul>
              <li>Banken4U · {site.owner}</li>
              <li>{site.street}</li>
              <li>
                {site.zip} {site.city}
              </li>
              <li>
                Telefon: <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                Mobil: <a href={site.mobileHref}>{site.mobile}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {site.hours.map((h) => (
                <li key={h.days} className="t-small" style={{ color: "rgba(244,246,249,.92)" }}>
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Baufinanzierung</h3>
            <ul>
              <li>
                <Link href="/baufinanzierung/">Überblick</Link>
              </li>
              {navBaufinanzierung.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Weitere Leistungen</h3>
            <ul>
              {navLeistungen.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/rechner/">Rechner</Link>
              </li>
              <li>
                <Link href="/ratgeber/">Ratgeber</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Banken4U</h3>
            <ul>
              <li>
                <Link href="/ueber-mich/">Über mich</Link>
              </li>
              <li>
                <Link href="/bewertungen/">Bewertungen</Link>
              </li>
              <li>
                <Link href="/kontakt/">Kontakt</Link>
              </li>
              <li>
                <Link href="/impressum/">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz/">Datenschutz</Link>
              </li>
              <li>
                <Link href="/erstinformation/">Erstinformation</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Banken4U · {site.owner} · Finanzmaklerin in Weinböhla</span>
          <span>
            Website von{" "}
            <a href="https://zenit-webdesign.de" target="_blank" rel="noopener">
              Zenit Webdesign
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
