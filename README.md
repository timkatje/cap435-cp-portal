# Cyber Team Portal

A training site for our CAP squadron's CyberPatriot teams. It puts the best free
material into ordered **learning paths**, lets cadets tick items off at their own
pace, and gives leaders a simple way to see progress.

- **No accounts, no server, no database.** Progress is saved in each cadet's browser.
- **Minimal personal data.** Cadets enter a last name, grade, CAP ID, team and roles.
  No first names, emails, phone numbers, addresses, birthdays or family details.
- **Reporting goes to the wing's Microsoft 365.** Cadets press *Report my progress*,
  which opens a pre-filled Microsoft Form. Leaders paste the responses into the
  *Leaders* page to see a progress table, built in their browser.
- **Links out, copies nothing.** The material belongs to CP Toolkit, CyberPatriot,
  Cisco NetAcad, Microsoft and the others linked from each item.

Unofficial tool. Not affiliated with or endorsed by the CyberPatriot Program Office.

## For leaders

See **[docs/LEADER-GUIDE.md](docs/LEADER-GUIDE.md)**: setting up the progress form,
publishing the site, editing paths and teams, and starting a new season.

The project plan and later phases are in **[docs/PLAN.md](docs/PLAN.md)**.

## What's where

| File | What it holds |
|---|---|
| `src/content/paths.ts` | The learning paths and every item in them |
| `src/content/season.ts` | Round dates and image lineup for the season |
| `src/content/roles.ts` | Team roles (captain, Linux lead, …) |
| `src/config/site.ts` | Unit name, team list and the progress form link |
| `src/pages/` | The pages: Home, Paths, Calendar, Me, Leaders, About |
| `src/lib/` | Saving progress, progress codes, the form link |
| `tests/` | Checks that run before every publish |

## Running it on your computer

Needs [Node.js](https://nodejs.org/) 22.

```bash
npm install
npm run dev      # opens a local copy at http://localhost:5173
npm test         # runs the checks
npm run build    # builds the site into dist/
```

## License

[MIT](LICENSE). Other squadrons are welcome to copy and adapt it.
