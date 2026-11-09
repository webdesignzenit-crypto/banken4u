import { img } from "@/content/images";
import { site } from "@/content/site";
import { Stars } from "./Icons";

/**
 * Oben rechts im Kopfbild jeder Seite: Siegel „Gold Partner Baufinanzierung“ von ImmoScout24
 * und daneben die Gesamtbewertung über alle Portale (Zahlen aus den Allgemeinen Angaben im CMS).
 */
export function Siegel() {
  return (
    <div className="siegel-row wrap">
      <div className="siegel-rating" role="img" aria-label={`Bewertung ${site.rating} von 5 Sternen aus ${site.ratingCount} Bewertungen von ${site.ratingSources} Portalen`}>
        <b>
          {site.rating}
          <small>/5</small>
        </b>
        <Stars />
        <span>Sehr gut</span>
        <small>
          {site.ratingCount} Bewertungen von {site.ratingSources} Portalen
        </small>
      </div>
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
