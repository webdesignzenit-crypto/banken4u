import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader/standard.css";
import "@fontsource-variable/newsreader/standard-italic.css";
import "@fontsource-variable/geist/wght.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/content/site";
import startseite from "../../content/startseite.json";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: startseite.metaTitle,
    template: "%s",
  },
  description: startseite.metaDescription,
  openGraph: { type: "website", locale: "de_DE", siteName: "Banken4U", images: ["/img/hero-1920.webp"] },
  alternates: { canonical: "/" },
  ...(process.env.NEXT_PUBLIC_PREVIEW || process.env.NEXT_PUBLIC_NOINDEX ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#355F91",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["FinancialService", "LocalBusiness"],
  name: "Banken4U",
  description: "Finanzmaklerin für Baufinanzierung, Kredite, Bausparen, Geldanlage und Versicherungen.",
  url: site.url,
  telephone: "+49 35243 477706",
  email: site.email,
  founder: { "@type": "Person", name: site.owner, jobTitle: "Bankfachwirtin (IHK), Versicherungsfachfrau (IHK)" },
  address: { "@type": "PostalAddress", streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressRegion: "Sachsen", addressCountry: "DE" },
  areaServed: ["Weinböhla", "Meißen", "Radebeul", "Dresden", "Deutschland"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "10:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "10:00", closes: "15:00" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: String(site.rating).replace(",", "."), reviewCount: String(site.ratingCount).replace(/\D/g, ""), bestRating: "5" },
};

const PREVIEW = !!process.env.NEXT_PUBLIC_PREVIEW;

/** Nur in der Vorschau: interne Links als normale Seitenaufrufe relativ zum Vorschau-Ordner öffnen. */
const previewNav = `try{history.scrollRestoration="manual"}catch(e){}if(!location.hash){window.scrollTo(0,0);window.addEventListener("load",function(){window.scrollTo(0,0)});}window.addEventListener("click",function(e){var a=e.target&&e.target.closest?e.target.closest("a[href]"):null;if(!a||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey)return;var h=a.getAttribute("href")||"";if(/^(https?:|mailto:|tel:)/.test(h)||a.target==="_blank")return;e.preventDefault();e.stopPropagation();if(h.charAt(0)==="#"){var el=document.getElementById(decodeURIComponent(h.slice(1)));if(el)el.scrollIntoView({behavior:"smooth"});return;}if(h.charAt(0)==="/")h=h.slice(1);var q=h.split("#")[0];if(q===""||q.slice(-1)==="/")h=q+"index.html";location.href=new URL(h,window.__B4U_BASE||location.href).href;},true);`;

const boot = `document.documentElement.classList.add('js');`;

/** Einladungs- und Passwort-Links von Netlify Identity landen auf der Startseite: an den Bearbeitungsbereich weiterreichen. */
const identityRedirect = `if(/(invite|recovery|confirmation|email_change)_token=/.test(location.hash))location.replace('/admin/'+location.hash);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREVIEW ? boot + previewNav : boot + identityRedirect }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll>
          <a href="#inhalt" className="sr-only skip">
            Zum Inhalt springen
          </a>
          <Header />
          <RevealObserver />
          {children}
          <Footer />
          {PREVIEW ? <div className="pv-badge">Entwurf · Vorschau</div> : null}
        </SmoothScroll>
      </body>
    </html>
  );
}
