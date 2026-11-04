import type { ElementType } from "react";

/** Überschrift, deren Wörter beim Einblenden einzeln aus einer Maske gleiten. */
export function Split({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={`split ${className}`} data-split="" style={{ ["--d" as string]: `${delay}ms` }} aria-label={text}>
      {words.map((w, i) => (
        <span className="w" key={i} aria-hidden>
          <span style={{ ["--i" as string]: i }}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
