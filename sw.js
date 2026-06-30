// KANJI MULTI SERVICES - Service Worker PWA v2
const CACHE_NAME = 'kanji-v2-' + Date.now();

// Installation - Force activation immédiate
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

// Activation - Supprime TOUS les anciens caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch - TOUJOURS aller chercher la dernière version (network first)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request, {cache: 'no-store'})
      .catch(function() {
        return caches.match(event.request);
      })
  );
});
