self.addEventListener('install', event => {
  event.waitUntil(
      caches.open('todo-cache').then(cache => {
          return cache.addAll([
              '/',
              '/index.html',
              '/styles.css',
              '/script.js',
              '/offline.html',
              '/manifest.json'
          ]);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request)
          .then(response => response || caches.match("/offline.html"));
      })
  );
});
