import { ALL_ITEMS, PATHS } from "../src/content/paths";
import { ROLES } from "../src/content/roles";
import { ROUNDS } from "../src/content/season";
import { SITE } from "../src/config/site";

describe("learning catalog", () => {
  it("has unique item ids in the allowed format", () => {
    const ids = ALL_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]{1,40}$/);
  });

  it("has unique path ids", () => {
    const ids = PATHS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only links to https pages", () => {
    for (const item of ALL_ITEMS) {
      if (item.url) expect(new URL(item.url).protocol, item.id).toBe("https:");
      else expect(item.source, `${item.id} has no link, so it must be a team task`).toBe("Team task");
    }
  });

  it("gives every path at least one required item", () => {
    for (const p of PATHS) expect(p.items.some((i) => !i.optional), p.id).toBe(true);
  });

  it("only names roles that exist", () => {
    const roleIds = new Set(ROLES.map((r) => r.id));
    for (const p of PATHS) for (const r of p.forRoles) expect(roleIds.has(r), `${p.id}: ${r}`).toBe(true);
  });

  it("points every role at at least one path", () => {
    for (const r of ROLES) expect(PATHS.some((p) => p.forRoles.includes(r.id)), r.id).toBe(true);
  });
});

describe("season", () => {
  it("lists rounds in date order with valid dates and real focus paths", () => {
    const pathIds = new Set(PATHS.map((p) => p.id));
    let prev = "";
    for (const r of ROUNDS) {
      expect(r.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(r.end >= r.start, r.id).toBe(true);
      expect(r.start >= prev, r.id).toBe(true);
      prev = r.start;
      for (const id of r.focusPaths) expect(pathIds.has(id), `${r.id}: ${id}`).toBe(true);
    }
  });
});

describe("site config", () => {
  it("uses team ids that fit in a progress code", () => {
    const ids = SITE.teams.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[A-Za-z0-9-]{1,16}$/);
  });
});
