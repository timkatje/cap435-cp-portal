import type { Role } from "./types";

/**
 * Team roles. Captains hand these out at practice; cadets pick theirs on the
 * "Me" page. A cadet can hold more than one.
 */
export const ROLES: Role[] = [
  { id: "captain", name: "Team captain", summary: "Runs the round, hands out roles and checks on teammates' progress." },
  { id: "cocaptain", name: "Co-captain", summary: "Backs up the captain and takes over when they are out." },
  { id: "windows", name: "Windows lead", summary: "Owns the Windows 10/11 image during a round." },
  { id: "server", name: "Windows Server lead", summary: "Owns the Windows Server image, including domain controllers." },
  { id: "linux", name: "Linux lead", summary: "Owns the Linux Mint and Debian images." },
  { id: "network", name: "Networking lead", summary: "Leads the Cisco quiz and Packet Tracer challenge." },
  { id: "forensics", name: "Forensics lead", summary: "Answers forensics questions on every image." },
  { id: "secretary", name: "Secretary", summary: "Keeps the round log: every change made and what it did to the score." },
];

export const roleName = (id: string): string => ROLES.find((r) => r.id === id)?.name ?? id;
