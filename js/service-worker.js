// service-worker.js — NoorGate Offline Support

const CACHE_NAME = 'noorgate-cache-v1';

const OFFLINE_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/main.css',
  '/js/main.js',
  '/js/router.js',
  '/data/routers.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

// Install → cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(OFFLINE_FILES))
  );
});

// Activate → cleanup old cache (optional now)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch → serve from cache or fallback to offline.html
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request)
        .then(response => response || caches.match('/offline.html'))
      )
  );
});
