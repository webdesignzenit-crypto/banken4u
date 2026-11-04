import fs from "node:fs";
import path from "node:path";
import type { Article } from "./types";

/**
 * Ratgeber-Artikel: jede Datei in content/ratgeber/ ist ein Artikel.
 * Neue Artikel legt Frau Karras im Bearbeitungsbereich (/admin) an; sie erscheinen nach dem nächsten Build automatisch.
 * Nur auf dem Server verwenden (liest Dateien beim Build).
 */
const dir = path.join(process.cwd(), "content", "ratgeber");

export const articles: Article[] = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Article)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title, "de"));
