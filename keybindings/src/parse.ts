import { homedir } from "os";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export interface Keybinding {
  key: string; // raw: cmd-shift-f
  pretty: string; // ⌘ ⇧ F
  command: string; // exec-and-forget open -a Finder
  section: string; // apps
}

const CONFIG_PATH = join(homedir(), ".config", "aerospace", "aerospace.toml");

function prettify(raw: string): string {
  return raw
    .replace(/^cmd-/, "\u2318 ")
    .replace(/^alt-/, "\u2325 ")
    .replace(/^ctrl-/, "\u2303 ")
    .replace(/-shift-/, " \u21E7 ")
    .replace(/^-/, " + ")
    .replace(/-/g, " + ")
    .replace(/\b([a-z])\b/g, (m) => m.toUpperCase());
}

export function parseKeybindings(toml?: string): Keybinding[] {
  const text =
    toml ?? (existsSync(CONFIG_PATH) ? readFileSync(CONFIG_PATH, "utf8") : "");
  const out: Keybinding[] = [];
  let section = "";
  let inBind = false;
  for (const line of text.split("\n")) {
    if (line.startsWith("[mode.main.binding]")) {
      inBind = true;
      continue;
    }
    if (line.startsWith("[")) {
      inBind = false;
      continue;
    }
    if (!inBind) continue;
    const sectionMatch = line.match(/^# --- (.+) ---$/);
    if (sectionMatch) {
      section = sectionMatch[1]
        .trim()
        .toLowerCase()
        .replace(/\s*\(.*\)/, "");
      continue;
    }
    const m = line.match(/^([a-z0-9-]+)\s*=\s*'(.*)'\s*(?:#.*)?$/);
    if (!m) continue;
    const [, key, command] = m;
    if (!/^(cmd|alt|ctrl)-/.test(key)) continue;
    out.push({ key, pretty: prettify(key), command: command.trim(), section });
  }
  return out;
}
