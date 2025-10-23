// sw-v3.js — seguro para SPA
const STATIC_CACHE = 'app-static-v5';

self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k === STATIC_CACHE ? null : caches.delete(k))));
    await self.clients.claim();
  })());
});
self.addEventListener('message', (event) => {
  if (event?.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith((async () => {
      try { return await fetch(req); }
      catch { return await caches.match('/offline.html') || new Response('', { status: 503 }); }
    })());
    return;
  }

  const isStatic = sameOrigin && /\.(?:js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|eot|mp3|mp4|json)$/.test(url.pathname);
  if (isStatic) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      const net = await fetch(req);
      if (net && net.ok) cache.put(req, net.clone());
      return net;
    })());
  }
});

// OneSignal (mantido)
try { importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js'); } catch(_) {}
