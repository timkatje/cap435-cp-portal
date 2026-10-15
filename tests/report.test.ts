import { buildCode, buildFormUrl, findCodes, latestByCapid, parseCode } from "../src/lib/report";
import { emptyState, type State } from "../src/lib/store";

const sample = (): State => ({
  ...emptyState(),
  profile: { capid: "123456", lastName: "O'Brien", grade: "C/SSgt", teamId: "HS1", roles: ["linux", "captain"] },
  items: {
    "fnd-readme": { doneOn: "2026-10-10", note: "private" },
    "fnd-what-cp": { doneOn: "2026-10-09" },
    "win-users": { note: "not done yet" },
  },
});

describe("progress codes", () => {
  it("round-trips through build and parse", () => {
    const code = buildCode(sample(), "2026-10-15");
    expect(code).toBe("CPP1;c=123456;n=O%27Brien;g=C%2FSSgt;t=HS1;r=captain,linux;d=20261015;i=fnd-readme,fnd-what-cp");
    expect(parseCode(code)).toEqual({
      capid: "123456",
      lastName: "O'Brien",
      grade: "C/SSgt",
      teamId: "HS1",
      roles: ["captain", "linux"],
      date: "2026-10-15",
      done: ["fnd-readme", "fnd-what-cp"],
    });
  });

  it("keeps names with spaces and accents intact", () => {
    const s = sample();
    s.profile.lastName = "De La Peña";
    s.profile.grade = "C/2d Lt";
    const r = parseCode(buildCode(s, "2026-10-15"))!;
    expect(r.lastName).toBe("De La Peña");
    expect(r.grade).toBe("C/2d Lt");
    expect(findCodes(`x\t${buildCode(s, "2026-10-15")}\n`)[0].lastName).toBe("De La Peña");
  });

  it("drops unknown grades and unsafe name characters", () => {
    const r = parseCode("CPP1;c=123456;n=%3Cb%3EBob;g=General;t=HS1;r=;d=20261015;i=")!;
    expect(r.lastName).toBe("bBob");
    expect(r.grade).toBe("");
    expect(parseCode("CPP1;c=123456;n=%E0%A4%A;t=HS1;r=;d=20261015;i=")!.lastName).toBe("");
  });

  it("never includes notes", () => {
    expect(buildCode(sample(), "2026-10-15")).not.toContain("private");
  });

  it("rejects codes without a valid CAP ID or date", () => {
    expect(parseCode("CPP1;c=;t=HS1;r=;d=20261015;i=")).toBeNull();
    expect(parseCode("CPP1;c=123456;t=HS1;r=;d=2026;i=")).toBeNull();
    expect(parseCode("hello")).toBeNull();
  });

  it("drops item ids with unexpected characters", () => {
    expect(parseCode("CPP1;c=123456;t=HS1;r=;d=20261015;i=ok-id,<script>,also-ok")?.done).toEqual(["ok-id", "also-ok"]);
  });

  it("finds codes in a CSV export and keeps the newest per cadet", () => {
    const csv = [
      "ID,Start time,CAPID,Team,Code",
      '1,10/10/2026,123456,HS1,"CPP1;c=123456;t=HS1;r=linux;d=20261010;i=fnd-readme"',
      '2,10/15/2026,123456,HS1,"CPP1;c=123456;t=HS1;r=linux;d=20261015;i=fnd-readme,fnd-what-cp"',
      '3,10/15/2026,654321,MS1,"CPP1;c=654321;t=MS1;r=;d=20261015;i="',
    ].join("\n");
    const latest = latestByCapid(findCodes(csv));
    expect(latest).toHaveLength(2);
    expect(latest.find((r) => r.capid === "123456")?.done).toEqual(["fnd-readme", "fnd-what-cp"]);
  });

  it("finds codes in tab-separated cells pasted from Excel", () => {
    const tsv = "1\t123456\tHS1\tCPP1;c=123456;t=HS1;r=;d=20261015;i=fnd-readme\n";
    expect(findCodes(tsv)).toHaveLength(1);
  });
});

describe("pre-filled form links", () => {
  const values = {
    capid: "123456",
    lastName: "O'Brien",
    grade: "C/SSgt",
    team: "HS1",
    code: "CPP1;c=123456;t=HS1;r=;d=20261015;i=a,b",
  };

  it("replaces the placeholder answers and keeps other parameters", () => {
    const tpl =
      "https://forms.office.com/Pages/ResponsePage.aspx?id=FORMID&r1a=CAPID&r2b=TEAM&r3c=CODE&r4d=LASTNAME&r5e=GRADE";
    const url = new URL(buildFormUrl(tpl, values)!);
    expect(url.searchParams.get("r4d")).toBe("O'Brien");
    expect(url.searchParams.get("r5e")).toBe("C/SSgt");
    expect(url.searchParams.get("id")).toBe("FORMID");
    expect(url.searchParams.get("r1a")).toBe("123456");
    expect(url.searchParams.get("r2b")).toBe("HS1");
    expect(url.searchParams.get("r3c")).toBe(values.code);
  });

  it("keeps quotes that Forms puts around answers", () => {
    const tpl = "https://forms.office.com/Pages/ResponsePage.aspx?id=X&r1a=%22CAPID%22";
    expect(new URL(buildFormUrl(tpl, values)!).searchParams.get("r1a")).toBe('"123456"');
  });

  it("refuses empty or non-https templates", () => {
    expect(buildFormUrl("", values)).toBeNull();
    expect(buildFormUrl("http://example.com/?a=CAPID", values)).toBeNull();
    expect(buildFormUrl("javascript:alert(1)", values)).toBeNull();
  });
});
