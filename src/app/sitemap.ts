import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { articles } from "@/content/ratgeber";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...services.map((s) => `/${s.slug}/`),
    "/rechner/",
    "/ratgeber/",
    ...articles.map((a) => `/ratgeber/${a.slug}/`),
    "/ueber-mich/",
    "/bewertungen/",
    "/kontakt/",
    "/angebot/",
    "/impressum/",
    "/datenschutz/",
    "/erstinformation/",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : p.startsWith("/baufinanzierung") ? 0.9 : 0.6 }));
}
