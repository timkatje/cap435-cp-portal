/** Where an item's material comes from. Shown as a small label on each item. */
export type Source =
  | "CyberPatriot"
  | "CP Toolkit"
  | "Cisco NetAcad"
  | "Microsoft"
  | "Ubuntu"
  | "Debian"
  | "OverTheWire"
  | "GCHQ"
  | "Team task";

export type RoleId =
  | "captain"
  | "cocaptain"
  | "windows"
  | "server"
  | "linux"
  | "network"
  | "forensics"
  | "secretary";

export interface Role {
  id: RoleId;
  name: string;
  /** One sentence on what this person does for the team. */
  summary: string;
}

export interface Item {
  /**
   * Stable id. It is saved in cadets' browsers and sent in progress reports,
   * so never change or reuse an id once the item has been published.
   * Add new items with new ids instead.
   */
  id: string;
  title: string;
  /** What to do, in one or two plain sentences. */
  what: string;
  source: Source;
  /** Link to the material. Team tasks may have none. */
  url?: string;
  /** Rough time, e.g. "20 min" or "6 h course". */
  time: string;
  /** Not required to finish the path. */
  optional?: boolean;
  /** Short note shown under the item, e.g. a badge credit or a warning. */
  note?: string;
}

export type PathKind = "core" | "os" | "skill" | "role" | "basics";

export interface Path {
  id: string;
  name: string;
  kind: PathKind;
  /** One sentence on who this path is for and why. */
  summary: string;
  /** Roles this path is recommended for. Empty means everyone. */
  forRoles: RoleId[];
  items: Item[];
}

export interface Round {
  id: string;
  name: string;
  /** ISO dates (YYYY-MM-DD), inclusive. */
  start: string;
  end: string;
  /** Operating system paths to focus on for this round. */
  focusPaths: string[];
  /** Image lineup as plain text. */
  images: string;
  scored: boolean;
}
