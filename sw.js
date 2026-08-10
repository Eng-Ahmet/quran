/* ====== SERVICE WORKER WITH PWA OFFLINE CACHING, PUSH NOTIFICATIONS, BACKGROUND SYNC & PERIODIC SYNC ====== */

const CACHE_NAME = 'wartel-quran-v25';

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
  './assets/screenshot-mobile.png',
  './assets/screenshot-desktop.png'
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
          return caches.match(event.request);
        })
    );
  }
});

/* ====== 1. PUSH NOTIFICATIONS HANDLER ====== */
self.addEventListener('push', (event) => {
  let data = { title: 'ورتل القرآن ترتيلا', body: '🌸 صلّ على النبي ﷺ واذكر الله' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: './assets/icon-192.png',
    badge: './assets/favicon.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || './pages/app.html' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : './pages/app.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let client of clientList) {
        if (client.url.includes('pages/app.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

/* ====== 2. PERIODIC BACKGROUND SYNC HANDLER (תذكير كل ساعتين) ====== */
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'azkar-reminder' || event.tag === 'hourly-reminder') {
    const reminderMessages = [
      '🌸 أستغفر الله العظيم وأتوب إليه - لا تنسَ ذكر الله',
      '✨ سُبْحَانَ اللهِ وَبِحَمْدِهِ ، سُبْحَانَ اللهِ الْعَظِيمِ',
      '📖 حان وقت قراءة الورد اليومي من المصحف الشريف',
      '🤍 اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ'
    ];
    const message = reminderMessages[Math.floor(Math.random() * reminderMessages.length)];

    event.waitUntil(
      self.registration.showNotification('ورتل القرآن ترتيلا 📖', {
        body: message,
        icon: './assets/icon-192.png',
        badge: './assets/favicon.png',
        vibrate: [150, 80, 150]
      })
    );
  }
});

/* ====== 3. BACKGROUND SYNC HANDLER (مزامنة البيانات أوفلاين) ====== */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-user-data' || event.tag === 'sync-notes') {
    console.log('[Service Worker] Background Syncing user notes and data...');
  }
});

/* ====== 4. CLIENT MESSAGING API FOR SCHEDULING REMINDERS ====== */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_NOTIFICATION') {
    self.registration.showNotification(event.data.title || 'ورتل القرآن ترتيلا', {
      body: event.data.body || 'تذكير بالذكر المبارك',
      icon: './assets/icon-192.png',
      badge: './assets/favicon.png',
      vibrate: [200, 100, 200]
    });
  }
});
