import type { Round } from "./types";

/**
 * CyberPatriot 19 (2026–27) schedule and image lineup.
 *
 * Source: the CP Toolkit season table (github.com/Ripper1004/CyberPatriot-Toolkit,
 * ROADMAP.md). The official CyberPatriot site and your coach's emails win if
 * they disagree. Update this file every season.
 */
export const SEASON = {
  name: "CyberPatriot 19 (2026–27)",
  confirmNote: "Dates and images can change. Your coach's emails from the CyberPatriot Program Office are the final word.",
};

export const ROUNDS: Round[] = [
  {
    id: "practice",
    name: "Practice Round",
    start: "2026-10-07",
    end: "2026-10-20",
    focusPaths: ["windows", "windows-server", "linux-mint"],
    images: "Windows 11, Windows Server 2022, Linux Mint 21",
    scored: false,
  },
  {
    id: "round1",
    name: "Round 1",
    start: "2026-10-22",
    end: "2026-10-25",
    focusPaths: ["windows", "linux-mint"],
    images: "Windows 11, Linux Mint 21",
    scored: true,
  },
  {
    id: "round2",
    name: "Round 2",
    start: "2026-11-12",
    end: "2026-11-15",
    focusPaths: ["windows", "windows-server", "debian"],
    images: "Windows 11, Windows Server 2022, Debian 12",
    scored: true,
  },
  {
    id: "state",
    name: "State Round",
    start: "2026-12-10",
    end: "2026-12-13",
    focusPaths: ["windows-server", "linux-mint", "debian"],
    images: "Windows Server 2022, Linux Mint 21, Debian 12",
    scored: true,
  },
  {
    id: "semifinals",
    name: "Semifinals",
    start: "2027-01-21",
    end: "2027-01-23",
    focusPaths: ["linux-mint", "windows-server", "debian"],
    images: "Linux Mint 21, Windows Server 2022, Debian 12 or FreeBSD (by tier)",
    scored: true,
  },
];
