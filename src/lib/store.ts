import { useSyncExternalStore } from "react";
import { isGrade } from "../content/grades";
import type { RoleId } from "../content/types";

/*
 * Everything a cadet does is saved in their own browser (localStorage).
 * Nothing is sent anywhere unless they press "Report my progress", and then
 * only to the wing's Microsoft Form.
 */

export interface Profile {
  capid: string;
  lastName: string;
  /** Cadet grade, e.g. "C/SSgt". */
  grade: string;
  teamId: string;
  roles: RoleId[];
}

/** Letters (any language), spaces, apostrophes, hyphens and periods; 40 characters at most. */
export function cleanName(raw: string): string {
  return raw
    .replace(/[^\p{L}\p{M}' .-]/gu, "")
    .replace(/\s+/g, " ")
    .slice(0, 40);
}

export interface ItemState {
  /** Date the item was marked done (YYYY-MM-DD). */
  doneOn?: string;
  /** Private "what I learned" note. Never included in reports. */
  note?: string;
}

export interface State {
  v: 1;
  profile: Profile;
  items: Record<string, ItemState>;
  lastReportOn?: string;
}

const KEY = "cap435-portal:v1";

export const emptyState = (): State => ({
  v: 1,
  profile: { capid: "", lastName: "", grade: "", teamId: "", roles: [] },
  items: {},
});

/** Checks untrusted data (from storage or an imported file) and returns a clean State, or null. */
export function parseState(raw: unknown): State | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (r.v !== 1) return null;
  const p = (r.profile ?? {}) as Record<string, unknown>;
  const profile: Profile = {
    capid: typeof p.capid === "string" && /^\d{0,7}$/.test(p.capid) ? p.capid : "",
    lastName: typeof p.lastName === "string" ? cleanName(p.lastName).trim() : "",
    grade: typeof p.grade === "string" && isGrade(p.grade) ? p.grade : "",
    teamId: typeof p.teamId === "string" ? p.teamId.slice(0, 16) : "",
    roles: Array.isArray(p.roles) ? (p.roles.filter((x) => typeof x === "string").slice(0, 10) as RoleId[]) : [],
  };
  const items: Record<string, ItemState> = {};
  if (r.items && typeof r.items === "object") {
    for (const [id, val] of Object.entries(r.items as Record<string, unknown>)) {
      if (!/^[a-z0-9-]{1,40}$/.test(id) || !val || typeof val !== "object") continue;
      const v = val as Record<string, unknown>;
      const s: ItemState = {};
      if (typeof v.doneOn === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v.doneOn)) s.doneOn = v.doneOn;
      if (typeof v.note === "string" && v.note.trim()) s.note = v.note.slice(0, 2000);
      if (s.doneOn || s.note) items[id] = s;
    }
  }
  const state: State = { v: 1, profile, items };
  if (typeof r.lastReportOn === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.lastReportOn)) state.lastReportOn = r.lastReportOn;
  return state;
}

function load(): State {
  try {
    const text = localStorage.getItem(KEY);
    if (text) return parseState(JSON.parse(text)) ?? emptyState();
  } catch {
    /* storage blocked or corrupt: start fresh */
  }
  return emptyState();
}

let state: State = load();
const listeners = new Set<() => void>();

export function getState(): State {
  return state;
}

export function setState(next: State): void {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private window or storage full: keep working in memory */
  }
  listeners.forEach((l) => l());
}

export function update(fn: (s: State) => State): void {
  setState(fn(state));
}

export function useAppState(): State {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
}

// Keep tabs in sync when the cadet has the site open twice.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      state = load();
      listeners.forEach((l) => l());
    }
  });
}

export function todayISO(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function setDone(id: string, done: boolean): void {
  update((s) => {
    const items = { ...s.items };
    const cur = { ...(items[id] ?? {}) };
    if (done) cur.doneOn = todayISO();
    else delete cur.doneOn;
    if (cur.doneOn || cur.note) items[id] = cur;
    else delete items[id];
    return { ...s, items };
  });
}

export function setNote(id: string, note: string): void {
  update((s) => {
    const items = { ...s.items };
    const cur = { ...(items[id] ?? {}) };
    if (note.trim()) cur.note = note.slice(0, 2000);
    else delete cur.note;
    if (cur.doneOn || cur.note) items[id] = cur;
    else delete items[id];
    return { ...s, items };
  });
}

export function setProfile(profile: Profile): void {
  update((s) => ({ ...s, profile }));
}

export function doneIds(s: State): Set<string> {
  return new Set(Object.entries(s.items).filter(([, v]) => v.doneOn).map(([k]) => k));
}

export function exportJSON(s: State): string {
  return JSON.stringify(s, null, 2);
}

export function importJSON(text: string): State | null {
  try {
    return parseState(JSON.parse(text));
  } catch {
    return null;
  }
}
