import data from "../../content/bewertungen.json";

/** Echte Kundenstimmen von KennstDuEinen (gekürzt auf den ersten Satz). Im Bearbeitungsbereich (/admin) änderbar. */
export type Review = { name: string; date: string; title: string; text: string };

export const reviews: Review[] = data.reviews;
