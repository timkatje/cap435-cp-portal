import { pathById } from "../content/paths";
import { ROUNDS, SEASON } from "../content/season";
import { daysUntil } from "../lib/progress";
import { todayISO } from "../lib/store";

export function CalendarPage() {
  const today = todayISO();
  return (
    <>
      <h1>{SEASON.name}</h1>
      <p className="lede">{SEASON.confirmNote}</p>
      <ol className="rounds">
        {ROUNDS.map((r) => {
          const status = r.end < today ? "past" : r.start <= today ? "now" : "upcoming";
          const n = daysUntil(today, r.start);
          return (
            <li key={r.id} className={`round round-${status}`}>
              <div className="round-dates">
                <span className="tabular">{r.start}</span>
                <span className="small quiet">to {r.end}</span>
              </div>
              <div>
                <h2>
                  {r.name}{" "}
                  <span className={`chip ${status === "now" ? "ok" : "quiet"}`}>
                    {status === "past" ? "Done" : status === "now" ? "Open now" : `In ${n} day${n === 1 ? "" : "s"}`}
                  </span>{" "}
                  {!r.scored && <span className="chip quiet">Not scored</span>}
                </h2>
                <p className="small">Images: {r.images}</p>
                <p className="small">
                  Paths to study:{" "}
                  {r.focusPaths.map((id, i) => (
                    <span key={id}>
                      {i > 0 && ", "}
                      <a href={`#/path/${id}`}>{pathById(id)?.name ?? id}</a>
                    </span>
                  ))}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
