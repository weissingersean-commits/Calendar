const CACHE = 'homelight-v7';

// CDN assets that are safe to cache long-term (they never change at these URLs)
const PRECACHE = [
  './manifest.json',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
];

// Only these cross-origin hosts serve immutable assets worth caching.
// Everything else cross-origin (weather, calendar feeds, APIs) is live data
// and goes straight to the network — never add a new API here.
const CACHEABLE_HOSTS = [
  'unpkg.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({type: 'window'}))
      .then(clients => clients.forEach(client => client.navigate(client.url)))
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Live data — pass straight through to network
  if (url.origin !== self.location.origin && !CACHEABLE_HOSTS.includes(url.hostname)) return;

  // index.html — NETWORK FIRST so updates are always picked up immediately.
  // Falls back to cache only when truly offline.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./')))
    );
    return;
  }

  // CDN scripts and other static assets — cache first, network fallback
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
