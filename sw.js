/* ====== SERVICE WORKER FOR PWA OFFLINE CACHING & AUTOMATIC FRESH RELOADS ====== */

const CACHE_NAME = 'wartel-quran-v22';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './pages/app.html',
  './pages/views/inicio.html',
  './pages/views/qibla.html',
  './pages/views/emociones.html',
  './pages/views/tasbeeh.html',
  './pages/views/azkar.html',
  './pages/views/coran.html',
  './pages/views/apuntes.html',
  './pages/views/maqraa.html',
  './pages/views/ajustes.html',
  './pages/views/perfil.html',
  './pages/views/sobre-mi.html',
  './pages/login.html',
  './pages/admin.html',
  './styles/main.css',
  './styles/app.css',
  './styles/login.css',
  './styles/admin.css',
  './scripts/db.js',
  './scripts/api.js',
  './scripts/i18n.js',
  './scripts/quran.js',
  './scripts/azkar.js',
  './scripts/tasbeeh.js',
  './scripts/qibla.js',
  './scripts/app.js',
  './scripts/login.js',
  './scripts/admin.js',
  './locales/ar.json',
  './locales/es.json',
  './locales/en.json',
  './manifest.json',
  './assets/1.png',
  './assets/2.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/apple-touch-icon.png',
  './assets/favicon.png',
  './assets/Green Simple Business Card.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network-First Strategy with Dynamic Cache Fallback for instant fresh updates on refresh
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Serve offline cached copy if network fails
          return caches.match(event.request);
        })
    );
  }
});
