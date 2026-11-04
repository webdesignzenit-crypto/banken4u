import type { ServicePage } from "./types";
import ratenkredit from "../../content/leistungen/ratenkredit.json";
import bausparen from "../../content/leistungen/bausparen.json";
import geldanlage from "../../content/leistungen/geldanlage.json";
import versicherungen from "../../content/leistungen/versicherungen.json";

/** Texte kommen aus content/leistungen/*.json und sind im Bearbeitungsbereich (/admin) änderbar. */
export const servicesWeitere = [ratenkredit, bausparen, geldanlage, versicherungen] as ServicePage[];
