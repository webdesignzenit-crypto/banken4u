"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { IconArrow } from "./Icons";
import { site } from "@/content/site";

const anliegen = [
  { v: "Immobilienkauf", t: "Haus oder Wohnung kaufen" },
  { v: "Neubau", t: "Selbst bauen" },
  { v: "Anschlussfinanzierung", t: "Zinsbindung läuft aus" },
  { v: "Umschuldung", t: "Laufendes Darlehen ablösen" },
  { v: "Modernisierung", t: "Sanieren oder umbauen" },
  { v: "Ratenkredit", t: "Auto, Möbel, Anschaffung" },
  { v: "Bausparen", t: "Für später vorsorgen" },
  { v: "Versicherung oder Geldanlage", t: "PKV, Kfz, Tagesgeld und mehr" },
];

const steps = ["Anliegen", "Vorhaben", "Zu Ihnen", "Kontakt"];

export default function OfferForm() {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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
          {anliegen.map((a, i) => (
            <label className="choice" key={a.v}>
              <input type="radio" name="anliegen" value={a.v} required defaultChecked={i === 0} />
              <span>
                <b>{a.v}</b>
                <small>{a.t}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="fstep" data-step="1" hidden={step !== 1} style={{ border: 0, padding: 0, margin: 0 }}>
        <h2 tabIndex={-1}>Ihr Vorhaben in Zahlen</h2>
        <p style={{ margin: 0, color: "var(--text-2)" }}>Grobe Angaben genügen. Was Sie noch nicht wissen, lassen Sie einfach frei.</p>
        <div className="two">
          <div className="field">
            <label htmlFor="f-betrag">Kaufpreis oder Kosten des Vorhabens</label>
            <div className="unit">
              <input id="f-betrag" name="kosten" type="text" inputMode="numeric" placeholder="z. B. 350.000" />
              <span>€</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-ek">Eigenkapital</label>
            <div className="unit">
              <input id="f-ek" name="eigenkapital" type="text" inputMode="numeric" placeholder="z. B. 60.000" />
              <span>€</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-darlehen">Gewünschter Darlehensbetrag</label>
            <div className="unit">
              <input id="f-darlehen" name="darlehen" type="text" inputMode="numeric" placeholder="z. B. 290.000" />
              <span>€</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-zeit">Wann soll es losgehen?</label>
            <select id="f-zeit" name="zeitpunkt" defaultValue="In den nächsten 3 Monaten">
              <option>So schnell wie möglich</option>
              <option>In den nächsten 3 Monaten</option>
              <option>In 3 bis 12 Monaten</option>
              <option>Später, ich informiere mich</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-plz">PLZ und Ort der Immobilie</label>
            <input id="f-plz" name="objekt_ort" type="text" autoComplete="off" placeholder="z. B. 01689 Weinböhla" />
          </div>
          <div className="field">
            <label htmlFor="f-zinsbindung">Zinsbindung läuft aus am</label>
            <input id="f-zinsbindung" name="zinsbindung_ende" type="text" placeholder="nur bei Anschlussfinanzierung" />
          </div>
        </div>
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
          <div className="field">
            <label htmlFor="f-anzahl">Anzahl der Kreditnehmer</label>
            <select id="f-anzahl" name="kreditnehmer" defaultValue="1">
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
