const CACHE_VERSION = 'v2';
const CACHE_NAME = `cm-pwa-${CACHE_VERSION}`;

// Pré-cache só do que é estável (ícones/manifest)
const PRECACHE = [
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Instalação: assume controle imediatamente e pré-cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// Ativação: limpa caches antigos e assume clientes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())));
      await self.clients.claim();
    })()
  );
});

// Estratégias
async function networkFirst(event) {
  try {
    const fresh = await fetch(event.request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(event.request, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    if (event.request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    throw err;
  }
}

async function cacheFirst(event) {
  const cached = await caches.match(event.request);
  if (cached) return cached;
  const fresh = await fetch(event.request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(event.request, fresh.clone());
  return fresh;
}

// Roteamento por tipo
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Só tratar requisições do mesmo domínio
  if (url.origin !== self.location.origin) return;

  // HTML/navegação → network-first (pegue a versão nova)
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(networkFirst(event));
    return;
  }

  // JS/CSS → network-first (atualiza código rapidamente)
  if (req.destination === 'script' || req.destination === 'style') {
    event.respondWith(networkFirst(event));
    return;
  }

  // Imagens/manifest → cache-first (estáveis)
  if (req.destination === 'image' || req.destination === 'manifest') {
    event.respondWith(cacheFirst(event));
    return;
  }

  // Demais → network-first
  event.respondWith(networkFirst(event));
});

