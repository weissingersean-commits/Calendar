# CLAUDE.md — Homelight Project Context

## What This Is
Homelight is a free, self-hosted Skylight Calendar alternative. It's a single-page React app that runs on GitHub Pages as a PWA. Users install it on Android/iOS tablets as a family command center.

## Architecture
- **Single-file app**: Everything lives in `index.html` — React is loaded from CDN (unpkg), Babel compiles JSX in-browser
- **No build step**: No webpack, no npm, no node_modules. Just static files served by GitHub Pages
- **State management**: React useState + localStorage persistence (all keys prefixed `hl4_`)
- **Styling**: Inline styles with a theme context system (dark/light themes)
- **APIs used**:
  - Open-Meteo (weather forecast, no API key needed): `api.open-meteo.com/v1/forecast`
  - Open-Meteo Geocoding (city search): `geocoding-api.open-meteo.com/v1/search`
  - Nominatim (reverse geocoding for auto-detect): `nominatim.openstreetmap.org/reverse`
- **Calendar sync**: Parses iCal (.ics) feeds via custom inline parser. Supports Google Calendar and iCloud public URLs
- **PWA**: `manifest.json` enables "Add to Home Screen" on mobile

## File Structure
```
index.html      — The entire app (React + all components + styles)
manifest.json   — PWA manifest for installable app experience
README.md       — Setup guide and documentation
CLAUDE.md       — This file (project context for Claude Code)
```

## Key Features
- Multi-calendar sync (Google Calendar, iCloud, any iCal URL)
- Live weather with geolocation + manual city search
- Day/Week/Month calendar views with color-coded events
- Full event CRUD (add/edit/delete) with category system
- ICS export (download .ics to add events to phone)
- Tasks and grocery checklists
- Weekly meal planner
- Photo screensaver with upload support (base64 in localStorage)
- Dark/Light theme toggle
- Auto-screensaver timer for wall-mounted tablets

## Theme System
Two themes defined in `THEMES` object: `dark` and `light`. All components use `useT()` hook to access current theme. Colors are referenced as `t.accent`, `t.text`, `t.card`, etc.

## Category Colors
Defined in `CATS` object: personal (blue), work (yellow), health (green), social (purple), errand (red), family (pink). Synced calendar events use `feedColor` from the feed config.

## Persistence
`useP(key, default)` hook wraps useState + localStorage. All keys prefixed `hl4_`. Important keys:
- `hl4_events` — array of event objects
- `hl4_todos` — array of task objects
- `hl4_grocery` — array of grocery items
- `hl4_meals` — object keyed by day-of-week (0-6)
- `hl4_feeds` — array of calendar feed configs
- `hl4_loc` — weather location {name, lat, lon}
- `hl4_theme` — "dark" or "light"
- `hl4_photos` — array of base64 image strings
- `hl4_ssDelay` — screensaver delay in minutes (0 = off)

## Event Object Shape
```js
{
  id: string,          // unique ID
  title: string,
  date: "YYYY-MM-DD",
  hour: number,        // 0-23
  minute: number,      // 0-59
  duration: number,    // hours (e.g. 1.5)
  category: string,    // "personal"|"work"|"health"|"social"|"errand"|"family"|"synced"
  location: string,    // optional
  synced: boolean,     // true = from iCal feed (read-only)
  feedId: string,      // which feed it came from (if synced)
  feedColor: string,   // hex color from feed config (if synced)
}
```

## Deployment
GitHub Pages from the `main` branch, root folder. Repo: `weissingersean-commits/Calendar`

## Fonts
- Display/body: Outfit (Google Fonts)
- Monospace/clock: JetBrains Mono (Google Fonts)

## Important Notes
- App starts blank (no sample data) — users add their own content
- Synced events are read-only in the UI
- iCal sync auto-refreshes every 15 minutes
- Photos stored as base64 in localStorage (size-limited)
- CORS proxy may be needed for some calendar feeds (corsproxy.io)
- No backend — everything is client-side
