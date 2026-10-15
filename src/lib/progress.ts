import { PATHS } from "../content/paths";
import { ROUNDS } from "../content/season";
import type { Path, Round } from "../content/types";

export interface PathProgress {
  done: number;
  /** Required items only. Optional items never count against you. */
  total: number;
  pct: number;
}

export function pathProgress(path: Path, done: Set<string>): PathProgress {
  const required = path.items.filter((i) => !i.optional);
  const n = required.filter((i) => done.has(i.id)).length;
  return { done: n, total: required.length, pct: required.length ? Math.round((100 * n) / required.length) : 0 };
}

/** The scored or unscored round happening now, or the next one coming up. */
export function currentOrNextRound(today: string, rounds: Round[] = ROUNDS): Round | undefined {
  return rounds.find((r) => r.end >= today);
}

export function daysUntil(today: string, date: string): number {
  const a = Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10));
  const b = Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10));
  return Math.round((b - a) / 86_400_000);
}

/**
 * Paths for this cadet, in the order to work on them: everyone's core paths,
 * then the paths for their roles, then the OS paths for the next round.
 */
export function myPaths(roles: string[], today: string): Path[] {
  const ids: string[] = [];
  const add = (id: string) => {
    if (!ids.includes(id)) ids.push(id);
  };
  PATHS.filter((p) => p.forRoles.length === 0).forEach((p) => add(p.id));
  PATHS.filter((p) => p.forRoles.some((r) => roles.includes(r))).forEach((p) => add(p.id));
  currentOrNextRound(today)?.focusPaths.forEach(add);
  return ids.map((id) => PATHS.find((p) => p.id === id)).filter((p): p is Path => !!p);
}

/** The next few required items not yet done, across the given paths in order. */
export function nextUp(paths: Path[], done: Set<string>, count = 3) {
  const out: { path: Path; item: Path["items"][number] }[] = [];
  for (const path of paths) {
    for (const item of path.items) {
      if (!item.optional && !done.has(item.id)) out.push({ path, item });
      if (out.length >= count) return out;
    }
  }
  return out;
}
