// ---- v3: atualização confiável em previews da Vercel ----

// Cache único por escopo (previne conflito entre previews/domínios)
const SCOPE_ID = self.registration.scope; // ex.: https://seu-preview.vercel.app/
const CACHE_VERSION = 'v3';
const CACHE_NAME = `cm-pwa:${CACHE_VERSION}:${SCOPE_ID}`;

// Use caminhos relativos para funcionar em qualquer subcaminho/preview
const PRECACHE = [
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Instalação: assume controle e pré-cache do básico
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// Ativação: limpa caches antigos de outros escopos/versões e assume clientes
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve()))
    );
    await self.clients.claim();
  })());
});

// Estratégias
async function networkFirst(req) {
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    const cache = await caches.open(CACHE_NAME);
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    // fallback para shell (relativo ao escopo)
    return caches.match('index.html');
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  const fresh = await fetch(req);
  const cache = await caches.open(CACHE_NAME);
  cache.put(req, fresh.clone());
  return fresh;
}

// Roteamento
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Só lidar com o próprio domínio/escopo
  if (url.origin !== self.location.origin) return;

  // HTML/navegação → network-first (garante versão nova)
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(networkFirst(req));
    return;
  }

  // JS/CSS → network-first (atualiza código rápido)
  if (req.destination === 'script' || req.destination === 'style') {
    event.respondWith(networkFirst(req));
    return;
  }

  // Ícones/manifest/imagens → cache-first (estáveis)
  if (req.destination === 'image' || req.destination === 'manifest') {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Demais → network-first
  event.respondWith(networkFirst(req));
});

