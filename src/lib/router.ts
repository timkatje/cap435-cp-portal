import { useSyncExternalStore } from "react";

/*
 * Tiny hash router: #/paths, #/path/windows, #/me ...
 * Hash links work on GitHub Pages without any server setup.
 */

function current(): string[] {
  const h = window.location.hash.replace(/^#\/?/, "");
  return h.split("/").filter(Boolean).map(decodeURIComponent);
}

let parts = current();
const listeners = new Set<() => void>();

window.addEventListener("hashchange", () => {
  parts = current();
  listeners.forEach((l) => l());
  window.scrollTo(0, 0);
});

export function useRoute(): string[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => parts,
  );
}
