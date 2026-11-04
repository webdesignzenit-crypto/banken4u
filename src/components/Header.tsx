"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Logo } from "./Logo";
import { IconArrow, IconChevron, IconClose, IconMenu, IconPhone, IconPlus } from "./Icons";
import { navBaufinanzierung, navLeistungen, navMain, site } from "@/content/site";
import { imgSrc } from "@/content/images";

type MegaKey = "bau" | "leist" | null;

function NavLinks({ mega, open, current }: { mega: MegaKey; open: (k: MegaKey) => void; current: string }) {
  const timer = useRef<number | undefined>(undefined);
  const enter = (k: MegaKey) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => open(k), 90);
  };
  const leave = () => {
    window.clearTimeout(timer.current);
  };
  const isBau = current.startsWith("/baufinanzierung");
  const isLeist = navLeistungen.some((n) => current.startsWith(n.href));
  return (
    <nav className="nav" aria-label="Hauptnavigation">
      <button
        type="button"
        aria-expanded={mega === "bau"}
        aria-controls="mega-bau"
        aria-current={isBau ? "page" : undefined}
        onClick={() => open(mega === "bau" ? null : "bau")}
        onMouseEnter={() => enter("bau")}
        onMouseLeave={leave}
      >
        Baufinanzierung <IconChevron className="chev" />
      </button>
      <button
        type="button"
        aria-expanded={mega === "leist"}
        aria-controls="mega-leist"
        aria-current={isLeist ? "page" : undefined}
        onClick={() => open(mega === "leist" ? null : "leist")}
        onMouseEnter={() => enter("leist")}
        onMouseLeave={leave}
      >
        Weitere Leistungen <IconChevron className="chev" />
      </button>
      {navMain.map((n) => (
        <Link key={n.href} href={n.href} aria-current={current.startsWith(n.href) ? "page" : undefined} onMouseEnter={() => enter(null)}>
          {n.label}
        </Link>
      ))}
    </nav>
  );
}

export default function Header() {
  const raw = usePathname() || "/";
  // In der Vorschau liegt die Seite in einem Unterordner: auf die eigentliche Route zurückführen
  const pathname = raw.replace(/^.*?\/site(?=\/)/, "").replace(/index\.html$/, "") || "/";
  const isHome = pathname === "/";
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [barOn, setBarOn] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const [sheet, setSheet] = useState(false);
  const [group, setGroup] = useState<MegaKey>(null);
  const [megaTop, setMegaTop] = useState(70);
  const topRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const closeT = useRef<number | undefined>(undefined);

  // Menü öffnen: direkt unter der gerade sichtbaren Kopfzeile andocken, damit die Navigation an ihrem Platz bleibt.
  const open = (k: MegaKey) => {
    window.clearTimeout(closeT.current);
    if (k) {
      const ref = barOn ? barRef.current : topRef.current;
      if (ref) setMegaTop(Math.round(ref.getBoundingClientRect().bottom));
    }
    setMega(k);
  };
  const cancelClose = () => window.clearTimeout(closeT.current);
  const scheduleClose = () => {
    window.clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => setMega(null), 260);
  };

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(y > 40);
      setBarOn(y > (isHome ? vh * 0.95 : vh * 0.45));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isHome]);

  useEffect(() => {
    setMega(null);
    setSheet(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(null);
        setSheet(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (sheet) lenis.stop();
    else lenis.start();
  }, [sheet, lenis]);

  useEffect(() => {
    document.documentElement.classList.toggle("sheet-open", sheet);
  }, [sheet]);

  const showBar = barOn;
  const solid = mega !== null && !barOn;
  const megaItems = mega === "leist" ? navLeistungen : navBaufinanzierung;

  return (
    <>
      <header className={`hdr${isHome ? " hdr-light" : ""}${scrolled && !solid ? " is-scrolled" : ""}${solid ? " hdr-solid" : ""}`}>
        <div className="hdr-top wrap" ref={topRef} onMouseEnter={cancelClose} onMouseLeave={() => mega && scheduleClose()}>
          <Logo />
          <div className="hdr-right">
            <NavLinks mega={mega} open={open} current={pathname} />
            <a className="tel" href={site.phoneHref} aria-label={`Anrufen: ${site.phone}`}>
              <IconPhone />
              <span>{site.phone}</span>
            </a>
            <button className="icon-btn" type="button" onClick={() => setSheet(true)} aria-label="Menü öffnen" aria-expanded={sheet}>
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      <div className={`bar${showBar ? " is-on" : ""}`} aria-hidden={!showBar} ref={barRef}>
        <div className="bar-in wrap" onMouseEnter={cancelClose} onMouseLeave={() => mega && scheduleClose()}>
          <Logo sub={false} />
          <div className="hdr-right">
            <NavLinks mega={mega} open={open} current={pathname} />
            <a className="tel" href={site.phoneHref} tabIndex={showBar ? 0 : -1}>
              <IconPhone />
              <span>{site.phone}</span>
            </a>
            <Link className="btn btn-tanne" href="/angebot/" tabIndex={showBar ? 0 : -1}>
              Angebot anfordern
              <IconArrow />
            </Link>
            <button className="icon-btn" type="button" onClick={() => setSheet(true)} aria-label="Menü öffnen" tabIndex={showBar ? 0 : -1}>
              <IconMenu />
            </button>
          </div>
        </div>
      </div>

      <div className={`mega-backdrop${mega ? " is-open" : ""}`} onClick={() => setMega(null)} aria-hidden />
      <div
        id={mega === "leist" ? "mega-leist" : "mega-bau"}
        className={`mega${mega ? " is-open" : ""}`}
        style={{ top: megaTop }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        role="region"
        aria-label={mega === "leist" ? "Weitere Leistungen" : "Baufinanzierung"}
      >
        <div className="mega-in wrap">
          <div>
            <h3>{mega === "leist" ? "Weitere Leistungen" : "Baufinanzierung"}</h3>
            <p>
              {mega === "leist"
                ? "Kredite, Sparen und Absicherung im Vergleich, persönlich beraten."
                : `Für jedes Vorhaben der passende Vergleich aus über ${site.banks} Banken und Bausparkassen.`}
            </p>
            <Link className="link-u" href={mega === "leist" ? "/rechner/" : "/baufinanzierung/"} tabIndex={mega ? 0 : -1}>
              {mega === "leist" ? "Zu den Rechnern" : "Alles zur Baufinanzierung"}
              <IconArrow />
            </Link>
          </div>
          <div className="mega-links">
            {megaItems.map((n) => (
              <Link key={n.href} href={n.href} tabIndex={mega ? 0 : -1}>
                <span>
                  <b>{n.label}</b>
                  <small>{n.text}</small>
                </span>
                <IconArrow />
              </Link>
            ))}
          </div>
          <div className="mega-img">
            <img src={imgSrc(mega === "leist" ? "geldanlage" : "schluessel", true)} alt="" loading="lazy" />
            <span>Persönlich für Sie da: {site.phone}</span>
          </div>
        </div>
      </div>

      <div className={`sheet wrap${sheet ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menü" aria-hidden={!sheet} data-lenis-prevent>
        <div className="sheet-top">
          <Logo sub={false} />
          <button className="icon-btn" style={{ display: "inline-flex" }} type="button" onClick={() => setSheet(false)} aria-label="Menü schließen" tabIndex={sheet ? 0 : -1}>
            <IconClose />
          </button>
        </div>
        <nav aria-label="Menü">
          {(
            [
              ["bau", "Baufinanzierung", [{ href: "/baufinanzierung/", label: "Überblick Baufinanzierung" }, ...navBaufinanzierung]],
              ["leist", "Weitere Leistungen", navLeistungen],
            ] as const
          ).map(([key, label, items]) => (
            <div className="sheet-group" key={key}>
              <button type="button" aria-expanded={group === key} onClick={() => setGroup(group === key ? null : key)} tabIndex={sheet ? 0 : -1}>
                {label}
                <IconPlus />
              </button>
              <div className={`sheet-sub${group === key ? " is-open" : ""}`}>
                <div>
                  {items.map((n) => (
                    <Link key={n.href} href={n.href} tabIndex={sheet && group === key ? 0 : -1} onClick={() => setSheet(false)}>
                      {n.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {[...navMain, { href: "/bewertungen/", label: "Bewertungen" }].map((n) => (
            <Link key={n.href} className="sheet-link" href={n.href} tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="sheet-foot">
          <Link className="btn btn-messing" href="/angebot/" tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
            Angebot anfordern
          </Link>
          <a className="btn btn-hell" href={site.phoneHref} tabIndex={sheet ? 0 : -1}>
            <IconPhone /> {site.phone}
          </a>
        </div>
      </div>

      <div className={`dock${sheet ? " is-hidden" : ""}`} aria-label="Schnellkontakt">
        <a className="dock-call" href={site.phoneHref}>
          <IconPhone />
          Anrufen
        </a>
        <Link className="dock-offer" href="/angebot/">
          Angebot anfordern
        </Link>
      </div>
    </>
  );
}
