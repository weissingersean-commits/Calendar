# Homelight

A free, self-hosted family calendar for wall-mounted tablets. Connects to Google Calendar and iCloud, shows live weather, and runs as a PWA with no subscription required.

**Live app:** https://weissingersean-commits.github.io/Calendar/

---

## Features

- Month, Week, and Day calendar views
- Syncs with Google Calendar, iCloud, Outlook, or any iCal URL
- Live weather with 5-day forecast (auto-detects location)
- Create, edit, and delete events with 6 color categories
- Recurring events (daily, weekly, monthly, yearly)
- Event reminders via browser notifications
- Tasks checklist, grocery list, and weekly meal planner
- Photo screensaver with upload or URL import
- Dark and light themes
- Works offline (PWA with service worker)
- Free forever — no backend, no account, no subscription

---

## Setup on a Wall Tablet (Android)

### 1. Open the app
On your tablet, open Chrome and go to:
```
https://weissingersean-commits.github.io/Calendar/
```

### 2. Install as an app
Tap the **Install** button in the top bar, or open Chrome's menu (⋮) and tap **Add to Home Screen**. This gives you a full-screen app with no browser chrome.

### 3. Connect your calendar
Tap **📅** in the top bar → **+ Add Calendar Feed** → paste your iCal URL.

**Google Calendar:**
1. Open Google Calendar on desktop → click the ⚙ gear → Settings
2. Under **Settings for my calendars**, click your calendar
3. Scroll to **Integrate calendar** → copy the **Secret address in iCal format**
4. Paste that URL into Homelight

**iCloud Calendar:**
1. Open iCloud.com → Calendar → click the share icon next to your calendar
2. Enable **Public Calendar** → copy the link
3. Paste into Homelight (webcal:// links are converted to https:// automatically)

**Outlook:**
1. Open Outlook → Settings → View all Outlook settings → Calendar → Shared calendars
2. Publish your calendar → copy the ICS link
3. Paste into Homelight

Homelight syncs automatically every 15 minutes. Synced events are read-only — edit them in your calendar app and they'll update on the next sync.

### 4. Set your location
The weather widget will prompt for location on first load. Tap **Auto-Detect** or search for your city manually.

### 5. Keep it always on (Fully Kiosk Browser)
For a wall-mounted display, install **Fully Kiosk Browser** from the Play Store. It keeps the screen on 24/7 and restarts the app after power cuts. Open Settings → 🖥️ Wall-Mount Setup in the app for the full step-by-step guide with a QR code.

---

## Screensaver Photos

The screensaver shows a photo slideshow to prevent screen burn-in. Add photos two ways:

- **Upload:** Settings → Screensaver Photos → 📷 Upload from Device
- **URL import:** Paste direct image links (Google Photos, Dropbox, etc.) one per line

To get a direct link from Google Photos: open a photo → share → Create link → copy.

---

## Event Reminders

To receive browser notifications before events:
1. Open Settings → **Event Reminders** → **Enable Notifications** → grant permission
2. Choose how far in advance (5 min to 1 hour)

Works best on Android Chrome. Requires the browser tab to be open.

---

## Architecture

Single-file React app (`index.html`) with no build step. React 18 is loaded from CDN and JSX is compiled in-browser by Babel. All data is stored in `localStorage` with the prefix `hl4_`. Deployed on GitHub Pages.

| File | Purpose |
|------|---------|
| `index.html` | The entire app |
| `manifest.json` | PWA manifest for Add to Home Screen |
| `sw.js` | Service worker for offline support |

---

## Local Development

No build step needed. Just open `index.html` in a browser or serve with any static file server:

```bash
npx serve .
# or
python -m http.server 8080
```
