const CACHE_NAME = 'pedaco-do-ceu-v1';

// Arquivos que serão salvos no celular para funcionar offline
const ASSETS_TO_CACHE = [
  './',
  './app.html', 
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instala o service worker e salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Intercepta as requisições da internet. Se não tiver internet, puxa do cache!
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o arquivo do cache se existir, senão tenta baixar da rede
      return response || fetch(event.request);
    })
  );
});