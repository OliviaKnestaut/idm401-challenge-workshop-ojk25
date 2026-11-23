# CampusLife Event Filter

## Run

Open `index.html` through a local server (for example, `python3 -m http.server 8000`)
and visit `http://localhost:8000`.

## Component plan

- `index.html`: page structure, filter form, live result status, event list, and empty state
- `styles.css`: responsive layout, event cards, status colors, focus styles, and mobile breakpoints
- `script.js`: JSON loading, combined category/day filtering, live count updates, and reset behavior
- `events.json`: 12 sample events across five categories and five days

## Key decisions

- Used native `<select>` controls because they provide familiar keyboard behavior and screen-reader support with no dependencies.
- Filtered category and day together with one straightforward JavaScript function, keeping the state and UI in sync.
- Used `role="status"` plus `aria-live="polite"` for result announcements rather than moving focus on every filter change.
- Added a visible reset action after filtering begins and a dedicated clear-filters action in the empty state.
- Used semantic event `<article>` elements and `<time>` elements with machine-readable `datetime` values.
- Kept the event cards as static text because the brief does not require registration or a detail page.

## What I cut

- No framework or UI library
- No search field, because category and day are the defined filtering dimensions
- No remote API, routing, or persistence
- No card-level actions or detail modal
- No color-only category meaning: category names are printed alongside the color

## Accessibility check

### Keyboard-only run

1. Load the page.
2. Press Tab through the brand, category select, day select, and reset action.
3. Use the arrow keys and Enter/Space behavior in the native selects to change filters.
4. Verify that the result count is announced by a screen reader or status tool.
5. Choose a filter combination with no matches.
6. Verify that the empty state is readable, Tab reaches the Clear all filters button, and activation returns focus to the category select.
7. Repeat at 360px and at a desktop width.

### Automated check

Run Lighthouse in Chrome DevTools or axe DevTools on the local server. Target:

- Lighthouse Accessibility score: at least 90
- Axe: no serious or critical violations
- Record the score and findings in the deck notes; re-run after fixing any issue
