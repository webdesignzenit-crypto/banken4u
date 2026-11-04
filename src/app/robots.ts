import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Entwurf auf netlify.app: komplett gesperrt, damit Google nichts doppelt zur echten Seite aufnimmt.
  if (process.env.NEXT_PUBLIC_NOINDEX) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/danke/", "/admin/"] }], sitemap: `${site.url}/sitemap.xml` };
}
