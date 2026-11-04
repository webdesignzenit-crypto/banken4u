import type { AboutContent, ReviewTheme } from "./types";
import data from "../../content/ueber-mich.json";

/** Texte der Seite „Über mich“, im Bearbeitungsbereich (/admin) änderbar. */
type AboutPage = AboutContent & {
  kicker: string;
  wegTitel: string;
  wegText: string;
  arbeitTitel: string;
  arbeitText: string;
  ctaTitel: string;
  ctaText: string;
  reviewThemes: ReviewTheme[];
};
export const about = data as AboutPage;
export const reviewThemes: ReviewTheme[] = data.reviewThemes;
