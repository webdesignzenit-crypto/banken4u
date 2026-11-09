"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Inhalte fremder Anbieter (Zinscharts, Bewertungs-Widgets) erst nach Klick laden.
 * Vorher geht keine Verbindung zum Anbieter raus. Die Zustimmung gilt für alle drei
 * Inhalte und wird im Browser gemerkt (siehe Datenschutzerklärung).
 */
type Kind = "zinscharts" | "kennstdueinen" | "immoscout";

const INFO: Record<Kind, { title: string; provider: string }> = {
  zinscharts: { title: "Aktuelle Zinscharts", provider: "der Starpool Finanz GmbH" },
  kennstdueinen: { title: "Bewertungen bei KennstDuEinen", provider: "KennstDuEinen.de (inklusive Schriften von Google Fonts)" },
  immoscout: { title: "Bewertungen bei ImmobilienScout24", provider: "der Immobilien Scout GmbH" },
};

const KEY = "b4u-externe-inhalte";
const EVT = "b4u-extern";

export default function ExternalEmbed({ kind }: { kind: Kind }) {
  const [on, setOn] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setOn(true);
    } catch {}
    const onAllow = () => setOn(true);
    window.addEventListener(EVT, onAllow);
    return () => window.removeEventListener(EVT, onAllow);
  }, []);

  // Widgets bringen ihr eigenes Skript mit: erst nach der Zustimmung einsetzen
  useEffect(() => {
    const el = box.current;
    if (!on || !el || kind === "zinscharts") return;
    el.innerHTML = "";
    if (kind === "kennstdueinen") {
      const a = document.createElement("a");
      a.className = "kennstdueinen-widget";
      a.href = "https://www.kennstdueinen.de/baufinanzierung-stahnsdorf-banken4u-ilonka-karras-d100037.html";
      a.textContent = "Bewertungen für Banken4U - Ilonka Karras - KennstDuEinen.de";
      el.appendChild(a);
      const s = document.createElement("script");
      s.src = "https://www.kennstdueinen.de/widget/widgetv2/100037/kde-widget-responsive/8/kde/googlefont/4/Open%2BSans%3A400%2C600%2C400italic%2C600italic";
      el.appendChild(s);
    } else {
      const s = document.createElement("script");
      s.id = "is24BaufinanzierungWidget";
      s.setAttribute("is24-provider", "77");
      s.src = "https://www.immobilienscout24.de/baufinanzierung/static/js/rating-widget.js";
      el.appendChild(s);
    }
  }, [on, kind]);

  const allow = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    window.dispatchEvent(new Event(EVT));
    setOn(true);
  };

  const info = INFO[kind];

  if (on) {
    return kind === "zinscharts" ? (
      <div className="ext zins-frame">
        <iframe scrolling="no" src="https://portal.starpool.de/interestRateCharts/0175eef1-cddd-4e55-89a1-5ed067ba42c7" title="Aktuelle Zinscharts der Starpool Finanz GmbH" loading="lazy" />
      </div>
    ) : (
      <div className="ext ext-widget" ref={box} />
    );
  }

  return (
    <div className={`ext ext-gate${kind === "zinscharts" ? " ext-gate-big" : ""}`}>
      <b>{info.title}</b>
      <p>
        Dieser Inhalt kommt von {info.provider}. Erst wenn Sie ihn laden, baut Ihr Browser eine Verbindung zum Anbieter auf und überträgt dabei Daten wie Ihre IP-Adresse.{" "}
        <Link href="/datenschutz/">Mehr in der Datenschutzerklärung</Link>
      </p>
      <button type="button" className="btn btn-tanne" onClick={allow}>
        Inhalt laden
      </button>
      <small>Ihre Wahl gilt für alle eingebundenen Inhalte und wird in diesem Browser gespeichert.</small>
    </div>
  );
}
