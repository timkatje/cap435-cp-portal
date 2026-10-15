import { useState } from "react";
import type { Item } from "../content/types";
import { setDone, setNote, useAppState } from "../lib/store";

interface Props {
  item: Item;
  /** Show which path the item belongs to (used on the Home page). */
  pathName?: string;
}

export function ItemRow({ item, pathName }: Props) {
  const state = useAppState();
  const s = state.items[item.id];
  const done = !!s?.doneOn;
  const [showNote, setShowNote] = useState(false);
  const boxId = `done-${item.id}`;

  return (
    <li className={`item${done ? " is-done" : ""}`}>
      <input
        id={boxId}
        className="item-check"
        type="checkbox"
        checked={done}
        onChange={(e) => setDone(item.id, e.target.checked)}
      />
      <div className="item-body">
        <label htmlFor={boxId} className="item-title">
          {item.title}
        </label>
        <div className="item-meta">
          {pathName && <span className="chip">{pathName}</span>}
          <span className="chip">{item.source}</span>
          <span className="chip quiet">{item.time}</span>
          {item.optional && <span className="chip quiet">Optional</span>}
          {done && <span className="chip ok">Done {s?.doneOn}</span>}
        </div>
        <p className="item-what">{item.what}</p>
        {item.note && <p className="item-note">{item.note}</p>}
        <div className="item-actions">
          {item.url && (
            <a className="btn" href={item.url} target="_blank" rel="noopener noreferrer">
              Open<span className="visually-hidden"> {item.title}</span> ↗
            </a>
          )}
          <button type="button" className="btn ghost" aria-expanded={showNote} onClick={() => setShowNote((v) => !v)}>
            {s?.note ? "Edit what I learned" : "What I learned"}
          </button>
        </div>
        {showNote && (
          <div className="item-notebox">
            <label htmlFor={`note-${item.id}`} className="small">
              Private note. It stays on this device and is never sent in reports.
            </label>
            <textarea
              id={`note-${item.id}`}
              rows={3}
              maxLength={2000}
              defaultValue={s?.note ?? ""}
              onBlur={(e) => setNote(item.id, e.target.value)}
              placeholder="One or two sentences on what you learned or what confused you."
            />
          </div>
        )}
      </div>
    </li>
  );
}
