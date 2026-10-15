import { ItemRow } from "../components/ItemRow";
import { ProgressBar } from "../components/ProgressBar";
import { pathById } from "../content/paths";
import { roleName } from "../content/roles";
import { pathProgress } from "../lib/progress";
import { doneIds, useAppState } from "../lib/store";

export function PathView({ id }: { id: string }) {
  const state = useAppState();
  const path = pathById(id);
  if (!path) {
    return (
      <section>
        <h1>Path not found</h1>
        <p>
          <a href="#/paths">See all paths</a>
        </p>
      </section>
    );
  }
  const pr = pathProgress(path, doneIds(state));
  return (
    <>
      <p className="small">
        <a href="#/paths">← All paths</a>
      </p>
      <h1>{path.name}</h1>
      <p className="lede">{path.summary}</p>
      {path.forRoles.length > 0 && <p className="small">Recommended for: {path.forRoles.map(roleName).join(", ")}</p>}
      <ProgressBar done={pr.done} total={pr.total} label={`${path.name} progress`} />
      <p className="small quiet">Optional items don't count toward the total.</p>
      <ol className="items">
        {path.items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ol>
    </>
  );
}
