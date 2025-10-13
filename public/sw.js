// public/sw.js
const CACHE_NAME = 'jdi-cache-v8';

// Instalação: assume controle imediatamente
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Ativação: limpa caches antigos e assume clientes
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener('fetch', event => {
  // Para navegações (HTML), usa network-first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Para os demais (assets, imagens, etc.), cache-first
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

