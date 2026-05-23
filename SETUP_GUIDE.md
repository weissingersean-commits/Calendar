# Homelight Setup Guide

**Homelight** is a free family calendar that runs right in your web browser — no account needed, no app store, no subscription.

**Live app:** https://weissingersean-commits.github.io/Calendar/

---

## Step 1 — Open the App

On your phone, tablet, or computer, open **Chrome** and go to:

**https://weissingersean-commits.github.io/Calendar/**

---

## Step 2 — Install It as an App (Recommended)

Installing makes it feel like a real app with no browser bar. Works on phones, tablets, and desktop computers.

### On Android or iPhone
1. Open Chrome and go to the app URL above
2. Tap the **three dots menu (⋮)** in the top right
3. Tap **Add to Home Screen**
4. Tap **Add**

It will appear on your home screen like any other app.

### On a Windows or Mac Computer
1. Open Chrome and go to the app URL above
2. Look in the address bar for a small **monitor icon with a download arrow** (far right side)
3. Click it → click **Install**

It will appear in your Start menu (Windows) or Applications folder (Mac). Search "Homelight" or "Calendar" if you can't find it right away.

---

## Step 3 — Connect Your Google Calendar

This syncs your existing Google Calendar events into Homelight automatically.

**You'll need to do this on a computer (not your phone):**

1. Open **Google Calendar** at calendar.google.com
2. Click the ⚙ **gear icon** in the top right → click **Settings**
3. On the left side, click your calendar name (under "Settings for my calendars")
4. Scroll down until you see **"Integrate calendar"**
5. Find **"Secret address in iCal format"** and click **Copy**

**Now back in Homelight (phone, tablet, or computer):**

6. Click or tap the **📅 calendar icon** in the top bar
7. Click **+ Add Calendar Feed**
8. Give it a name (e.g. "My Google Calendar") and pick a color
9. Paste the link you copied
10. Click **Add**

Your events will appear within a minute. Homelight refreshes automatically every 15 minutes.

> **Note:** Events from Google Calendar are view-only in Homelight. To add or change events, do it in Google Calendar — it will update in Homelight on the next sync. You can also tap **Refresh All** in the 📅 panel to sync immediately.

---

## Step 4 — Connect Your Apple Calendar (iCloud)

**On your iPhone or Mac:**

1. Open the **Calendar** app
2. Tap the **ⓘ** info button next to the calendar you want to share
3. Turn on **Public Calendar**
4. Tap **Share Link** and copy it

**In Homelight:**

5. Click or tap **📅** → **+ Add Calendar Feed**
6. Give it a name, pick a color, and paste the link
7. Click **Add**

The `webcal://` in Apple's link is converted to `https://` automatically.

> **Note:** Like Google Calendar, Apple Calendar events are view-only in Homelight.

---

## Step 5 — Connect Outlook / Microsoft 365 (Optional)

1. Open **Outlook** → Settings → View all Outlook settings → **Calendar** → Shared calendars
2. Under **Publish a calendar**, select your calendar and set permissions to "Can view all details"
3. Click **Publish** → copy the **ICS** link
4. In Homelight, click **📅** → **+ Add Calendar Feed** → paste the URL

---

## Troubleshooting Calendar Feeds

If a feed loads with an error or shows no events, try adding `https://corsproxy.io/?` in front of the URL. For example:

```
https://corsproxy.io/?https://calendar.google.com/calendar/ical/...
```

Some calendar providers block direct browser requests, and this proxy works around that.

---

## Adding Events Manually

- Click **+ Event** in the top bar
- Or click any time slot in the **Day** or **Week** view to add an event at that time
- Fill in the title, date, time, duration, and category
- Click **Add Event**

---

## Voice Assistant (Ask Homelight)

Homelight has a built-in voice assistant powered by Google Gemini AI. You can speak naturally to add events, tasks, and grocery items.

### Setting Up the Voice Assistant

1. Go to **Settings (⚙)** → scroll down to **AI Voice Assistant**
2. Get a free API key at **aistudio.google.com** → click **Get API Key** → **Create API Key**
3. Copy the key and paste it into the **Gemini API Key** field in Settings
4. Click **Set Key**

> **Note:** The Google AI Studio key is free and will never charge you — it only rate-limits if you use it very heavily.

### Using the Voice Assistant

1. Click **🎤 Ask** in the top bar
2. Speak naturally — for example:
   - *"Add a dentist appointment on June 3rd at 2pm"*
   - *"Add milk to the grocery list"*
   - *"Add pick up dry cleaning to my task list"*
3. Homelight will confirm what it did and the dialog will close automatically

You can also type in the text box if you prefer not to speak.

---

## Getting Around

| Action | How |
|---|---|
| Switch views | Click **Day / Week / Month** at the top |
| Go forward or back | **Swipe left or right** on the calendar (or use the ‹ › arrows) |
| Jump to a specific day | Click any day in Month view |
| See today | Click the **Today** button |
| Search for an event | Click **🔍 Search** in the top bar |
| Hide the sidebar | Click the **▶ button** in the top right corner |

---

## Other Features Worth Knowing

- **Tasks & Grocery List** — in the right sidebar, switch between Tasks, Grocery, and Meals tabs
- **Screensaver** — click **🖼** in the top bar to preview it; set a timer in Settings to have it turn on automatically when the screen is idle
- **Weather** — shows automatically based on your location; you can also search for a city manually
- **Event Reminders** — get browser notifications before events (set up in Settings → Event Reminders)
- **Color Categories** — Personal, Work, Health, Social, Errand, and Family, each with its own color shown in the legend at the bottom of the sidebar

---

## Settings Reference

Click the **⚙ gear icon** in the top bar to open Settings.

| Setting | What it does |
|---|---|
| Theme | Dark or Light |
| Week Starts On | Sunday or Monday |
| Auto-Screensaver | How long before the screensaver turns on automatically (off by default) |
| Event Reminders | Browser notification lead time for upcoming events |
| Screensaver Photos | Upload photos or add them by URL for the slideshow |
| AI Voice Assistant | Enter your Gemini API key to enable the voice assistant |
| Install as App | Installs Homelight as a PWA on your current device |
| Wall-Mount Setup | Step-by-step guide for setting up on a wall-mounted tablet |

---

## Wall-Mounted Tablet Setup

For a tablet mounted on the wall as a family command center:

1. Install Homelight as an app (see Step 2 above)
2. Connect your calendars (Steps 3–5)
3. Install **Fully Kiosk Browser** from the Play Store (Android only)
   - Keeps the screen on 24/7
   - Restarts the app automatically after power cuts
4. Open **Settings → 🖥 Wall-Mount Setup** inside the app for the complete Fully Kiosk step-by-step guide

---

## Feedback

If something feels confusing, is missing, or doesn't work the way you expect — write it down and let me know! Your feedback helps make this better for everyone.
