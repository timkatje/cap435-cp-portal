# Notes for Claude

Static training site for a CAP squadron's CyberPatriot teams. Vite + React +
TypeScript, published to GitHub Pages. See `docs/PLAN.md` for scope and phases.

## Hard rules

- **No personal data.** Never add fields for names, emails, phone numbers or
  addresses. The only cadet data is CAP ID, team id and role ids.
- **No server, no tracking.** No analytics, cookies, external fonts, CDNs or
  network calls. The production build has a strict CSP (`vite.config.ts`).
- **Item ids in `src/content/paths.ts` are permanent.** They live in cadets'
  browsers and in past reports. Add new ids; never rename or reuse one.
- **Progress code format (`src/lib/report.ts`) is a contract** with stored form
  responses. Change it only by adding a new prefix (`CPP2;`) and keeping the
  old parser.
- **Link to outside material; don't copy it.** CP Toolkit content has no license
  grant.
- No messaging features of any kind (CPP).

## Commands

- `npm test`: catalog, report and storage checks (vitest)
- `npm run build`: type-check and build into `dist/`
- `npm run dev`: local dev server

## Style

Plain, short sentences in UI text. Name things the way a cadet would. Verify
every new link resolves to a real page before adding it. NetAcad returns 200 for
unknown course URLs, so check the page title instead.
