# Project plan

A training resource for the squadron's CyberPatriot teams, built in small phases.
It points cadets to the right material in the right order and tracks progress.
It is **not** a messaging platform.

## Principles

1. **Training first.** Cadets teach themselves from ordered paths. Leaders see
   progress without chasing anyone.
2. **Minimal personal data, no databases.** Last name, grade, CAP ID, team and
   roles are the only things about a cadet that leave their device, and they go
   only to the wing's Microsoft 365. Never collected: first names, emails, phone
   numbers, addresses, birthdays, schools, family details, photos. If a central
   API is added later, it writes to the wing's M365 (Excel or a SharePoint
   list), not to a database of our own.
3. **Knowledge stays in each team.** Later phases that add team spaces keep each
   team's work away from other teams.
4. **Transparent for CPP.** No private messages, ever. Senior members share equal
   access.
5. **Link, don't copy.** Material belongs to its owners.
6. **Small phases.** Each phase builds only what the program needs then.

## Phases

### Phase 1: static training site (this repository, now)

- Learning paths: Start here (CP Toolkit's beginner lessons) and Round practice
  for everyone, then Computer basics (NetAcad and general skills, after Round 1
  this season), one path per
  competition image, Cisco networking, forensics, and paths for captain and
  secretary roles.
- Team roles, including captain and co-captain, picked by the cadet.
- Progress saved in the cadet's browser, with backup and restore.
- **Report my progress** opens a pre-filled Microsoft Form (separate from
  registration). Responses land in the wing's Microsoft 365.
- **Leaders** page builds a progress table from pasted responses, in the browser.
- Season calendar with the image lineup for each round.
- Hosted free on GitHub Pages. No server, no database, no Azure.

### Phase 2: team tools (needs a decision on where shared data lives)

- Captains see teammates' progress and assign roles and items.
- Different learning paths per cadet, directed by captains.
- Team round log and practice scores, visible only to that team and leaders.
- Group announcements only. Never one-to-one messages.

Options for shared data: an app in the wing's Microsoft 365 (needs guest
accounts and wing admin help), or a small hosted backend. Decide with the wing
before starting.

### Phase 3: Cyber Badge tracking (CAPP 60-41, July 2026)

- Learn, Lead and Launch requirements for Basic, Intermediate and Advanced,
  stored as rules so the STEM Badge can be added later.
- Career Exploration Overview checklist (10 of 12 sections plus Resources). No AI
  writing help, because it must be the cadet's own work.
- Ready-to-sign CAPF 2a packet.
- Leader-only at first, then shown to cadets.

### Phase 4: beyond one squadron

- Other squadrons. Optional wing sign-in for senior members.
- NetAcad progress, in-app registration if wing policy allows, STEM Badge.

## Open questions

1. Does the wing have rules about member data outside CAP systems? This matters
   from Phase 2 on. Phase 1 keeps data in browsers and the wing's own M365.
2. Which IT officer track documents can this project produce along the way?
3. Will a cyber officer be appointed? That affects badge sign-off in Phase 3.
4. What do the CP-19 rules say about using outside hardening scripts in scored
   rounds? Cadets are told to ask their coach first.
