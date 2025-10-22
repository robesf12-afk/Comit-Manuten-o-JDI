self.addEventListener('install', (e) => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

const CACHE = 'app-cache-v1';
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(res =>
      res || fetch(event.request).then(net => {
        caches.open(CACHE).then(c => c.put(event.request, net.clone()));
        return net;
      })
    )
  );
});

// também carrega o worker do OneSignal neste escopo
try { importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js'); } catch (_) {}
