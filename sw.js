const CACHE = 'homelight-v2';

// Pre-cache everything the app needs to render offline
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&display=swap',
];

// Hosts whose responses should never be cached (live data)
const PASSTHROUGH_HOSTS = [
  'api.open-meteo.com',
  'geocoding-api.open-meteo.com',
  'nominatim.openstreetmap.org',
  'ipapi.co',
  'corsproxy.io',
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
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Let weather, geocoding, and iCal feeds always go to the network
  if (PASSTHROUGH_HOSTS.some(h => url.hostname.includes(h))) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        // Only cache valid, non-opaque responses (opaque = cross-origin without CORS)
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // Navigation offline fallback — return the cached shell
        if (e.request.mode === 'navigate') return caches.match('./');
      });
    })
  );
});
