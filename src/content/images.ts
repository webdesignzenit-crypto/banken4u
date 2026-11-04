import sizes from "../../public/img/sizes.json";

export type ImgKey = keyof typeof sizes;

export const images: Record<string, { alt: string; pos?: string }> = {
  hero: { alt: "Modellhaus mit roter Giebelfront und Hausschlüssel auf einem Holztisch", pos: "100% 40%" },
  bauhub: { alt: "Einfamilienhaus im Rohbau: Klinkermauerwerk mit Gerüst und frisch aufgestelltem Dachstuhl vor blauem Himmel", pos: "55% 40%" },
  schluessel: { alt: "Hand hält Hausschlüssel mit Anhänger in Hausform im Flur eines neuen Zuhauses", pos: "50% 40%" },
  kauf: { alt: "Holzmodell eines Hauses neben einer Lupe, eine Immobilie vor dem Kauf genau prüfen", pos: "60% 45%" },
  neubau: { alt: "Frisch fertiggestelltes Einfamilienhaus aus rotem Klinker mit neuem Rasen und jungem Baum", pos: "50% 35%" },
  anschluss: { alt: "Bewohntes Einfamilienhaus mit Satteldach und Hecke im Morgenlicht", pos: "50% 50%" },
  umschuldung: { alt: "Ausgebreitete Euro-Banknoten zu 20, 100 und 200 Euro", pos: "60% 35%" },
  foerder: { alt: "Moderne Luft-Wasser-Wärmepumpe vor einem energieeffizienten Einfamilienhaus mit Garage", pos: "60% 35%" },
  modernisierung: { alt: "Solaranlage auf dem Ziegeldach eines Wohnhauses", pos: "50% 40%" },
  ratenkredit: { alt: "Roter Neuwagen mit Schleife auf der Motorhaube im Autohaus", pos: "60% 60%" },
  bausparen: { alt: "Spardose in Hausform mit einer Zwei-Euro-Münze im Dachschlitz auf einem Holztisch", pos: "55% 50%" },
  geldanlage: { alt: "Glas mit Münzen, aus dem eine junge Pflanze wächst", pos: "50% 50%" },
  versicherungen: { alt: "Krankenversicherungskarte mit Chip neben einem Stethoskop", pos: "70% 55%" },
  unterschrift: { alt: "Hand unterschreibt ein Dokument mit dem Kugelschreiber", pos: "50% 50%" },
  rechner: { alt: "Holzmodell eines Hauses neben Taschenrechner und Unterlagen", pos: "60% 55%" },
  ratgeber: { alt: "Notizbuch auf einem Holztisch neben einer Tastatur", pos: "50% 50%" },
  region: { alt: "Albrechtsburg Meißen hinter herbstlichen Weinbergen", pos: "50% 45%" },
  ueber: { alt: "Schreibtisch mit Lampe und Pflanzen im warmen Abendlicht", pos: "50% 50%" },
};

/** Versionsnummer der Bilder: bei jedem Bildtausch erhöhen, damit Browser keine alte Fassung aus dem Cache zeigen. */
export const IMG_V = "4";
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
