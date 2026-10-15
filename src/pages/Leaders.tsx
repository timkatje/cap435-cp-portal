import { useMemo, useRef, useState } from "react";
import { SITE } from "../config/site";
import { PATHS } from "../content/paths";
import { roleName } from "../content/roles";
import { findCodes, latestByCapid, type Report } from "../lib/report";
import { daysUntil, pathProgress } from "../lib/progress";
import { todayISO } from "../lib/store";

/*
 * Leader view. The leader pastes or opens the progress form's responses;
 * the table is built in this browser and nothing is uploaded or saved.
 */
export function LeadersPage() {
  const [text, setText] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const today = todayISO();

  const reports = useMemo(() => latestByCapid(findCodes(text)), [text]);
  const teams = [...new Set(reports.map((r) => r.teamId))].sort();
  const shown = reports
    .filter((r) => !teamFilter || r.teamId === teamFilter)
    .sort((a, b) => a.teamId.localeCompare(b.teamId) || a.capid.localeCompare(b.capid));

  return (
    <>
      <h1>Leaders</h1>
      <p className="lede">
        See your teams' progress from the progress form's responses. The table is built in this browser. Nothing you
        paste here is uploaded or saved, and it disappears when you leave the page.
      </p>

      <section className="panel">
        <h2>1. Load the responses</h2>
        <p className="small">
          In Microsoft Forms, open the progress form's Responses and choose <em>Open results in Excel</em>. Then either
          select all the cells and paste them below, or save the sheet as CSV and open it here. Codes that cadets sent
          another way can be pasted too.
        </p>
        <label htmlFor="paste" className="visually-hidden">
          Paste responses
        </label>
        <textarea
          id="paste"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste spreadsheet cells or progress codes here"
        />
        <div className="actions">
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            Open CSV file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.txt,text/csv,text/plain"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) setText(await f.text());
              e.target.value = "";
            }}
          />
          {text && (
            <button type="button" className="btn ghost" onClick={() => setText("")}>
              Clear
            </button>
          )}
        </div>
        <p className="small" role="status">
          {text ? `Found ${reports.length} cadet${reports.length === 1 ? "" : "s"} (newest report for each CAP ID).` : ""}
        </p>
      </section>

      {reports.length > 0 && (
        <section>
          <h2>2. Progress</h2>
          <div className="field inline">
            <label htmlFor="tf">Team</label>
            <select id="tf" value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
              <option value="">All teams</option>
              {teams.map((t) => (
                <option key={t} value={t}>
                  {SITE.teams.find((x) => x.id === t)?.name ?? t}
                </option>
              ))}
            </select>
          </div>
          <div className="table-wrap">
            <table>
              <caption className="visually-hidden">Percent of required items done in each path</caption>
              <thead>
                <tr>
                  <th scope="col">CAP ID</th>
                  <th scope="col">Team</th>
                  <th scope="col">Roles</th>
                  <th scope="col">Reported</th>
                  {PATHS.map((p) => (
                    <th scope="col" key={p.id} className="num">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => (
                  <ReportRow key={r.capid} r={r} today={today} />
                ))}
              </tbody>
            </table>
          </div>
          <p className="small quiet">
            Percent of required items done. Reports older than 14 days are flagged. Cadets report on the honor system.
          </p>
        </section>
      )}
    </>
  );
}

function ReportRow({ r, today }: { r: Report; today: string }) {
  const done = new Set(r.done);
  const age = daysUntil(r.date, today);
  return (
    <tr>
      <th scope="row" className="tabular">
        {r.capid}
      </th>
      <td>{r.teamId}</td>
      <td className="small">{r.roles.map(roleName).join(", ") || "—"}</td>
      <td className={`tabular${age > 14 ? " stale" : ""}`}>
        {r.date}
        {age > 14 && <span className="visually-hidden"> (over 14 days old)</span>}
      </td>
      {PATHS.map((p) => {
        const pr = pathProgress(p, done);
        return (
          <td key={p.id} className={`num tabular pct-${pr.pct === 100 ? "full" : pr.pct === 0 ? "none" : "some"}`}>
            {pr.pct}%
          </td>
        );
      })}
    </tr>
  );
}
