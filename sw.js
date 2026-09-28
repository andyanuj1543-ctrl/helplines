// Service Worker for Helplines Emergency App
const CACHE_NAME = 'helplines-cache-v19';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/styles.css',
  './js/data.js',
  './js/location_service.js',
  './js/nlp_matcher.js',
  './js/sos_service.js',
  './js/guardian_service.js',
  './js/i18n.js',
  './js/app.js',
  './manifest.json',
  './favicon.ico',
  './apple-touch-icon.png',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32x32.png',
  './icons/favicon-16x16.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network-first for HTML & core JS so updates take immediate effect, cache fallback for offline readiness
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);
  const isHtmlOrScript = event.request.mode === 'navigate' || 
                         url.pathname.endsWith('.html') || 
                         url.pathname.endsWith('/') || 
                         url.pathname.includes('/js/');

  if (isHtmlOrScript) {
    // Network first, fallback to cache
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
          return cachedResponse || caches.match('./index.html') || caches.match('./');
        });
      })
    );
  } else {
    // Cache first, update in background (stale-while-revalidate for static assets/icons/styles)
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) {
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        }).catch(() => {
          return caches.match('./index.html') || caches.match('./');
        });
      })
    );
  }
});
