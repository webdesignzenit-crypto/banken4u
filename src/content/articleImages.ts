import { articles } from "./ratgeber";
import { imgKey } from "./images";

/** Bild je Ratgeber-Artikel: ein vorhandener Bildschlüssel (z. B. "rechner") oder ein hochgeladenes Bild ("/img/uploads/…"). */
export const articleImage: Record<string, string> = Object.fromEntries(articles.map((a) => [a.slug, a.image ? imgKey(a.image) : "ratgeber"]));
