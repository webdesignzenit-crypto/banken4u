"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { IconArrow } from "./Icons";
import { site } from "@/content/site";

export default function ContactForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      f.reportValidity();
      return;
    }
    if (process.env.NEXT_PUBLIC_PREVIEW) {
      setError("Vorschau: Hier wird nichts gesendet. Auf der fertigen Website geht Ihre Anfrage direkt an Banken4U.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const body = new URLSearchParams(new FormData(f) as unknown as Record<string, string>).toString();
      const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/danke/");
    } catch {
      setError(`Das Senden hat leider nicht geklappt. Bitte rufen Sie mich an: ${site.phone}.`);
      setBusy(false);
    }
  };
  return (
    <form name="kontakt" method="POST" action="/danke/" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} noValidate style={{ display: "grid", gap: 16 }}>
      <input type="hidden" name="form-name" value="kontakt" />
      <p hidden>
        <label>
          Nicht ausfüllen: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="two">
        <div className="field">
          <label htmlFor="k-name">Name *</label>
          <input id="k-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="k-tel">Telefon</label>
          <input id="k-tel" name="telefon" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="k-mail">E-Mail *</label>
        <input id="k-mail" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="k-msg">Ihre Nachricht *</label>
        <textarea id="k-msg" name="nachricht" rows={5} required />
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
      {error ? (
        <p role="alert" className="note-box">
          {error}
        </p>
      ) : null}
      <div>
        <button type="submit" className="btn btn-tanne" disabled={busy}>
          {busy ? "Wird gesendet" : "Nachricht senden"}
          <IconArrow />
        </button>
      </div>
    </form>
  );
}
