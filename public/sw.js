// public/sw.js
// Aumente a versão sempre que trocar ícone/manifest para forçar atualização
const CACHE_VERSION = "v8";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

