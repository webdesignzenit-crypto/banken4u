import type { ServicePage } from "./types";
import bauUebersicht from "../../content/leistungen/bau-uebersicht.json";
import immobilienkauf from "../../content/leistungen/immobilienkauf.json";
import neubau from "../../content/leistungen/neubau.json";
import anschlussfinanzierung from "../../content/leistungen/anschlussfinanzierung.json";
import umschuldung from "../../content/leistungen/umschuldung.json";
import foerderkredite from "../../content/leistungen/foerderkredite.json";
import modernisierung from "../../content/leistungen/modernisierung.json";

/** Texte kommen aus content/leistungen/*.json und sind im Bearbeitungsbereich (/admin) änderbar. */
export const servicesBau = [bauUebersicht, immobilienkauf, neubau, anschlussfinanzierung, umschuldung, foerderkredite, modernisierung] as ServicePage[];
