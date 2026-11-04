import allgemein from "../../content/allgemein.json";

/** Telefonnummer in einen tel:-Link umwandeln (z. B. "035243 477706" → "tel:+4935243477706"). */
function telHref(nr: string) {
  const digits = nr.replace(/[^0-9+]/g, "");
  return "tel:" + (digits.startsWith("+") ? digits : "+49" + digits.replace(/^0/, ""));
}

/** Kontaktdaten und Kennzahlen, im Bearbeitungsbereich (/admin) unter „Allgemeine Angaben“ änderbar. */
export const site = {
  ...allgemein,
  phoneHref: telHref(allgemein.phone),
  mobileHref: telHref(allgemein.mobile),
};

export type NavItem = { href: string; label: string; text?: string };

export const navBaufinanzierung: NavItem[] = [
  { href: "/baufinanzierung/immobilienkauf/", label: "Immobilienkauf", text: "Haus oder Wohnung kaufen" },
  { href: "/baufinanzierung/neubau/", label: "Neubau", text: "Bauen mit sicherem Finanzplan" },
  { href: "/baufinanzierung/anschlussfinanzierung/", label: "Anschlussfinanzierung", text: "Neue Zinsbindung rechtzeitig sichern" },
  { href: "/baufinanzierung/umschuldung/", label: "Umschuldung", text: "Laufendes Darlehen neu aufstellen" },
  { href: "/baufinanzierung/foerderkredite/", label: "Förderkredite & KfW", text: "KfW-Kredite, Zuschüsse und Landesförderung" },
  { href: "/baufinanzierung/modernisierung/", label: "Modernisierung", text: "Sanieren, dämmen, erneuern" },
];

export const navLeistungen: NavItem[] = [
  { href: "/ratenkredit/", label: "Ratenkredit", text: "Für Auto, Möbel und Anschaffungen" },
  { href: "/bausparen/", label: "Bausparen", text: "Den Darlehenszins für später sichern" },
  { href: "/geldanlage/", label: "Geldanlage", text: "Tagesgeld, Girokonto, VL" },
  { href: "/versicherungen/", label: "Versicherungen", text: "PKV, Kfz und Auslandsreise" },
];

export const navMain: NavItem[] = [
  { href: "/rechner/", label: "Rechner" },
  { href: "/ratgeber/", label: "Ratgeber" },
  { href: "/ueber-mich/", label: "Über mich" },
  { href: "/kontakt/", label: "Kontakt" },
];
