// Homelight calendar proxy — Cloudflare Worker
// Fetches public iCal (.ics) feeds server-side and adds CORS headers so the
// browser app can read them. Deploy as a Worker named "homelight-ical".
//
// Usage: https://homelight-ical.<subdomain>.workers.dev/?url=<encoded ics url>

// Only proxy calendar providers (plus any URL ending in .ics) so this can't be
// used as an open proxy for arbitrary sites.
const ALLOWED_HOST_SUFFIXES = [
  'calendar.google.com',
  'icloud.com',
  'outlook.office365.com',
  'outlook.live.com',
  'calendar.yahoo.com',
];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: CORS });

    const raw = new URL(request.url).searchParams.get('url');
    if (!raw) return new Response('Missing ?url=', { status: 400, headers: CORS });

    let target;
    try {
      target = new URL(raw.replace(/^webcal:\/\//i, 'https://'));
    } catch {
      return new Response('Invalid url', { status: 400, headers: CORS });
    }
    const host = target.hostname.toLowerCase();
    const allowed = target.protocol === 'https:' && (
      ALLOWED_HOST_SUFFIXES.some(s => host === s || host.endsWith('.' + s)) ||
      target.pathname.toLowerCase().endsWith('.ics')
    );
    if (!allowed) return new Response('Host not allowed', { status: 403, headers: CORS });

    const upstream = await fetch(target.toString(), {
      headers: { 'User-Agent': 'Homelight-Calendar/1.0', Accept: 'text/calendar, */*' },
      cf: { cacheTtl: 300, cacheEverything: true },
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...CORS,
        'Content-Type': upstream.headers.get('Content-Type') || 'text/calendar; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  },
};
