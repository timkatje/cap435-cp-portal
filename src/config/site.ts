/*
 * Squadron settings. Edit this file to set up the site for your unit.
 * Nothing here is secret: it is all visible in the published site.
 */

export interface Team {
  /** Short code used in progress reports. Keep it stable for the season. */
  id: string;
  name: string;
  division: "Middle School" | "Open" | "All Service";
}

export const SITE = {
  /** Shown in the header. */
  unitName: "CAP 435",
  title: "Cyber Team Portal",

  /** Edit to match your actual teams. Cadets pick one on their Me page. */
  teams: [
    { id: "MS1", name: "Middle School Team 1", division: "Middle School" },
    { id: "HS1", name: "Team 1", division: "Open" },
    { id: "HS2", name: "Team 2", division: "Open" },
    { id: "AS1", name: "All Service Team 1", division: "All Service" },
  ] satisfies Team[] as Team[],

  /**
   * Progress check-in form (Microsoft Forms), separate from registration.
   *
   * To connect it, follow docs/LEADER-GUIDE.md: in Forms, choose
   * "Get pre-filled URL", type CAPID, TEAM and CODE as the three answers,
   * copy the link and paste it here. The site swaps those placeholder words
   * for the cadet's real answers.
   *
   * Leave it empty and the Report button copies the progress code instead.
   */
  progressFormUrl: "",
};
