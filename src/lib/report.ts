import type { State } from "./store";

/*
 * Progress codes: one line of text that summarizes a cadet's progress.
 *
 *   CPP1;c=123456;t=HS1;r=linux,captain;d=20261015;i=fnd-what-cp,fnd-readme
 *
 *   c = CAP ID, t = team, r = roles, d = date reported (YYYYMMDD),
 *   i = ids of completed items.
 *
 * Notes and dates per item stay on the cadet's device and are never included.
 */

export const CODE_PREFIX = "CPP1;";

export interface Report {
  capid: string;
  teamId: string;
  roles: string[];
  /** YYYY-MM-DD */
  date: string;
  done: string[];
}

const ID_RE = /^[a-z0-9-]{1,40}$/;

export function buildCode(s: State, date: string): string {
  const done = Object.entries(s.items)
    .filter(([, v]) => v.doneOn)
    .map(([k]) => k)
    .sort();
  const roles = [...s.profile.roles].sort();
  return [
    "CPP1",
    `c=${s.profile.capid}`,
    `t=${s.profile.teamId}`,
    `r=${roles.join(",")}`,
    `d=${date.replace(/-/g, "")}`,
    `i=${done.join(",")}`,
  ].join(";");
}

export function parseCode(code: string): Report | null {
  const text = code.trim();
  if (!text.startsWith(CODE_PREFIX)) return null;
  const fields = new Map<string, string>();
  for (const part of text.slice(CODE_PREFIX.length).split(";")) {
    const eq = part.indexOf("=");
    if (eq > 0) fields.set(part.slice(0, eq), part.slice(eq + 1));
  }
  const capid = fields.get("c") ?? "";
  const d = fields.get("d") ?? "";
  if (!/^\d{4,7}$/.test(capid) || !/^\d{8}$/.test(d)) return null;
  const list = (k: string) =>
    (fields.get(k) ?? "")
      .split(",")
      .map((x) => x.trim())
      .filter((x) => ID_RE.test(x));
  return {
    capid,
    teamId: (fields.get("t") ?? "").replace(/[^A-Za-z0-9-]/g, "").slice(0, 16),
    roles: list("r"),
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
    done: list("i"),
  };
}

/** Finds every progress code in pasted text, such as cells copied from Excel or a CSV export. */
export function findCodes(text: string): Report[] {
  // Codes only ever contain these characters, so a quote, tab or space ends one.
  const matches = text.match(/CPP1;[A-Za-z0-9;=,-]*/g) ?? [];
  return matches.map(parseCode).filter((r): r is Report => r !== null);
}

/** Keeps the newest report for each CAP ID. */
export function latestByCapid(reports: Report[]): Report[] {
  const best = new Map<string, Report>();
  for (const r of reports) {
    const cur = best.get(r.capid);
    if (!cur || r.date > cur.date || (r.date === cur.date && r.done.length > cur.done.length)) best.set(r.capid, r);
  }
  return [...best.values()];
}

export const PLACEHOLDERS = { capid: "CAPID", team: "TEAM", code: "CODE" } as const;

/**
 * Fills a Microsoft Forms pre-filled link. The leader makes the link in Forms
 * with the answers CAPID, TEAM and CODE; each placeholder is replaced inside
 * whichever query value contains it, so any quoting Forms adds is kept.
 * Returns null if the template is missing or not a valid https URL.
 */
export function buildFormUrl(template: string, values: { capid: string; team: string; code: string }): string | null {
  if (!template) return null;
  let url: URL;
  try {
    url = new URL(template);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const swaps: [string, string][] = [
    [PLACEHOLDERS.code, values.code],
    [PLACEHOLDERS.capid, values.capid],
    [PLACEHOLDERS.team, values.team],
  ];
  const params = new URLSearchParams(url.search);
  for (const [key, value] of [...params.entries()]) {
    for (const [ph, real] of swaps) {
      if (value === ph || value === `"${ph}"`) {
        params.set(key, value.replace(ph, real));
        break;
      }
    }
  }
  url.search = params.toString();
  return url.toString();
}
