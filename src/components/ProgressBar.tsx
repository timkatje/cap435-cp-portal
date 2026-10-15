interface Props {
  done: number;
  total: number;
  label?: string;
}

export function ProgressBar({ done, total, label }: Props) {
  const pct = total ? Math.round((100 * done) / total) : 0;
  return (
    <div className="progress">
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={label ?? "Progress"}
      >
        <div className={`progress-fill${pct === 100 ? " complete" : ""}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-text">
        {done}/{total}
      </span>
    </div>
  );
}
