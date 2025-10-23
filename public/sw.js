// sw.js — seguro para SPA (Vercel / React / TS)

const STATIC_CACHE = 'app-static-v4';

// Ativa versão nova imediatamente
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Remove caches antigos
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => (k === STATIC_CACHE ? null : caches.delete(k))));
      await self.clients.claim();
    })()
  );
});

// Permite forçar atualização via postMessage({type:'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event?.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

// Estratégias:
// - HTML / navegação: network-first (não cachear HTML).
// - Assets estáticos (mesma origem): cache-first.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Detecta navegação/HTML
  const isHTML =
    req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Network-first para evitar "congelar" uma shell antiga
    event.respondWith(
      (async () => {
        try {
          return await fetch(req);
        } catch {
          // offline: tenta um fallback mínimo (opcionalmente /index.html se você pré-cachear)
          return await caches.match('/offline.html') || new Response('', { status: 503, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  // Só cacheia assets estáticos da mesma origem
  const isStaticAsset =
    sameOrigin &&
    /\.(?:js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|eot|mp3|mp4|json)$/.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(req);
        if (cached) return cached;

        const net = await fetch(req);
        // Só salva se resposta estiver OK (evita cachear 404/opaque quebrado)
        if (net && net.ok) {
          cache.put(req, net.clone());
        }
        return net;
      })()
    );
  }
});

// OneSignal SDK no escopo do SW (mantido)
try {
  importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');
} catch (_) {}
