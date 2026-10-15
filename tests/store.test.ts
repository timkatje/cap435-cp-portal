import { importJSON, parseState } from "../src/lib/store";
import { myPaths, nextUp, pathProgress, daysUntil, currentOrNextRound } from "../src/lib/progress";
import { pathById } from "../src/content/paths";

describe("saved data", () => {
  it("rejects anything that isn't a backup from this site", () => {
    expect(importJSON("not json")).toBeNull();
    expect(importJSON('{"v":2}')).toBeNull();
    expect(parseState(null)).toBeNull();
  });

  it("cleans bad values out of an imported backup", () => {
    const s = importJSON(
      JSON.stringify({
        v: 1,
        profile: { capid: "12ab", lastName: "Sm<i>th", grade: "Supreme Leader", teamId: "HS1", roles: ["linux", 5] },
        items: { "fnd-readme": { doneOn: "2026-10-10" }, "BAD ID!": { doneOn: "2026-10-10" }, "x-1": { doneOn: "yesterday" } },
      }),
    )!;
    expect(s.profile.capid).toBe("");
    expect(s.profile.lastName).toBe("Smith");
    expect(s.profile.grade).toBe("");
    expect(s.profile.roles).toEqual(["linux"]);
    expect(Object.keys(s.items)).toEqual(["fnd-readme"]);
  });
});

describe("progress", () => {
  it("counts only required items", () => {
    const path = pathById("computer-basics")!;
    const required = path.items.filter((i) => !i.optional);
    const optional = path.items.find((i) => i.optional)!;
    const pr = pathProgress(path, new Set([required[0].id, optional.id]));
    expect(pr).toEqual({ done: 1, total: required.length, pct: Math.round(100 / required.length) });
  });

  it("orders paths: core first, then role paths, then the next round's paths", () => {
    const ids = myPaths(["network"], "2026-10-15").map((p) => p.id);
    expect(ids.slice(0, 3)).toEqual(["start-here", "round-practice", "networking"]);
    expect(ids).toContain("windows");
    expect(ids[ids.length - 1]).toBe("computer-basics");
  });

  it("suggests the first unfinished required items", () => {
    const paths = [pathById("start-here")!];
    const first = paths[0].items[0].id;
    expect(nextUp(paths, new Set([first]), 1)[0].item.id).not.toBe(first);
  });

  it("counts days and finds the next round", () => {
    expect(daysUntil("2026-10-15", "2026-10-22")).toBe(7);
    expect(currentOrNextRound("2026-10-21")?.id).toBe("round1");
    expect(currentOrNextRound("2030-01-01")).toBeUndefined();
  });
});
