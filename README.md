# Homelight

A free, self-hosted family calendar for wall-mounted tablets. Connects to Google Calendar and iCloud, shows live weather, and runs as a PWA with no subscription required.

**Live app:** https://weissingersean-commits.github.io/Calendar/

---

## Features

- Month, Week, and Day calendar views
- Swipe left/right to navigate between days, weeks, or months
- Syncs with Google Calendar, iCloud, Outlook, or any iCal URL
- Multi-day events span across columns in both week and month views
- Live weather with current conditions
- Create, edit, and delete events with color categories and a color picker
- Recurring events (daily, weekly, monthly, yearly) with per-instance editing
- All-day and multi-day event support
- Event reminders via browser notifications
- Tasks checklist, grocery list, and weekly meal planner
- Photo screensaver with upload or URL import — shows clock and upcoming events
- Dark and light themes
- Week starts on Sunday or Monday (your choice)
- Sidebar collapse for full-screen calendar view
- Works offline (PWA with service worker)
- Free forever — no backend, no account, no subscription

---

## Connecting Your Calendar

### Google Calendar

1. Open **Google Calendar** on a desktop browser → click the ⚙ gear → **Settings**
2. In the left sidebar under **Settings for my calendars**, click the calendar you want to share
3. Scroll down to **Integrate calendar**
4. Copy the **Secret address in iCal format** (a long URL ending in `.ics`)
5. In Homelight, tap **📅** in the top bar → **+ Add Calendar Feed**
6. Paste the URL, give it a name, pick a color, and tap **Add**

> Homelight syncs every 15 minutes. Synced events are read-only — edit them in Google Calendar and they'll update on the next sync.

### Apple iCloud Calendar

1. Open **iCloud.com** → Calendar
2. Click the **share icon** (📡) next to the calendar you want to connect
3. Turn on **Public Calendar** → copy the link (it starts with `webcal://`)
4. In Homelight, tap **📅** → **+ Add Calendar Feed** → paste the URL
5. `webcal://` links are automatically converted to `https://`

### Outlook / Microsoft 365

1. Open **Outlook** → Settings → View all Outlook settings → **Calendar** → Shared calendars
2. Under **Publish a calendar**, select your calendar and set permissions to "Can view all details"
3. Click **Publish** → copy the **ICS** link
4. In Homelight, tap **📅** → **+ Add Calendar Feed** → paste the URL

### Any Other iCal Feed

Any public `.ics` URL works. Paste it directly into the Add Calendar Feed form.

> **CORS note:** If a feed won't load, prepend `https://corsproxy.io/?` to the URL. Some calendar providers block direct browser requests.

---

## Setup on a Wall Tablet (Android)

### 1. Open the app

On your tablet, open Chrome and go to:
```
https://weissingersean-commits.github.io/Calendar/
```

### 2. Install as an app (PWA)

Tap the **Install** button in the top bar, or open Chrome's menu (⋮) and tap **Add to Home Screen**. This gives you a full-screen app with no browser chrome.

### 3. Connect your calendar

Follow the steps above for Google Calendar, iCloud, or Outlook.

### 4. Set your location

The weather widget will prompt for location on first load. Tap **Auto-Detect** or search for your city manually.

### 5. Keep it always on (Fully Kiosk Browser)

For a wall-mounted display, install **Fully Kiosk Browser** from the Play Store. It keeps the screen on 24/7 and restarts the app after power cuts.

Open **Settings → 🖥 Wall-Mount Setup** inside the app for the complete step-by-step guide with exact menu paths and a QR code.

---

## Using the Calendar

### Navigation

- **Swipe left/right** on the calendar to go forward or back
- Use the **‹ ›** arrows in each view to navigate by day, week, or month
- Tap any day in month view to jump to that day's detail view
- Tap an hour slot in week or day view to add an event at that time

### Adding Events

- Tap **+ Event** in the top bar, or tap any hour slot in week/day view
- Fill in the title, time, duration, category, and optional color override
- Check **All-day block** for all-day or multi-day events — an End Date picker appears
- Set a **Repeat** frequency (daily, weekly, monthly, yearly) with an optional end date

### Editing Recurring Events

Tapping a recurring event shows a choice:
- **Just This One** — edits only that specific occurrence; the rest of the series is unchanged
- **All Events** — edits the master event, which updates every occurrence in the series

### Synced Events

Events pulled from Google Calendar or iCloud are read-only in Homelight. To change them, edit them in your calendar app — Homelight will pick up the change within 15 minutes (or tap **Refresh All** in the 📅 panel).

---

## Event Reminders

1. Open **Settings (⚙)** → **Event Reminders** → **Enable Notifications** → grant permission when Chrome asks
2. Choose how far in advance (5 min to 1 hour)

Reminders fire as native browser notifications. The app (or Chrome) must be running. Works best when installed as a PWA on Android Chrome. For phone notifications when you're away, rely on Google Calendar or iCloud's own notification system.

---

## Screensaver Photos

The screensaver shows a photo slideshow with a large clock and upcoming events overlay.

- **Upload:** Settings → Screensaver Photos → 📷 Upload from Device
- **URL import:** Paste direct image links (one per line) — Google Photos shared links, Dropbox direct links, etc.

To get a direct link from Google Photos: open a photo → Share → Create link → copy.

The auto-screensaver timer is set in **Settings → Auto-Screensaver**. Tap anywhere to dismiss it.

---

## Settings Reference

| Setting | What it does |
|---|---|
| Theme | Dark or Light |
| Week Starts On | Sunday or Monday |
| Auto-Screensaver | Idle time before screensaver activates (off by default) |
| Event Reminders | Browser notification lead time for upcoming events |
| Install as App | Installs Homelight as a PWA on your device |
| Wall-Mount Setup | Step-by-step Fully Kiosk Browser guide with QR code |
| Screensaver Photos | Upload or add photos by URL |

---

## Architecture

Single-file React app (`index.html`) with no build step. React 18 is loaded from CDN and JSX is compiled in-browser by Babel. All data is stored in `localStorage` with the prefix `hl4_`. Deployed on GitHub Pages.

| File | Purpose |
|---|---|
| `index.html` | The entire app |
| `manifest.json` | PWA manifest for Add to Home Screen |
| `sw.js` | Service worker for offline support and cache management |

---

## Local Development

No build step needed. Just open `index.html` in a browser or serve with any static file server:

```bash
npx serve .
# or
python -m http.server 8080
```
