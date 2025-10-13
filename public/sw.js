// public/sw.js
const CACHE_NAME = "jdi-cache-v2";

// Liste aqui os arquivos "fixos" que quer pré-cachear
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/logo-femsa.png",
  "/logo-comite.png"
];

// Instala: pré-cache dos assets core
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// Ativa: limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// Estratégia: Stale-While-Revalidate para requisições GET do mesmo domínio.
// Para assets gerados pelo Vite (/assets/...), ele salva em cache na 1ª vez.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Só cacheia do mesmo host
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((networkResp) => {
          const respClone = networkResp.clone();
          // Guarda em cache apenas respostas OK
          if (networkResp.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, respClone));
          }
          return networkResp;
        })
        .catch(() => cached); // offline: usa cache se existir

      // Se já houver cache, devolve ele imediatamente e atualiza em background.
      return cached || fetchPromise;
    })
  );
});
