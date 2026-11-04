import Link from "next/link";
import { img } from "@/content/images";

/** Logo von Banken4U (Haus mit Schriftzug) und daneben der Name als Schrift. */
export function Logo({ sub = true, href = "/" }: { sub?: boolean; href?: string }) {
  return (
    <Link href={href} className="logo" aria-label="Banken4U, zur Startseite">
      <img
        className="logo-img"
        src={img("logo-144.webp")}
        srcSet={`${img("logo-96.webp")} 96w, ${img("logo-144.webp")} 144w, ${img("logo-192.webp")} 192w`}
        sizes="64px"
        alt=""
        width={64}
        height={58}
      />
      <span className="logo-word">
        <span className="logo-name">Banken4U</span>
        {sub && <span className="logo-sub">Ilonka Karras · Finanzmaklerin</span>}
      </span>
    </Link>
  );
}
