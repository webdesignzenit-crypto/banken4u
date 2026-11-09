"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconArrow } from "./Icons";
import { site } from "@/content/site";

type Gruppe = "baufi" | "anschluss" | "kredit" | "bauspar" | "vl" | "vers";

const anliegen: { v: string; t: string; g: Gruppe; key: string }[] = [
  { v: "Immobilienkauf", t: "Haus oder Wohnung kaufen", g: "baufi", key: "immobilienkauf" },
  { v: "Neubau", t: "Selbst bauen", g: "baufi", key: "neubau" },
  { v: "Anschlussfinanzierung", t: "Zinsbindung läuft aus", g: "anschluss", key: "anschlussfinanzierung" },
  { v: "Umschuldung", t: "Laufendes Darlehen ablösen", g: "anschluss", key: "umschuldung" },
  { v: "Modernisierung", t: "Sanieren oder umbauen", g: "baufi", key: "modernisierung" },
  { v: "Förderkredit (KfW)", t: "Förderung fürs Bauen und Sanieren", g: "baufi", key: "foerderkredite" },
  { v: "Ratenkredit", t: "Auto, Möbel, Anschaffung", g: "kredit", key: "ratenkredit" },
  { v: "Bausparen", t: "Für später vorsorgen", g: "bauspar", key: "bausparen" },
  { v: "Vermögenswirksame Leistungen (VL)", t: "Zuschuss vom Arbeitgeber anlegen", g: "vl", key: "vl" },
  { v: "Versicherung", t: "Haftpflicht, Hausrat, BU und mehr", g: "vers", key: "versicherung" },
];

const titel: Record<Gruppe, string> = {
  baufi: "Ihr Vorhaben in Zahlen",
  anschluss: "Ihre laufende Finanzierung",
  kredit: "Ihr Kreditwunsch",
  bauspar: "Ihr Bausparwunsch",
  vl: "Ihre vermögenswirksamen Leistungen",
  vers: "Welche Versicherung suchen Sie?",
};

const steps = ["Anliegen", "Details", "Zu Ihnen", "Kontakt"];

/** Betragsfeld mit Euro-Zeichen */
function Euro({ id, name, label, ph }: { id: string; name: string; label: string; ph: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="unit">
        <input id={id} name={name} type="text" inputMode="numeric" placeholder={ph} />
        <span>€</span>
      </div>
    </div>
  );
}

function Auswahl({ id, name, label, opts, def }: { id: string; name: string; label: string; opts: string[]; def?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} defaultValue={def ?? opts[0]}>
        {opts.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

const zeitpunkte = ["So schnell wie möglich", "In den nächsten 3 Monaten", "In 3 bis 12 Monaten", "Später, ich informiere mich"];

export default function OfferForm() {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [wahl, setWahl] = useState(anliegen[0].v);
  const gruppe = (anliegen.find((a) => a.v === wahl) ?? anliegen[0]).g;
  const istKredit = gruppe === "baufi" || gruppe === "anschluss" || gruppe === "kredit";

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("thema");
    const hit = anliegen.find((a) => a.key === key);
    if (hit) setWahl(hit.v);
  }, []);

  const stepValid = (i: number) => {
    const el = form.current?.querySelector<HTMLFieldSetElement>(`[data-step="${i}"]`);
    if (!el) return true;
    const fields = Array.from(el.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    for (const f of fields) {
      if (!f.checkValidity()) {
        f.reportValidity();
        return false;
      }
    }
    return true;
  };

  const go = (to: number) => {
    if (to > step && !stepValid(step)) return;
    setStep(to);
    setError("");
    requestAnimationFrame(() => {
      const el = form.current?.querySelector<HTMLElement>(`[data-step="${to}"] h2`);
      el?.focus();
      form.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stepValid(step)) return;
    if (step < steps.length - 1) return go(step + 1);
    if (process.env.NEXT_PUBLIC_PREVIEW) {
      setError("Vorschau: Hier wird nichts gesendet. Auf der fertigen Website geht Ihre Anfrage direkt an Banken4U.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const data = new FormData(e.currentTarget);
      const body = new URLSearchParams(data as unknown as Record<string, string>).toString();
      const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/danke/");
    } catch {
      setError(`Das Senden hat leider nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie mich direkt an: ${site.phone}.`);
      setBusy(false);
    }
  };

  return (
    <form
      ref={form}
      name="angebot"
      method="POST"
      action="/danke/"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      noValidate
      style={{ scrollMarginTop: 110 }}
    >
      <input type="hidden" name="form-name" value="angebot" />
      <p hidden>
        <label>
          Nicht ausfüllen: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="progress" aria-hidden>
        {steps.map((s, i) => (
          <div key={s} className={i < step ? "done" : i === step ? "cur" : ""}>
            <i />
            <span>
              {i + 1}. {s}
            </span>
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Schritt {step + 1} von {steps.length}: {steps[step]}
      </p>

      <fieldset className="fstep" data-step="0" hidden={step !== 0} style={{ border: 0, padding: 0, margin: 0 }}>
        <h2 tabIndex={-1}>Worum geht es?</h2>
        <div className="choices" role="radiogroup" aria-label="Anliegen">
          {anliegen.map((a) => (
            <label className="choice" key={a.v}>
              <input type="radio" name="anliegen" value={a.v} required checked={wahl === a.v} onChange={() => setWahl(a.v)} />
              <span>
                <b>{a.v}</b>
                <small>{a.t}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="fstep" data-step="1" hidden={step !== 1} style={{ border: 0, padding: 0, margin: 0 }}>
        <h2 tabIndex={-1}>{titel[gruppe]}</h2>
        <p style={{ margin: 0, color: "var(--text-2)" }}>Grobe Angaben genügen. Was Sie noch nicht wissen, lassen Sie einfach frei.</p>

        {/* Alle Gruppen stehen im HTML, damit das Formular jedes Feld kennt; sichtbar und gesendet wird nur die passende */}
        <fieldset className="two fgroup" disabled={gruppe !== "baufi"} hidden={gruppe !== "baufi"}>
          <Euro id="f-kosten" name="kosten" label="Kaufpreis oder Kosten des Vorhabens" ph="z. B. 350.000" />
          <Euro id="f-ek" name="eigenkapital" label="Eigenkapital" ph="z. B. 60.000" />
          <Euro id="f-darlehen" name="darlehen" label="Gewünschter Darlehensbetrag" ph="z. B. 290.000" />
          <Auswahl id="f-zeit" name="zeitpunkt" label="Wann soll es losgehen?" opts={zeitpunkte} def="In den nächsten 3 Monaten" />
          <div className="field">
            <label htmlFor="f-plz">PLZ und Ort der Immobilie</label>
            <input id="f-plz" name="objekt_ort" type="text" autoComplete="off" placeholder="z. B. 01689 Weinböhla" />
          </div>
        </fieldset>

        <fieldset className="two fgroup" disabled={gruppe !== "anschluss"} hidden={gruppe !== "anschluss"}>
          <Euro id="f-rest" name="restschuld" label="Restschuld zum Ende der Zinsbindung" ph="z. B. 180.000" />
          <div className="field">
            <label htmlFor="f-zinsbindung">Zinsbindung endet am</label>
            <input id="f-zinsbindung" name="zinsbindung_ende" type="text" placeholder="z. B. 03/2027" />
          </div>
          <Euro id="f-wert" name="objektwert" label="Ungefährer Wert der Immobilie" ph="z. B. 400.000" />
          <div className="field">
            <label htmlFor="f-bank">Bisherige Bank</label>
            <input id="f-bank" name="bisherige_bank" type="text" placeholder="optional" />
          </div>
          <div className="field">
            <label htmlFor="f-plz2">PLZ und Ort der Immobilie</label>
            <input id="f-plz2" name="objekt_ort_anschluss" type="text" autoComplete="off" placeholder="z. B. 01689 Weinböhla" />
          </div>
        </fieldset>

        <fieldset className="two fgroup" disabled={gruppe !== "kredit"} hidden={gruppe !== "kredit"}>
          <Euro id="f-kredit" name="kreditbetrag" label="Gewünschter Kreditbetrag" ph="z. B. 15.000" />
          <Auswahl id="f-laufzeit" name="laufzeit" label="Wunschlaufzeit" opts={["12 Monate", "24 Monate", "36 Monate", "48 Monate", "60 Monate", "72 Monate", "84 Monate", "96 Monate", "120 Monate", "Noch offen"]} def="60 Monate" />
          <Auswahl id="f-zweck" name="verwendung" label="Wofür ist der Kredit?" opts={["Auto", "Möbel und Einrichtung", "Umschuldung alter Kredite", "Modernisierung", "Freie Verwendung", "Sonstiges"]} />
          <Auswahl id="f-zeit2" name="zeitpunkt_kredit" label="Wann brauchen Sie das Geld?" opts={zeitpunkte} />
        </fieldset>

        <fieldset className="two fgroup" disabled={gruppe !== "bauspar"} hidden={gruppe !== "bauspar"}>
          <Euro id="f-summe" name="bausparsumme" label="Gewünschte Bausparsumme" ph="z. B. 50.000" />
          <Euro id="f-rate" name="sparrate" label="Monatlicher Sparbetrag" ph="z. B. 150" />
          <Auswahl id="f-ziel" name="bausparziel" label="Wofür sparen Sie?" opts={["Bauen oder kaufen", "Modernisieren", "Anschlussfinanzierung absichern", "Vermögen aufbauen", "Noch offen"]} />
          <Auswahl id="f-wann" name="bauspar_zeitraum" label="Wann brauchen Sie das Geld?" opts={["In 3 bis 5 Jahren", "In 5 bis 10 Jahren", "In mehr als 10 Jahren", "Noch offen"]} />
        </fieldset>

        <fieldset className="two fgroup" disabled={gruppe !== "vl"} hidden={gruppe !== "vl"}>
          <Auswahl id="f-vlag" name="vl_arbeitgeber" label="Zahlt Ihr Arbeitgeber VL?" opts={["Ja", "Nein", "Weiß ich nicht"]} />
          <Euro id="f-vlbetrag" name="vl_betrag" label="Betrag im Monat" ph="z. B. 40" />
          <Auswahl id="f-vlanlage" name="vl_anlage" label="Wie möchten Sie anlegen?" opts={["Beratung gewünscht", "Bausparvertrag", "Fondssparplan", "Banksparplan"]} />
          <Auswahl id="f-vlvertrag" name="vl_vertrag" label="Haben Sie schon einen VL-Vertrag?" opts={["Nein", "Ja, läuft aus", "Ja, ich möchte wechseln"]} />
        </fieldset>

        <fieldset className="two fgroup" disabled={gruppe !== "vers"} hidden={gruppe !== "vers"}>
          <Auswahl id="f-vart" name="versicherung" label="Welche Versicherung?" opts={["Privathaftpflicht", "Hausrat", "Wohngebäude", "Berufsunfähigkeit", "Risikolebensversicherung", "Private Krankenversicherung", "Unfallversicherung", "Rechtsschutz", "Mehrere, bitte beraten Sie mich", "Sonstige"]} />
          <Auswahl id="f-vwer" name="versicherte_personen" label="Für wen?" opts={["Nur für mich", "Für mich und meinen Partner", "Für die ganze Familie"]} />
          <Auswahl id="f-vbest" name="versicherung_bestand" label="Sind Sie schon versichert?" opts={["Nein, ich brauche neuen Schutz", "Ja, ich möchte vergleichen"]} />
          <Auswahl id="f-vbeginn" name="versicherung_beginn" label="Ab wann?" opts={["So schnell wie möglich", "Zum nächsten Monat", "Zum Ablauf des alten Vertrags", "Noch offen"]} />
        </fieldset>
      </fieldset>

      <fieldset className="fstep" data-step="2" hidden={step !== 2} style={{ border: 0, padding: 0, margin: 0 }}>
        <h2 tabIndex={-1}>Ein paar Angaben zu Ihnen</h2>
        <div className="two">
          <div className="field">
            <label htmlFor="f-vorname">Vorname *</label>
            <input id="f-vorname" name="vorname" type="text" autoComplete="given-name" required />
          </div>
          <div className="field">
            <label htmlFor="f-nachname">Nachname *</label>
            <input id="f-nachname" name="nachname" type="text" autoComplete="family-name" required />
          </div>
          <div className="field">
            <label htmlFor="f-job">Berufliche Situation</label>
            <select id="f-job" name="beschaeftigung" defaultValue="Angestellt">
              <option>Angestellt</option>
              <option>Beamtet</option>
              <option>Selbstständig</option>
              <option>In Rente oder Pension</option>
              <option>Sonstiges</option>
            </select>
          </div>
          <div className="field" hidden={!istKredit}>
            <label htmlFor="f-anzahl">Anzahl der Kreditnehmer</label>
            <select id="f-anzahl" name="kreditnehmer" defaultValue="1" disabled={!istKredit}>
              <option value="1">Eine Person</option>
              <option value="2">Zwei Personen</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="fstep" data-step="3" hidden={step !== 3} style={{ border: 0, padding: 0, margin: 0 }}>
        <h2 tabIndex={-1}>Wie erreiche ich Sie?</h2>
        <div className="two">
          <div className="field">
            <label htmlFor="f-tel">Telefon *</label>
            <input id="f-tel" name="telefon" type="tel" autoComplete="tel" required />
          </div>
          <div className="field">
            <label htmlFor="f-mail">E-Mail *</label>
            <input id="f-mail" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="f-wann">Am besten erreichbar</label>
            <select id="f-wann" name="erreichbarkeit" defaultValue="Egal">
              <option>Egal</option>
              <option>Vormittags</option>
              <option>Nachmittags</option>
              <option>Ab 17 Uhr</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-msg">Möchten Sie noch etwas ergänzen?</label>
          <textarea id="f-msg" name="nachricht" rows={4} />
        </div>
        <label className="consent">
          <input type="checkbox" name="einwilligung" value="ja" required />
          <span>
            Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. Mehr dazu in der{" "}
            <Link href="/datenschutz/" className="link-u" style={{ padding: 0 }}>
              Datenschutzerklärung
            </Link>
            . *
          </span>
        </label>
      </fieldset>

      {error ? (
        <p role="alert" className="note-box" style={{ marginTop: 20 }}>
          {error}
        </p>
      ) : null}

      <div className="fnav">
        {step > 0 ? (
          <button type="button" className="btn btn-linie" onClick={() => go(step - 1)}>
            Zurück
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn btn-tanne" disabled={busy}>
          {step < steps.length - 1 ? "Weiter" : busy ? "Wird gesendet" : "Angebot anfordern"}
          <IconArrow />
        </button>
      </div>
      <p className="t-small" style={{ color: "var(--grau)", marginTop: 18 }}>
        * Pflichtfeld. Ihre Anfrage ist unverbindlich.
      </p>
    </form>
  );
}
