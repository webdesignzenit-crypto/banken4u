import { img } from "@/content/images";

/** Siegel „Gold Partner Baufinanzierung“ von ImmoScout24, oben rechts im Kopfbild jeder Seite. */
export function Siegel() {
  return (
    <div className="siegel-row wrap">
      <img
        className="siegel"
        src={img("siegel-goldpartner-120.webp")}
        srcSet={`${img("siegel-goldpartner-120.webp")} 1x, ${img("siegel-goldpartner-240.webp")} 2x`}
        alt="Siegel: Gold Partner Baufinanzierung bei ImmoScout24"
        width={120}
        height={153}
      />
    </div>
  );
}
