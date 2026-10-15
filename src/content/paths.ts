import type { Path } from "./types";

/*
 * The learning catalog. This file is the one to edit when content changes.
 *
 * Rules (the tests in tests/catalog.test.ts enforce most of them):
 * - Item ids are permanent once the site is published. Never rename or reuse
 *   one; add a new item instead.
 * - Link to outside material. Do not copy it here. Prefer CP Toolkit and
 *   CyberPatriot's own material over other sources.
 * - Keep "what" to one or two plain sentences.
 *
 * Order for CP-19: the team started a week before Round 1, so "Start here"
 * is CP Toolkit's competition lessons and "Computer basics" comes after
 * Round 1. For a season that starts earlier, consider making Computer basics
 * a "core" path and moving it first.
 */

const TK = "https://cp-toolkit.pages.dev";
const NETACAD = "https://www.netacad.com/courses";

export const PATHS: Path[] = [
  {
    id: "start-here",
    name: "Start here",
    kind: "core",
    summary: "CP Toolkit's seven beginner lessons in order, then how to open an image. About 1½ hours.",
    forRoles: [],
    items: [
      {
        id: "fnd-what-cp",
        title: "What is CyberPatriot?",
        what: "How a round works: images, the scoring report, the README and the Cisco challenge.",
        source: "CP Toolkit",
        url: `${TK}/start-here/what-is-cyberpatriot/`,
        time: "8 min",
      },
      {
        id: "rnd-lose-points",
        title: "Things that lose points",
        what: "The changes that cost points, such as removing an authorized user or stopping a critical service.",
        source: "CP Toolkit",
        url: `${TK}/guides/things-that-lose-points/`,
        time: "6 min",
      },
      {
        id: "fnd-readme",
        title: "Reading the README",
        what: "Pull the authorized users, admins and critical services out of the README before changing anything.",
        source: "CP Toolkit",
        url: `${TK}/start-here/reading-the-readme/`,
        time: "6 min",
      },
      {
        id: "rnd-game-plan",
        title: "Round game plan",
        what: "The order to work in during a 4-hour round and who does what.",
        source: "CP Toolkit",
        url: `${TK}/start-here/round-game-plan/`,
        time: "5 min",
      },
      {
        id: "fnd-linux-terminal",
        title: "Linux terminal basics",
        what: "Move around folders, read files and run commands with sudo.",
        source: "CP Toolkit",
        url: `${TK}/start-here/linux-terminal-basics/`,
        time: "10 min",
      },
      {
        id: "fnd-powershell",
        title: "PowerShell basics",
        what: "Run PowerShell as administrator and use it to list users, services and settings.",
        source: "CP Toolkit",
        url: `${TK}/start-here/powershell-basics/`,
        time: "10 min",
      },
      {
        id: "rnd-scripts",
        title: "Using the scripts safely",
        what: "Audit mode versus apply mode, and why the README decides what is safe.",
        source: "CP Toolkit",
        url: `${TK}/start-here/using-the-scripts/`,
        time: "10 min",
        note: "Ask your coach before using any outside script in a scored round. Check the current Rules Book.",
      },
      {
        id: "fnd-vm-setup",
        title: "Check the computer requirements",
        what: "A 64-bit computer and VMware Workstation Pro, which is free.",
        source: "CyberPatriot",
        url: "https://www.uscyberpatriot.org/competition/technical-specifications",
        time: "10 min",
      },
      {
        id: "fnd-vm-video",
        title: "Open an image and start a round",
        what: "Watch the program office's video on opening an image and starting a round.",
        source: "CyberPatriot",
        url: "https://youtu.be/4UveDN7xn9I",
        time: "15 min",
      },
      {
        id: "fnd-glossary-quiz",
        title: "Glossary quiz",
        what: "Flashcards and a quiz on the words you'll see everywhere. Keep going until you score 80% or better.",
        source: "CP Toolkit",
        url: `${TK}/tools/glossary-quiz/`,
        time: "15 min",
      },
    ],
  },
  {
    id: "round-practice",
    name: "Round practice",
    kind: "core",
    summary: "Hands-on practice with your team before each scored round.",
    forRoles: [],
    items: [
      {
        id: "rnd-practice-round-test",
        title: "Open a Practice Round image",
        what: "On the computer you'll compete on, download and open one Practice Round image to prove it works. CyberPatriot asks every team to do this.",
        source: "Team task",
        time: "1 h",
        note: "The CP-19 Practice Round closes Oct 20.",
      },
      {
        id: "rnd-forensics-intro",
        title: "Forensics questions",
        what: "The common question types, and why you answer them before changing the image.",
        source: "CP Toolkit",
        url: `${TK}/guides/forensics-questions/`,
        time: "10 min",
      },
      {
        id: "rnd-practice-image",
        title: "Play a full practice image",
        what: "Play one practice image with your team from start to finish, following the game plan and checking the scoring report every 20 minutes.",
        source: "Team task",
        time: "4 h",
      },
    ],
  },
  {
    id: "computer-basics",
    name: "Computer basics",
    kind: "basics",
    summary: "For anyone new to Windows or Linux, especially Mac users. Planned for after Round 1.",
    forRoles: [],
    items: [
      {
        id: "fnd-windows-keys",
        title: "Windows keyboard shortcuts",
        what: "Win+R, Win+X, Ctrl+Shift+Esc and Alt+Tab. Mac users: Ctrl does what Cmd does on a Mac.",
        source: "Microsoft",
        url: "https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec",
        time: "15 min",
      },
      {
        id: "fnd-netacad-os",
        title: "Operating Systems Basics",
        what: "Cisco course. Start with the Windows and Linux modules; the mobile modules can wait.",
        source: "Cisco NetAcad",
        url: `${NETACAD}/operating-systems-basics`,
        time: "Course",
        note: "Your NetAcad instructor assigns this. Counts toward the Basic Cyber Badge NetAcad option with the next two courses.",
      },
      {
        id: "fnd-netacad-hw",
        title: "Computer Hardware Basics",
        what: "Cisco course on computer parts. The Personal Computers module matters most.",
        source: "Cisco NetAcad",
        url: `${NETACAD}/computer-hardware-basics`,
        time: "About 6 h",
        note: "Basic Cyber Badge NetAcad option.",
      },
      {
        id: "fnd-netacad-intro-cyber",
        title: "Introduction to Cybersecurity",
        what: "Cisco course on threats, attacks and how to protect yourself and an organization.",
        source: "Cisco NetAcad",
        url: `${NETACAD}/introduction-to-cybersecurity`,
        time: "About 6 h",
        optional: true,
        note: "Basic Cyber Badge NetAcad option.",
      },
      {
        id: "fnd-ubuntu-cli",
        title: "Command line for beginners",
        what: "More terminal practice in a guided tutorial.",
        source: "Ubuntu",
        url: "https://ubuntu.com/tutorials/command-line-for-beginners",
        time: "1 h",
        optional: true,
      },
      {
        id: "fnd-bandit",
        title: "Terminal practice game",
        what: "OverTheWire Bandit levels 0 to 5. Each level teaches one command by making you use it.",
        source: "OverTheWire",
        url: "https://overthewire.org/wargames/bandit/",
        time: "1–2 h",
        optional: true,
      },
    ],
  },
  {
    id: "windows",
    name: "Windows 10/11",
    kind: "os",
    summary: "The Windows desktop image. Work through the CP Toolkit checklist in this order.",
    forRoles: ["windows"],
    items: [
      { id: "win-before", title: "Before you touch anything", what: "Read the README, answer forensics questions first and take notes.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#0-before-you-touch-anything`, time: "15 min" },
      { id: "win-users", title: "Users and groups", what: "Remove unauthorized users, fix admin rights and set passwords.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#2-users-and-groups`, time: "30 min" },
      { id: "win-policies", title: "Password, lockout and local policies", what: "Set password length, history and lockout, then the local security options.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#3-account-policies-passwords-and-lockout`, time: "45 min" },
      { id: "win-defender-firewall", title: "Defender and firewall", what: "Turn on Microsoft Defender protections and the firewall for every profile.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#5-microsoft-defender-antivirus`, time: "30 min" },
      { id: "win-updates-services", title: "Updates and services", what: "Turn on updates and stop risky services the README does not need.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#7-windows-update`, time: "30 min" },
      { id: "win-features-remote", title: "Features, remote access and shares", what: "Remove risky Windows features, lock down Remote Desktop and check shared folders.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#9-windows-features`, time: "30 min" },
      { id: "win-prohibited", title: "Prohibited software and files", what: "Find and remove hacking tools, games and media files the README does not allow.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#12-prohibited-software`, time: "30 min" },
      { id: "win-backdoors", title: "Backdoors and malware", what: "Look for startup entries, scheduled tasks and other ways an attacker gets back in.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#14-backdoors-and-malware`, time: "45 min" },
      { id: "win-final", title: "Browsers, critical services and final checks", what: "Secure the browsers, harden the services the README lists and run the final checks.", source: "CP Toolkit", url: `${TK}/checklists/windows-10-11/#16-web-browsers`, time: "30 min" },
      { id: "win-ms-security", title: "Go deeper: Windows security docs", what: "Look up any setting you did not understand in Microsoft's documentation.", source: "Microsoft", url: "https://learn.microsoft.com/en-us/windows/security/", time: "As needed", optional: true },
    ],
  },
  {
    id: "windows-server",
    name: "Windows Server",
    kind: "os",
    summary: "Windows Server 2016–2022, including domain controllers. Do the Windows 10/11 path first.",
    forRoles: ["server"],
    items: [
      { id: "srv-dc", title: "Is this a domain controller?", what: "Learn how to tell, and what you must never turn off on one.", source: "CP Toolkit", url: `${TK}/checklists/windows-server/#1-is-this-a-domain-controller`, time: "20 min" },
      { id: "srv-users", title: "Users, groups and password policy", what: "Apply the Windows user and password steps on a server and in Active Directory.", source: "CP Toolkit", url: `${TK}/checklists/windows-server/#2-users-and-groups`, time: "45 min" },
      { id: "srv-audit", title: "Audit policy, user rights and security options", what: "Set auditing and user rights the way a server needs them.", source: "CP Toolkit", url: `${TK}/checklists/windows-server/#4-audit-policy-user-rights-and-security-options`, time: "45 min" },
      { id: "srv-roles", title: "Services, roles and features", what: "Remove roles the README does not list and harden the ones it does.", source: "CP Toolkit", url: `${TK}/checklists/windows-server/#7-roles-and-features`, time: "45 min" },
      { id: "srv-final", title: "Remote access and final checks", what: "Lock down remote access and run the final checks.", source: "CP Toolkit", url: `${TK}/checklists/windows-server/#8-remote-access`, time: "30 min" },
    ],
  },
  {
    id: "linux-mint",
    name: "Linux Mint",
    kind: "os",
    summary: "The Linux Mint image. Do Linux terminal basics in Start here first.",
    forRoles: ["linux"],
    items: [
      { id: "mint-before", title: "Before you touch anything", what: "Read the README, answer forensics questions first and take notes.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#0-before-you-touch-anything`, time: "15 min" },
      { id: "mint-users", title: "Users and groups", what: "Remove unauthorized users, fix sudo and admin groups and set passwords.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#2-users-and-groups`, time: "30 min" },
      { id: "mint-passwords", title: "Password and lockout policy", what: "Set password rules and account lockout.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#3-password-and-lockout-policy`, time: "45 min" },
      { id: "mint-firewall-updates", title: "Firewall and updates", what: "Turn on UFW without blocking critical services, then update the system.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#4-firewall-ufw`, time: "30 min" },
      { id: "mint-services-software", title: "Services, prohibited software and files", what: "Stop services the README does not need and remove prohibited software and files.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#6-services`, time: "45 min" },
      { id: "mint-ssh-sysctl", title: "SSH and kernel settings", what: "Harden SSH if it is installed and set safe kernel network settings.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#9-ssh-server-only-if-installed`, time: "45 min" },
      { id: "mint-perms-sudo", title: "File permissions and sudo rules", what: "Fix risky file permissions and sudo rules.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#11-file-permissions`, time: "30 min" },
      { id: "mint-backdoors", title: "Backdoors and malware", what: "Check cron jobs, startup scripts and hidden accounts.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#13-backdoors-and-malware`, time: "45 min" },
      { id: "mint-final", title: "Critical services and final checks", what: "Harden only the services the README lists, then run the final checks.", source: "CP Toolkit", url: `${TK}/checklists/linux-mint/#16-critical-services-only-what-the-readme-lists`, time: "30 min" },
      { id: "mint-service-hardening", title: "Go deeper: Linux service hardening", what: "Learn to harden web, database, FTP and Samba services.", source: "CP Toolkit", url: `${TK}/guides/linux-service-hardening/`, time: "1 h", optional: true },
      { id: "mint-netacad-linux", title: "Linux Unhatched", what: "Free 8-hour Cisco course on Linux basics.", source: "Cisco NetAcad", url: `${NETACAD}/linux-unhatched`, time: "8 h course", optional: true },
    ],
  },
  {
    id: "debian",
    name: "Debian",
    kind: "os",
    summary: "The Debian image. Most steps match Linux Mint, so do that path first.",
    forRoles: ["linux"],
    items: [
      { id: "deb-differences", title: "What is different from Mint", what: "Read the Debian checklist's notes on where it differs from Mint.", source: "CP Toolkit", url: `${TK}/checklists/debian/`, time: "20 min" },
      { id: "deb-users-passwords", title: "Users, passwords and lockout", what: "Apply the user and password steps on Debian.", source: "CP Toolkit", url: `${TK}/checklists/debian/#2-users-and-groups`, time: "45 min" },
      { id: "deb-firewall-services", title: "Firewall, updates and services", what: "Set up the firewall, update and stop unneeded services.", source: "CP Toolkit", url: `${TK}/checklists/debian/#4-firewall`, time: "45 min" },
      { id: "deb-ssh-perms", title: "SSH, kernel, permissions, sudo and backdoors", what: "Work through the combined hardening section.", source: "CP Toolkit", url: `${TK}/checklists/debian/#9-ssh-kernel-permissions-sudo-rules-backdoors`, time: "1 h" },
      { id: "deb-final", title: "Critical services and final checks", what: "Harden the services the README lists and run the final checks.", source: "CP Toolkit", url: `${TK}/checklists/debian/#11-critical-services`, time: "30 min" },
      { id: "deb-handbook", title: "Go deeper: Debian Administrator's Handbook", what: "Look up anything you did not understand.", source: "Debian", url: "https://debian-handbook.info/browse/stable/", time: "As needed", optional: true },
    ],
  },
  {
    id: "networking",
    name: "Cisco networking",
    kind: "skill",
    summary: "The Cisco Networking Challenge: a quiz and a Packet Tracer exercise each round.",
    forRoles: ["network"],
    items: [
      { id: "net-pt-intro", title: "What is Packet Tracer?", what: "Read what the simulator does and download it with your NetAcad account.", source: "Cisco NetAcad", url: "https://www.netacad.com/cisco-packet-tracer", time: "20 min" },
      { id: "net-pt-course", title: "Getting Started with Cisco Packet Tracer", what: "Short free course on building your first network in the simulator.", source: "Cisco NetAcad", url: `${NETACAD}/getting-started-cisco-packet-tracer`, time: "Course" },
      { id: "net-toolkit-guide", title: "Cisco and Packet Tracer guide", what: "Read the toolkit's guide to the networking challenge.", source: "CP Toolkit", url: `${TK}/guides/cisco-networking/`, time: "45 min" },
      { id: "net-quiz", title: "Networking quiz and subnetting", what: "Practice until you can subnet without a calculator.", source: "CP Toolkit", url: `${TK}/tools/networking-quiz/`, time: "1 h" },
      { id: "net-content-course", title: "CyberPatriot content course", what: "Work through the season's Cisco content course. Your coach enrolls the team.", source: "CyberPatriot", url: "https://www.uscyberpatriot.org/training-materials/", time: "Ongoing" },
      { id: "net-pt-help", title: "Packet Tracer help pages", what: "Look up any Packet Tracer feature you get stuck on.", source: "Cisco NetAcad", url: "https://tutorials.ptnetacad.net/help/default/intro.htm", time: "As needed", optional: true },
      { id: "net-netacad-basics", title: "Networking Basics", what: "Self-paced Cisco course that goes deeper on networks.", source: "Cisco NetAcad", url: `${NETACAD}/networking-basics`, time: "Course", optional: true, note: "Intermediate Cyber Badge NetAcad option." },
    ],
  },
  {
    id: "forensics",
    name: "Forensics",
    kind: "skill",
    summary: "Forensics questions are worth points on every image and must be answered before you change things.",
    forRoles: ["forensics"],
    items: [
      { id: "for-helper", title: "Forensics helper tool", what: "Practice hashing files and decoding Base64, hex and simple ciphers.", source: "CP Toolkit", url: `${TK}/tools/forensics/`, time: "45 min" },
      { id: "for-cyberchef", title: "CyberChef", what: "Learn to chain decoding steps in CyberChef.", source: "GCHQ", url: "https://gchq.github.io/CyberChef/", time: "45 min", optional: true },
      { id: "for-practice", title: "Answer every forensics question on a practice image", what: "Do all the forensics questions on one practice image before anyone changes it.", source: "Team task", time: "1 h" },
    ],
  },
  {
    id: "captain",
    name: "Captain",
    kind: "role",
    summary: "For captains and co-captains: running the round and keeping the team on track.",
    forRoles: ["captain", "cocaptain"],
    items: [
      { id: "cap-roles", title: "Hand out team roles", what: "Give every teammate at least one role and have them pick it on their Me page.", source: "Team task", time: "15 min" },
      { id: "cap-game-plan", title: "Write your team's game plan", what: "Use the round game plan to decide who takes which image and when to check the score.", source: "CP Toolkit", url: `${TK}/start-here/round-game-plan/`, time: "30 min" },
      { id: "cap-timer", title: "Round timer", what: "Set up the round timer with your plan's phases before the round.", source: "CP Toolkit", url: `${TK}/tools/round-timer/`, time: "10 min" },
      { id: "cap-check-in", title: "Weekly progress check", what: "Once a week, ask each teammate what they finished and what they are stuck on.", source: "Team task", time: "15 min / week" },
    ],
  },
  {
    id: "secretary",
    name: "Secretary",
    kind: "role",
    summary: "For the team's secretary: keep the record that tells you what earned and lost points.",
    forRoles: ["secretary"],
    items: [
      { id: "sec-round-log", title: "Round log", what: "Learn the round log tool: record each change and the score after it.", source: "CP Toolkit", url: `${TK}/tools/round-log/`, time: "20 min" },
      { id: "sec-readme-notes", title: "README notes", what: "Practice writing the authorized users, admins and services from a README on one page for the team.", source: "CP Toolkit", url: `${TK}/start-here/reading-the-readme/`, time: "20 min" },
      { id: "sec-debrief", title: "After-round debrief", what: "After a round, write down what scored, what lost points and what to practice next.", source: "Team task", time: "30 min" },
    ],
  },
];

export const pathById = (id: string): Path | undefined => PATHS.find((p) => p.id === id);

export const ALL_ITEMS = PATHS.flatMap((p) => p.items.map((item) => ({ ...item, pathId: p.id })));
