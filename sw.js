const CACHE_NAME = 'pedaco-do-ceu-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './icon-192.png'
  './icon-512.png'
];

// Instalação e Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepta as requisições para rodar offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o arquivo do cache, ou tenta buscar na rede
      return response || fetch(event.request);
    }).catch(() => {
      // Opcional: retornar uma página de erro customizada caso não esteja no cache
      return caches.match('./index.html');
    })
  );
});
