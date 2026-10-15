# Leader guide

## 1. Publish the site on GitHub Pages (one time)

1. The repository must be **public** for free GitHub Pages. The site holds no
   personal data, so this is safe.
2. In the repository on GitHub: **Settings → Pages → Build and deployment →
   Source: GitHub Actions**.
3. Every change merged into `main` runs the checks, builds the site and publishes it
   at `https://<github-user>.github.io/cap435-cp-portal/`. You can watch it under
   the **Actions** tab.

If a check fails, nothing is published and the old site stays up.

## 2. Create the progress form (one time per season)

This is a **new form, separate from registration**. Cadets don't have wing
accounts, so the form must accept anyone with the link.

1. In Microsoft Forms (signed in with your wing account), create a form named
   **Progress check-in**.
2. Settings: **Anyone can respond**. Turn off *Record name*.
3. Add three questions, all **required**:

   | # | Question | Type |
   |---|---|---|
   | 1 | CAP ID | Text |
   | 2 | Team | Text |
   | 3 | Progress code | Text, **Long answer** |

4. Open the **…** menu at the top right and choose **Get pre-filled URL**.
   Type these exact words as the answers, then copy the link:
   - CAP ID: `CAPID`
   - Team: `TEAM`
   - Progress code: `CODE`
5. Paste the link into `src/config/site.ts` as `progressFormUrl`, then merge the
   change. The site swaps those placeholder words for each cadet's real answers.

If your Forms doesn't offer pre-filled links, leave `progressFormUrl` empty. The
site then shows a **Copy progress code** button, and cadets paste their code into
the form, or wherever you ask, by hand.

Anyone with the form link could submit a code. Reporting is on the honor system,
and that was a deliberate choice.

## 3. See your teams' progress

1. In Forms, open **Responses → Open results in Excel**.
2. Select all the cells and copy them. Or save the sheet as CSV.
3. On the site, open **Leaders** and paste the cells, or choose **Open CSV file**.

The table shows each cadet's newest report: team, roles, report date and percent
done in each path. Reports more than 14 days old are highlighted. Nothing you paste
is uploaded or saved. The table is built in your browser and disappears when you
leave the page.

## 4. Change teams, unit name or paths

- **Teams and unit name:** `src/config/site.ts`. Keep each team `id` short (letters
  and numbers) and don't change it mid-season, because it is stored in reports.
- **Paths and items:** `src/content/paths.ts`. The rules are at the top of the file.
  The most important rule: **never rename or reuse an item `id`**, because cadets'
  saved progress and past reports refer to it. To replace an item, add a new one
  with a new id and remove the old one.
- **Roles:** `src/content/roles.ts`.

You can edit these files right on GitHub (pencil icon). Propose the change on a
new branch, open a pull request, and the checks will tell you if something is wrong
before you merge.

## 5. Start a new season

1. Update `src/content/season.ts` with the new round dates and image lineup. Check
   them against the official CyberPatriot schedule and your coach emails.
2. Check the checklist links in `src/content/paths.ts` still work. The tests check
   that ids are unique and links use https, but not that pages still exist.
3. Create a fresh progress form, or clear the old responses, and update
   `progressFormUrl`.

## How cadets use it

1. Open the site and go to **Me**. Enter CAP ID, pick a team and tick the roles the
   captain gave them.
2. **Home** shows what to do next: the core paths, the paths for their roles and
   the paths for the next round.
3. Tick items as they finish them. A private "What I learned" note can go on any
   item, and it is never sent anywhere.
4. Once a week, and before each round, press **Report my progress** on **Me**.
5. Save a **backup file** now and then, especially on shared or school computers.
