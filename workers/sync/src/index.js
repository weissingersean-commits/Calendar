// Homelight cloud sync — Cloudflare Worker + D1
// Stores one JSON blob of family data per sync code, with optimistic
// concurrency (rev) and a daily snapshot kept for 30 days.
//
// Auth: the client sends its family sync code as a Bearer token. Only a
// SHA-256 hash of the code is stored, so the database never holds the code.
//
//   GET  /v1/state             -> { rev, updated, data }   (rev 0 + data null if new)
//   PUT  /v1/state             <- { baseRev, data }  -> { rev, updated } | 409 { rev, updated, data }
//   GET  /v1/snapshots         -> [{ day, updated, size }]
//   GET  /v1/snapshots/:day    -> { day, data }

const MAX_BYTES = 1_500_000;
const SNAPSHOT_DAYS = 30;
const CODE_RE = /^HL(-[A-Z2-9]{4}){4}$/;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Max-Age': '86400',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

async function familyId(code) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('homelight:' + code));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

const day = (ms, offsetDays = 0) => new Date(ms + offsetDays * 86400000).toISOString().slice(0, 10);

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const code = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim().toUpperCase();
    if (!CODE_RE.test(code)) return json({ error: 'Invalid sync code' }, 401);
    const fam = await familyId(code);
    const { pathname } = new URL(request.url);

    if (pathname === '/v1/state' && request.method === 'GET') {
      const row = await env.DB.prepare('SELECT rev, updated, data FROM state WHERE fam = ?').bind(fam).first();
      return json(row ? { rev: row.rev, updated: row.updated, data: JSON.parse(row.data) } : { rev: 0, updated: null, data: null });
    }

    if (pathname === '/v1/state' && request.method === 'PUT') {
      const text = await request.text();
      if (text.length > MAX_BYTES) return json({ error: 'Data too large' }, 413);
      let body;
      try { body = JSON.parse(text); } catch { return json({ error: 'Bad JSON' }, 400); }
      if (!Number.isInteger(body.baseRev) || typeof body.data !== 'object' || !body.data) return json({ error: 'Bad request' }, 400);

      const now = Date.now();
      const data = JSON.stringify(body.data);
      const res = body.baseRev === 0
        ? await env.DB.prepare('INSERT INTO state (fam, rev, data, updated) VALUES (?, 1, ?, ?) ON CONFLICT(fam) DO NOTHING').bind(fam, data, now).run()
        : await env.DB.prepare('UPDATE state SET rev = rev + 1, data = ?, updated = ? WHERE fam = ? AND rev = ?').bind(data, now, fam, body.baseRev).run();

      if (!res.meta.changes) {
        const row = await env.DB.prepare('SELECT rev, updated, data FROM state WHERE fam = ?').bind(fam).first();
        return json(row ? { rev: row.rev, updated: row.updated, data: JSON.parse(row.data) } : { rev: 0, updated: null, data: null }, 409);
      }

      // Keep the latest state of each day as that day's snapshot; prune old ones
      await env.DB.batch([
        env.DB.prepare('INSERT INTO snapshots (fam, day, data, updated) VALUES (?, ?, ?, ?) ON CONFLICT(fam, day) DO UPDATE SET data = excluded.data, updated = excluded.updated').bind(fam, day(now), data, now),
        env.DB.prepare('DELETE FROM snapshots WHERE fam = ? AND day < ?').bind(fam, day(now, -SNAPSHOT_DAYS)),
      ]);
      return json({ rev: body.baseRev + 1, updated: now });
    }

    if (pathname === '/v1/snapshots' && request.method === 'GET') {
      const { results } = await env.DB.prepare('SELECT day, updated, length(data) AS size FROM snapshots WHERE fam = ? ORDER BY day DESC').bind(fam).all();
      return json(results);
    }

    const m = pathname.match(/^\/v1\/snapshots\/(\d{4}-\d{2}-\d{2})$/);
    if (m && request.method === 'GET') {
      const row = await env.DB.prepare('SELECT data FROM snapshots WHERE fam = ? AND day = ?').bind(fam, m[1]).first();
      return row ? json({ day: m[1], data: JSON.parse(row.data) }) : json({ error: 'Not found' }, 404);
    }

    return json({ error: 'Not found' }, 404);
  },
};
