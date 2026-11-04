import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true } as const;

export const IconPhone = (p: P) => (
  <svg {...base} strokeLinejoin="round" {...p}><path d="M5 3.5h3.2l1.6 4.2-2.2 1.4a11.5 11.5 0 0 0 7.3 7.3l1.4-2.2 4.2 1.6V19a1.6 1.6 0 0 1-1.7 1.6A16.6 16.6 0 0 1 3.4 5.2 1.6 1.6 0 0 1 5 3.5Z" /></svg>
);
export const IconArrow = (p: P) => (
  <svg {...base} strokeLinecap="square" {...p}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const IconChevron = (p: P) => (
  <svg {...base} strokeLinecap="square" {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const IconPlus = (p: P) => (
  <svg {...base} strokeLinecap="square" {...p}><path d="M12 4v16M4 12h16" /></svg>
);
export const IconMenu = (p: P) => (
  <svg {...base} {...p}><path d="M3 7h18M3 12h18M3 17h12" /></svg>
);
export const IconClose = (p: P) => (
  <svg {...base} {...p}><path d="M5 5l14 14M19 5 5 19" /></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base} strokeWidth={1.8} strokeLinecap="square" {...p}><path d="m4 12.5 5 5L20 6.5" /></svg>
);
export const IconStar = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}><path fill="currentColor" d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z" /></svg>
);
export const IconPerson = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}><path fill="currentColor" d="M12 12.2a4.6 4.6 0 1 0 0-9.2 4.6 4.6 0 0 0 0 9.2Zm0 2.1c-4.6 0-8.4 2.6-8.4 6.2V21h16.8v-.5c0-3.6-3.8-6.2-8.4-6.2Z" /></svg>
);
export const IconMail = (p: P) => (
  <svg {...base} {...p}><path d="M3.5 6h17v12h-17z" /><path d="m4 7 8 6 8-6" /></svg>
);
export const IconPin = (p: P) => (
  <svg {...base} {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></svg>
);
export const IconClock = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const IconAward = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="9" r="5.5" /><path d="m8.6 13.4-1.6 7.1 5-2.6 5 2.6-1.6-7.1" /></svg>
);
export const IconShield = (p: P) => (
  <svg {...base} {...p}><path d="M12 3.5 5 6v5.5c0 4.4 3 7.9 7 9 4-1.1 7-4.6 7-9V6l-7-2.5Z" /><path d="m9 12 2.2 2.2L15.5 10" /></svg>
);
export const IconScale = (p: P) => (
  <svg {...base} {...p}><path d="M12 4v16M6 20h12M5 7h14" /><path d="m5 7-3 6a3 3 0 0 0 6 0L5 7Zm14 0-3 6a3 3 0 0 0 6 0l-3-6Z" /></svg>
);
export const IconChat = (p: P) => (
  <svg {...base} {...p}><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9.5h8M8 12.5h5" /></svg>
);
export const IconHouse = (p: P) => (
  <svg {...base} {...p}><path d="M3.5 11 12 4l8.5 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></svg>
);
export const IconStack = (p: P) => (
  <svg {...base} {...p}><ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 10v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4M5 14v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" /></svg>
);
export const IconDoc = (p: P) => (
  <svg {...base} {...p}><path d="M6 3.5h8l4 4V20.5H6z" /><path d="M14 3.5v4h4M9 12h6M9 15.5h6" /></svg>
);

export function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="stars" aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <IconStar key={i} />
      ))}
    </span>
  );
}
