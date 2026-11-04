"""Erzeugt public/admin/config.yml aus scripts/cms-config.src.yml (löst YAML-Anker auf, entfernt x-Vorlagen)."""
import copy
import yaml

src = "scripts/cms-config.src.yml"
d = yaml.safe_load(open(src, encoding="utf-8"))
for k in [k for k in d if k.startswith("x-")]:
    d.pop(k)


# Einzahl-Bezeichnungen für Listen (für „… hinzufügen“)
EINZAHL = {
    "paragraphs": "Absatz", "story": "Absatz", "intro": "Absatz", "sections": "Abschnitt", "blocks": "Abschnitt",
    "bullets": "Punkt", "punkte": "Punkt", "takeaway": "Punkt", "highlights": "Vorteil", "steps": "Schritt",
    "schritte": "Schritt", "faqs": "Frage", "links": "Link", "milestones": "Station", "principles": "Grundsatz",
    "reviewThemes": "Punkt", "reviews": "Stimme", "hours": "Zeile",
}


def einzahl(node):
    if isinstance(node, dict):
        if node.get("widget") == "list" and node.get("name") in EINZAHL:
            node.setdefault("label_singular", EINZAHL[node["name"]])
        for v in node.values():
            einzahl(v)
    elif isinstance(node, list):
        for v in node:
            einzahl(v)


d = copy.deepcopy(d)
einzahl(d)


class NoAlias(yaml.SafeDumper):
    def ignore_aliases(self, data):
        return True


head = (
    "# Bearbeitungsbereich für banken4u.de (Decap CMS)\n"
    "# Anmeldung: E-Mail und Passwort über Netlify Identity, Speichern über Git Gateway.\n"
    "# Jede Veröffentlichung speichert die Datei im Repository; Netlify baut die Seite danach neu (ca. 1–2 Minuten).\n"
    "# Diese Datei wird aus scripts/cms-config.src.yml erzeugt (python3 scripts/build-cms-config.py).\n\n"
)
out = yaml.dump(copy.deepcopy(d), Dumper=NoAlias, allow_unicode=True, sort_keys=False, width=200, default_flow_style=False)
open("public/admin/config.yml", "w", encoding="utf-8").write(head + out)
print("public/admin/config.yml geschrieben")
