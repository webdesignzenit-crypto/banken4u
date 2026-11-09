import sizes from "../../public/img/sizes.json";

export type ImgKey = keyof typeof sizes;

export const images: Record<string, { alt: string; pos?: string }> = {
  hero: { alt: "Modellhaus mit roter Giebelfront und Hausschlüssel auf einem Holztisch", pos: "100% 40%" },
  bauhub: { alt: "Hausmodell mit blauem Dach und rotem Giebel auf einem Bauplan, davor eine Lupe, dahinter ein Sparschwein", pos: "60% 40%" },
  schluessel: { alt: "Hand hält Hausschlüssel mit Anhänger in Hausform im Flur eines neuen Zuhauses", pos: "50% 40%" },
  kauf: { alt: "Hausmodell im Querschnitt mit eingestecktem 50-Euro-Schein und Haustürschlüssel auf Auswertungen", pos: "40% 40%" },
  neubau: { alt: "Einfamilienhaus im Rohbau: Ziegelmauerwerk mit frisch aufgestelltem Dachstuhl und Schalung vor blauem Himmel", pos: "50% 45%" },
  anschluss: { alt: "Bewohntes Einfamilienhaus mit Satteldach und Hecke im Morgenlicht", pos: "50% 50%" },
  umschuldung: { alt: "Ausgebreitete Euro-Banknoten zu 20, 100 und 200 Euro", pos: "60% 35%" },
  foerder: { alt: "Euro-Scheine, Münzen und Hausschlüssel mit Haus-Anhänger neben einem Taschenrechner", pos: "45% 50%" },
  modernisierung: { alt: "Handwerker setzt ein Solarmodul auf das Dach eines Wohnhauses", pos: "30% 30%" },
  ratenkredit: { alt: "Fahrzeuge auf dem Hof eines Autohauses", pos: "30% 60%" },
  bausparen: { alt: "Taschenrechner, kleines Holzhaus und orangefarbenes Sparschwein auf blauem Grund", pos: "50% 40%" },
  geldanlage: { alt: "Hand mit 50-Euro-Scheinen vor Taschenrechner und Auswertungen", pos: "50% 55%" },
  versicherungen: { alt: "Silhouette eines Menschen, der im Sonnenuntergang auf einem Felsen balanciert", pos: "45% 55%" },
  unterschrift: { alt: "Hand unterschreibt ein Dokument mit dem Kugelschreiber", pos: "50% 50%" },
  rechner: { alt: "Holzmodell eines Hauses neben Taschenrechner und Unterlagen", pos: "60% 55%" },
  ratgeber: { alt: "Notizbuch auf einem Holztisch neben einer Tastatur", pos: "50% 50%" },
  region: { alt: "Albrechtsburg Meißen hinter herbstlichen Weinbergen", pos: "50% 45%" },
  ueber: { alt: "Schreibtisch mit Lampe und Pflanzen im warmen Abendlicht", pos: "50% 50%" },
  schufa: { alt: "Lesebrille auf ausgedruckten Unterlagen, ein Schreiben genau prüfen", pos: "45% 50%" },
  unterlagen: { alt: "Geöffneter Ordner mit abgehefteten Unterlagen auf einem Holztisch", pos: "40% 55%" },
  siedlung: { alt: "Dorf mit Einfamilienhäusern und roten Dächern zwischen grünen Wiesen, aus der Luft", pos: "50% 50%" },
};

/** Versionsnummer der Bilder: bei jedem Bildtausch erhöhen, damit Browser keine alte Fassung aus dem Cache zeigen. */
export const IMG_V = "8";
export const img = (file: string) => `/img/${file}?v=${IMG_V}`;

/** Bildangabe aus dem Bearbeitungsbereich normalisieren: "/img/rechner.webp" → Bildschlüssel "rechner" (mit Handy- und Kleinfassungen). */
export function imgKey(v: string) {
  const m = v.match(/^\/img\/([a-z0-9-]+)\.webp$/);
  return m && m[1] in images ? m[1] : v;
}

/** Bildschlüssel (z. B. "rechner") oder hochgeladenes Bild ("/img/uploads/…") in eine Bildadresse umwandeln. */
export function imgAny(keyOrPath: string, small = false) {
  const k = imgKey(keyOrPath);
  return k.startsWith("/") ? k : imgSrc(k, small);
}

export function imgSrc(key: string, small = false) {
  return img(`${key}${small ? "-sm" : ""}.webp`);
}

export function imgSet(key: string) {
  if (key === "hero") return `${img("hero-sm.webp")} 1200w, ${img("hero-1920.webp")} 1920w, ${img("hero.webp")} 3200w`;
  if (key === "hero-m") return `${img("hero-m-sm.webp")} 900w, ${img("hero-m.webp")} 1400w`;
  return `${img(`${key}-sm.webp`)} 1200w, ${img(`${key}.webp`)} ${imgSize(key)[0]}w`;
}

/** Eigener Hochformat-Zuschnitt fürs Handy vorhanden? */
export function hasPortrait(key: string) {
  return `${key}-m` in (sizes as Record<string, number[]>);
}

export function imgSize(key: string): [number, number] {
  const s = (sizes as Record<string, number[]>)[key] ?? [2400, 1600];
  return [s[0], s[1]];
}
