"use client";

import { useId, useState } from "react";
import type { Faq as FaqItem } from "@/content/types";
import { IconPlus } from "./Icons";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item" key={f.q}>
            <h3 style={{ margin: 0, font: "inherit" }}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`${base}-${i}`}
                id={`${base}-q${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <IconPlus />
              </button>
            </h3>
            <div className={`faq-a${isOpen ? " is-open" : ""}`} id={`${base}-${i}`} role="region" aria-labelledby={`${base}-q${i}`}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
