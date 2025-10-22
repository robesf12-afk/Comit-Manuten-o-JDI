self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

const CACHE = 'app-cache-v1';
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then((res) =>
      res || fetch(req).then((net) => {
        caches.open(CACHE).then((c) => c.put(req, net.clone()));
        return net;
      })
    )
  );
});

// Carrega o worker do OneSignal também por aqui (não conflita)
try {
  importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');
} catch (_) {}
