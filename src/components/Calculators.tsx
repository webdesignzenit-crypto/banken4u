"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { IconArrow } from "./Icons";

const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const pct = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " %";
const num = (v: string) => {
  const n = parseFloat(v.replace(/\./g, "").replace(",", "."));
  return isNaN(n) ? 0 : n;
};

function Range({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  hint?: string;
}) {
  const id = useId();
  const p = ((value - min) / (max - min)) * 100;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        <output htmlFor={id}>{format(value)}</output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--p" as string]: `${p}%` }}
        aria-valuetext={format(value)}
      />
      {hint ? <span className="hint">{hint}</span> : null}
    </div>
  );
}

function RateField({ value, onChange, id }: { value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>Sollzins, Ihr Beispielwert</label>
      <div className="unit">
        <input id={id} type="text" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} aria-describedby={`${id}-h`} />
        <span>% p. a.</span>
      </div>
      <span className="hint" id={`${id}-h`}>
        Frei wählbar, etwa aus einem vorliegenden Angebot. Aktuelle Konditionen nenne ich Ihnen im Gespräch.
      </span>
    </div>
  );
}

/** Annuitätendarlehen: Monatsrate, Restschuld nach Zinsbindung, Zinsanteil, Laufzeit bis zur vollständigen Tilgung. */
export function BauCalc({ cta = false }: { cta?: boolean }) {
  const rid = useId();
  const [loan, setLoan] = useState(300000);
  const [rate, setRate] = useState("3,5");
  const [tilg, setTilg] = useState(2);
  const [years, setYears] = useState(10);

  const r = useMemo(() => {
    const z = Math.max(0, num(rate)) / 100;
    const monthly = (loan * (z + tilg / 100)) / 12;
    let rest = loan;
    let m = 0;
    let restAfter = 0;
    let interestFix = 0;
    let paidInterest = 0;
    while (rest > 0.5 && m < 12 * 60) {
      const zi = (rest * z) / 12;
      const ti = Math.min(rest, monthly - zi);
      if (ti <= 0) break;
      rest -= ti;
      paidInterest += zi;
      m++;
      if (m === years * 12) {
        restAfter = rest;
        interestFix = paidInterest;
      }
    }
    if (m < years * 12) {
      restAfter = Math.max(0, rest);
      interestFix = paidInterest;
    }
    return { monthly, restAfter: Math.max(0, restAfter), interestFix, months: rest <= 0.5 ? m : null };
  }, [loan, rate, tilg, years]);

  return (
    <div className="calc">
      <div className="calc-in">
        <Range label="Darlehensbetrag" value={loan} min={50000} max={1000000} step={5000} onChange={setLoan} format={eur} />
        <RateField id={rid} value={rate} onChange={setRate} />
        <Range label="Anfängliche Tilgung" value={tilg} min={1} max={6} step={0.5} onChange={setTilg} format={(v) => pct(v)} />
        <div className="field">
          <span className="lbl" id={`${rid}-zb`}>
            Zinsbindung
          </span>
          <div className="tabs" role="radiogroup" aria-labelledby={`${rid}-zb`} style={{ marginBottom: 0 }}>
            {[5, 10, 15, 20].map((y) => (
              <button key={y} type="button" role="radio" aria-checked={years === y} aria-selected={years === y} onClick={() => setYears(y)}>
                {y} Jahre
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="calc-out" aria-live="polite">
        <div>
          <p style={{ margin: "0 0 10px", opacity: 0.8 }}>Monatliche Rate im Beispiel</p>
          <p className="result-big" style={{ margin: 0 }}>
            {eur(r.monthly)}
          </p>
        </div>
        <dl className="result-list">
          <div>
            <dt>Restschuld nach {years} Jahren</dt>
            <dd>{eur(r.restAfter)}</dd>
          </div>
          <div>
            <dt>Zinsen in der Zinsbindung</dt>
            <dd>{eur(r.interestFix)}</dd>
          </div>
          <div>
            <dt>Laufzeit bis schuldenfrei</dt>
            <dd>{r.months ? `ca. ${Math.floor(r.months / 12)} Jahre ${r.months % 12 ? `${r.months % 12} Monate` : ""}` : "über 60 Jahre"}</dd>
          </div>
        </dl>
        <div style={{ display: "grid", gap: 16 }}>
          <p className="disclaimer">
            Unverbindliche Beispielrechnung mit gleichbleibendem Zins über die gesamte Laufzeit. Kein Angebot und keine Aussage über aktuelle Zinsen. Ihre tatsächlichen
            Konditionen hängen unter anderem von Objekt, Eigenkapital und Einkommen ab.
          </p>
          {cta && (
            <Link className="btn btn-messing" href="/angebot/">
              Echte Angebote vergleichen lassen
              <IconArrow />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function KreditCalc() {
  const rid = useId();
  const [amount, setAmount] = useState(15000);
  const [rate, setRate] = useState("6,0");
  const [months, setMonths] = useState(60);

  const r = useMemo(() => {
    const i = Math.max(0, num(rate)) / 100 / 12;
    const monthly = i === 0 ? amount / months : (amount * i) / (1 - Math.pow(1 + i, -months));
    const total = monthly * months;
    return { monthly, total, cost: total - amount };
  }, [amount, rate, months]);

  return (
    <div className="calc">
      <div className="calc-in">
        <Range label="Kreditbetrag" value={amount} min={1000} max={80000} step={500} onChange={setAmount} format={eur} />
        <div className="field">
          <label htmlFor={rid}>Effektiver Jahreszins, Ihr Beispielwert</label>
          <div className="unit">
            <input id={rid} type="text" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} aria-describedby={`${rid}-h`} />
            <span>% p. a.</span>
          </div>
          <span className="hint" id={`${rid}-h`}>
            Frei wählbar. Ihren persönlichen Zins erfahren Sie mit einem Vergleich, ohne Auswirkung auf Ihre SCHUFA-Bonität.
          </span>
        </div>
        <Range
          label="Laufzeit"
          value={months}
          min={12}
          max={120}
          step={6}
          onChange={setMonths}
          format={(v) => `${v} Monate`}
        />
      </div>
      <div className="calc-out" aria-live="polite">
        <div>
          <p style={{ margin: "0 0 10px", opacity: 0.8 }}>Monatliche Rate im Beispiel</p>
          <p className="result-big" style={{ margin: 0 }}>
            {eur(r.monthly)}
          </p>
        </div>
        <dl className="result-list">
          <div>
            <dt>Rückzahlung gesamt</dt>
            <dd>{eur(r.total)}</dd>
          </div>
          <div>
            <dt>Davon Zinsen</dt>
            <dd>{eur(r.cost)}</dd>
          </div>
        </dl>
        <p className="disclaimer">
          Unverbindliche Beispielrechnung mit festem Zins und gleichbleibender Rate. Kein Angebot und keine Aussage über aktuelle Zinsen.
        </p>
      </div>
    </div>
  );
}
