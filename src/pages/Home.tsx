import { SITE } from "../config/site";
import { ItemRow } from "../components/ItemRow";
import { ProgressBar } from "../components/ProgressBar";
import { pathById } from "../content/paths";
import { currentOrNextRound, daysUntil, myPaths, nextUp, pathProgress } from "../lib/progress";
import { doneIds, todayISO, useAppState } from "../lib/store";

export function Home() {
  const state = useAppState();
  const today = todayISO();
  const done = doneIds(state);
  const { profile } = state;
  const team = SITE.teams.find((t) => t.id === profile.teamId);
  const paths = myPaths(profile.roles, today);
  const next = nextUp(paths, done, 3);
  const round = currentOrNextRound(today);
  const sinceReport = state.lastReportOn ? daysUntil(state.lastReportOn, today) : null;

  return (
    <>
      <section className="hero">
        <h1>{team ? `${team.name}: what to learn next` : "Learn what each round needs, at your own pace"}</h1>
        <p className="lede">
          Work through the paths below, tick items off as you finish them, and report your progress to your leaders
          once a week.
        </p>
      </section>

      {!profile.teamId && (
        <div className="callout">
          <strong>First time here?</strong> Pick your team and roles on the <a href="#/me">Me page</a> so this page
          shows the right paths.
        </div>
      )}

      {round && <RoundCard today={today} roundId={round.id} />}

      <section>
        <h2>Up next</h2>
        {next.length ? (
          <ul className="items">
            {next.map(({ path, item }) => (
              <ItemRow key={item.id} item={item} pathName={path.name} />
            ))}
          </ul>
        ) : (
          <p>Every required item in your paths is done. Pick an optional item or help a teammate.</p>
        )}
      </section>

      <section>
        <h2>Your paths</h2>
        <ul className="path-list">
          {paths.map((p) => {
            const pr = pathProgress(p, done);
            return (
              <li key={p.id}>
                <a className="path-card" href={`#/path/${p.id}`}>
                  <span className="path-name">{p.name}</span>
                  <span className="small">{p.summary}</span>
                  <ProgressBar done={pr.done} total={pr.total} label={`${p.name} progress`} />
                </a>
              </li>
            );
          })}
        </ul>
        <p className="small">
          <a href="#/paths">See all paths</a>
        </p>
      </section>

      {profile.teamId && (sinceReport === null || sinceReport >= 7) && (
        <div className="callout">
          {sinceReport === null ? "You haven't reported your progress yet." : `Last report was ${sinceReport} days ago.`}{" "}
          <a href="#/me">Report my progress</a>
        </div>
      )}
    </>
  );
}

function RoundCard({ today, roundId }: { today: string; roundId: string }) {
  const round = currentOrNextRound(today);
  if (!round || round.id !== roundId) return null;
  const startsIn = daysUntil(today, round.start);
  const status =
    startsIn > 0 ? `starts in ${startsIn} day${startsIn === 1 ? "" : "s"}` : `is open now, through ${round.end}`;
  return (
    <section className="round-card" aria-label="Next round">
      <div>
        <p className="eyebrow">{round.scored ? "Next scored round" : "Practice"}</p>
        <h2>
          {round.name} {status}
        </h2>
        <p className="small">
          {round.start} to {round.end} · Images: {round.images}
        </p>
      </div>
      <div className="round-focus">
        <span className="small">Focus on</span>
        {round.focusPaths.map((id) => {
          const p = pathById(id);
          return p ? (
            <a key={id} className="chip link" href={`#/path/${id}`}>
              {p.name}
            </a>
          ) : null;
        })}
      </div>
    </section>
  );
}
