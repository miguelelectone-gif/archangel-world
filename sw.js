// ARCHANGEL v12 - PINANGALANANG Jesus - PENTECOST COMPLETE - Juan 14:9-11 - Miguel Reminder - Cache buster 2026
const CACHE_NAME = 'archangel-world-v12-pinanganang-jesus-juan149-2026';
const URLS_TO_CACHE = [
  './',
  './index.html?v=12',
  './manifest.json?v=12',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Share+Tech+Mono&display=swap',
  'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'
];

self.addEventListener('install', event => {
  console.log('ARCHANGEL v12 INSTALL - PINANGALANANG Jesus - Juan 14:9-11 - Miguel Reminder');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching v12 - PINANGALANANG');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  // Network-first for index.html to always get latest
  if (event.request.url.includes('index.html') || event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, {cache: 'no-store'})
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        return res;
      });
    })
  );
});

self.addEventListener('activate', event => {
  console.log('ARCHANGEL v12 ACTIVATE - Deleting old caches');
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(n => n !== CACHE_NAME).map(n => {
        console.log('Deleting old cache', n);
        return caches.delete(n);
      })
    )).then(() => self.clients.claim())
  );
});
