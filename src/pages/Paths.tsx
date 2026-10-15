import { ProgressBar } from "../components/ProgressBar";
import { PATHS } from "../content/paths";
import { roleName } from "../content/roles";
import type { PathKind } from "../content/types";
import { pathProgress } from "../lib/progress";
import { doneIds, useAppState } from "../lib/store";

const GROUPS: { kind: PathKind; title: string; blurb: string }[] = [
  { kind: "core", title: "For everyone", blurb: "Every cadet does these, in this order." },
  { kind: "os", title: "Operating systems", blurb: "One path per competition image. Leads go deep; everyone else should know the basics." },
  { kind: "skill", title: "Challenges", blurb: "The parts of a round that aren't one operating system." },
  { kind: "role", title: "Team roles", blurb: "For cadets holding these jobs on their team." },
  { kind: "basics", title: "Computer basics", blurb: "General computer skills for anyone who needs them." },
];

export function PathsPage() {
  const state = useAppState();
  const done = doneIds(state);
  return (
    <>
      <h1>Learning paths</h1>
      <p className="lede">
        Each path is an ordered list of links to the best material we found. Tick an item when you have finished it.
      </p>
      {GROUPS.map((g) => (
        <section key={g.kind}>
          <h2>{g.title}</h2>
          <p className="small">{g.blurb}</p>
          <ul className="path-list">
            {PATHS.filter((p) => p.kind === g.kind).map((p) => {
              const pr = pathProgress(p, done);
              const mine = p.forRoles.some((r) => state.profile.roles.includes(r));
              return (
                <li key={p.id}>
                  <a className="path-card" href={`#/path/${p.id}`}>
                    <span className="path-name">
                      {p.name} {mine && <span className="chip ok">Your role</span>}
                    </span>
                    <span className="small">{p.summary}</span>
                    {p.forRoles.length > 0 && (
                      <span className="small quiet">For: {p.forRoles.map(roleName).join(", ")}</span>
                    )}
                    <ProgressBar done={pr.done} total={pr.total} label={`${p.name} progress`} />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
