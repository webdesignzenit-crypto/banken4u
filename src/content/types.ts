export type Faq = { q: string; a: string };

export type Section = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Step = { title: string; text: string };

export type Highlight = { title: string; text: string };

export type ServicePage = {
  /** Pfad ohne führenden Slash, z. B. "baufinanzierung/neubau" oder "ratenkredit" */
  slug: string;
  group: "baufinanzierung" | "weitere";
  /** Name in Navigation und Mega-Menü */
  navTitle: string;
  /** Eine kurze Zeile fürs Mega-Menü, max. ca. 60 Zeichen */
  navText: string;
  /** max. 60 Zeichen, endet mit " | Banken4U" */
  metaTitle: string;
  /** 140–155 Zeichen */
  metaDescription: string;
  /** Kleine Zeile über der H1 (Kicker), eigene Formulierung je Seite, max. ca. 55 Zeichen */
  kicker: string;
  /** H1, sagt klar, worum es geht */
  title: string;
  /** 1–2 Sätze unter der H1 */
  lead: string;
  /** 2–3 Absätze Einstieg */
  intro: string[];
  /** Überschrift neben dem Einstieg (statt eines festen Standardsatzes), eigene Formulierung je Seite, max. ca. 45 Zeichen */
  introTitle: string;
  /** genau 3 oder 4 Vorteile */
  highlights: Highlight[];
  /** 2–4 Abschnitte */
  sections: Section[];
  /** optional: Ablauf speziell für dieses Thema, 3–4 Schritte */
  steps?: Step[];
  /** 4–6 Fragen */
  faqs: Faq[];
  /** Ein Satz neben den häufigen Fragen, passend zum Thema, max. ca. 120 Zeichen */
  faqNote: string;
  ctaTitle: string;
  ctaText: string;
  /** 2–3 Slugs passender anderer Seiten */
  related: string[];
  /** Optional: eigenes Kopfbild aus dem Bearbeitungsbereich ("/img/uploads/…"), ersetzt das Standardbild */
  heroImage?: string;
  /** Einleitungssatz über den Abschluss-Links, passend zum Thema */
  linksText?: string;
  /** Direkte Abschlussmöglichkeiten (Rechner, Antragsstrecken der Partner) */
  links?: { label: string; href: string; text?: string }[];
  /** Link zur Angebotsanforderung beim Maklerpool (nur Baufinanzierung-Übersicht) */
  angebotLink?: string;
};

export type Article = {
  /** Reihenfolge in der Ratgeber-Übersicht */
  order?: number;
  /** Bild: vorhandener Bildschlüssel oder hochgeladenes Bild ("/img/uploads/…") */
  image?: string;
  slug: string; // z. B. "schufa-auskunft"
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  readingMinutes: number;
  updated: string; // z. B. "Oktober 2026"
  sections: Section[];
  /** 3–5 kurze Merksätze am Ende */
  takeaway: string[];
  faqs?: Faq[];
};

export type LegalBlock = { heading: string; paragraphs: string[]; bullets?: string[] };

export type LegalPage = {
  slug: string; // "impressum" | "datenschutz" | "erstinformation"
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** sichtbarer Hinweis oben, z. B. dass der Text vor Veröffentlichung geprüft wird */
  note?: string;
  blocks: LegalBlock[];
};

export type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  story: string[];
  /** Stationen/Qualifikationen, keine erfundenen Jahreszahlen */
  milestones: { title: string; text: string }[];
  principles: Highlight[]; // 3–4 Grundsätze der Arbeitsweise
  quote: string; // persönlicher Satz von Ilonka, sinngemäß, als ihr Leitsatz formuliert (kein Kundenzitat)
};

export type ReviewTheme = { title: string; text: string };
