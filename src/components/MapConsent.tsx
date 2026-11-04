"use client";

import { useState } from "react";
import { IconPin } from "./Icons";
import { site } from "@/content/site";

/** Karte lädt erst nach Klick. Vorher werden keine Daten an OpenStreetMap übertragen. */
export default function MapConsent() {
  const [on, setOn] = useState(false);
  const [pv, setPv] = useState(false);
  const q = encodeURIComponent(`${site.street}, ${site.zip} ${site.city}`);
  return (
    <div className="map">
      {on ? (
        <iframe
          title={`Karte: ${site.city}`}
          src="https://www.openstreetmap.org/export/embed.html?bbox=13.535%2C51.152%2C13.600%2C51.182&layer=mapnik"
          loading="lazy"
        />
      ) : (
        <div className="map-ph">
          <IconPin style={{ width: 30, height: 30, color: "var(--messing-tief)" }} />
          <p>
            Zum Anzeigen der Karte wird eine Verbindung zu OpenStreetMap hergestellt. Dabei wird Ihre IP-Adresse übertragen.
          </p>
          <button type="button" className="btn btn-tanne" onClick={() => (process.env.NEXT_PUBLIC_PREVIEW ? setPv(true) : setOn(true))}>
            Karte laden
          </button>
          {pv ? <p>In der Vorschau lässt sich keine Karte laden. Auf der fertigen Website erscheint sie hier nach dem Klick.</p> : null}
          <a className="link-u" href={`https://www.openstreetmap.org/search?query=${q}`} target="_blank" rel="noopener">
            Adresse auf OpenStreetMap öffnen
          </a>
        </div>
      )}
    </div>
  );
}
