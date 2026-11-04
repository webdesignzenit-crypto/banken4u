import type { LegalPage } from "./types";
import impressum from "../../content/rechtstexte/impressum.json";
import datenschutz from "../../content/rechtstexte/datenschutz.json";
import erstinformation from "../../content/rechtstexte/erstinformation.json";

/** Rechtstexte, im Bearbeitungsbereich (/admin) änderbar. */
export const legalPages = [impressum, datenschutz, erstinformation] as LegalPage[];
