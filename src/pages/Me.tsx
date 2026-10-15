import { useRef, useState } from "react";
import { SITE } from "../config/site";
import { ROLES } from "../content/roles";
import type { RoleId } from "../content/types";
import { buildCode, buildFormUrl } from "../lib/report";
import {
  doneIds,
  emptyState,
  exportJSON,
  importJSON,
  setProfile,
  setState,
  todayISO,
  update,
  useAppState,
} from "../lib/store";

export function MePage() {
  const state = useAppState();
  const { profile } = state;
  const [msg, setMsg] = useState("");
  const [confirmErase, setConfirmErase] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const today = todayISO();
  const code = buildCode(state, today);
  const formUrl = buildFormUrl(SITE.progressFormUrl, { capid: profile.capid, team: profile.teamId, code });
  const capidOk = /^\d{4,7}$/.test(profile.capid);
  const ready = capidOk && !!profile.teamId;
  const doneCount = doneIds(state).size;

  const toggleRole = (id: RoleId, on: boolean) =>
    setProfile({ ...profile, roles: on ? [...profile.roles, id] : profile.roles.filter((r) => r !== id) });

  const markReported = () => update((s) => ({ ...s, lastReportOn: today }));

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setMsg("Progress code copied. Paste it where your leaders asked you to.");
      markReported();
    } catch {
      setMsg("Couldn't copy automatically. Select the code above and copy it.");
    }
  };

  const downloadBackup = () => {
    const blob = new Blob([exportJSON(state)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cyber-portal-backup-${today}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setMsg("Backup saved to your downloads.");
  };

  const loadBackup = async (file: File) => {
    const next = importJSON(await file.text());
    if (!next) {
      setMsg("That file isn't a backup from this site.");
      return;
    }
    setState(next);
    setMsg(`Backup loaded: ${Object.values(next.items).filter((i) => i.doneOn).length} items done.`);
  };

  return (
    <>
      <h1>Me</h1>
      <p className="lede">
        Everything on this page is saved only in this browser. Only your CAP ID, team, roles and the list of finished
        items are sent, and only when you press Report.
      </p>

      <section className="panel">
        <h2>Your details</h2>
        <div className="field">
          <label htmlFor="capid">CAP ID</label>
          <input
            id="capid"
            inputMode="numeric"
            autoComplete="off"
            maxLength={7}
            value={profile.capid}
            onChange={(e) => setProfile({ ...profile, capid: e.target.value.replace(/\D/g, "") })}
            aria-describedby="capid-help"
          />
          <p id="capid-help" className="small quiet">
            Only needed for reporting. Your name is never asked for or stored.
          </p>
        </div>
        <div className="field">
          <label htmlFor="team">Team</label>
          <select id="team" value={profile.teamId} onChange={(e) => setProfile({ ...profile, teamId: e.target.value })}>
            <option value="">Choose your team</option>
            {SITE.teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.division})
              </option>
            ))}
          </select>
        </div>
        <fieldset className="field">
          <legend>Roles your captain gave you</legend>
          <div className="role-grid">
            {ROLES.map((r) => (
              <label key={r.id} className="role">
                <input
                  type="checkbox"
                  checked={profile.roles.includes(r.id)}
                  onChange={(e) => toggleRole(r.id, e.target.checked)}
                />
                <span>
                  <strong>{r.name}</strong>
                  <span className="small quiet">{r.summary}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="panel">
        <h2>Report my progress</h2>
        <p>
          You've finished <strong>{doneCount}</strong> item{doneCount === 1 ? "" : "s"}.{" "}
          {state.lastReportOn ? `Last reported ${state.lastReportOn}.` : "You haven't reported yet."} Report once a week
          and before each round.
        </p>
        {!ready && <p className="callout">Enter your CAP ID and pick your team first.</p>}
        <label htmlFor="code" className="small">
          Your progress code
        </label>
        <textarea id="code" className="code" readOnly rows={3} value={code} onFocus={(e) => e.target.select()} />
        <div className="actions">
          {formUrl ? (
            <a
              className={`btn primary${ready ? "" : " disabled"}`}
              href={ready ? formUrl : undefined}
              aria-disabled={!ready}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => (ready ? markReported() : e.preventDefault())}
            >
              Open the progress form ↗
            </a>
          ) : null}
          <button type="button" className={`btn${formUrl ? "" : " primary"}`} disabled={!ready} onClick={copyCode}>
            Copy progress code
          </button>
        </div>
        {formUrl ? (
          <p className="small quiet">The form opens with your answers filled in. Check them and press Submit.</p>
        ) : (
          <p className="small quiet">Your leaders haven't connected a progress form yet. Copy the code and send it the way they asked.</p>
        )}
      </section>

      <section className="panel">
        <h2>Backup</h2>
        <p className="small">
          Clearing your browser or switching computers loses your ticks. Save a backup file now and then, and load it on
          a new computer.
        </p>
        <div className="actions">
          <button type="button" className="btn" onClick={downloadBackup}>
            Save backup file
          </button>
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            Load backup file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void loadBackup(f);
              e.target.value = "";
            }}
          />
        </div>
        <div className="actions">
          {confirmErase ? (
            <>
              <span className="small">Erase all progress and notes on this device?</span>
              <button
                type="button"
                className="btn danger"
                onClick={() => {
                  setState(emptyState());
                  setConfirmErase(false);
                  setMsg("Everything on this device was erased.");
                }}
              >
                Yes, erase
              </button>
              <button type="button" className="btn ghost" onClick={() => setConfirmErase(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" className="btn ghost" onClick={() => setConfirmErase(true)}>
              Erase everything on this device
            </button>
          )}
        </div>
      </section>

      <p role="status" className="status">
        {msg}
      </p>
    </>
  );
}
