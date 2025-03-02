
console.log("Service worker is installing...");

const cacheName = "pomodoro-cache-v4"; // Change the cache name to force update

const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/favicon.ico", // Ensure favicon is cached
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/screenshot-wide.png",
  "/icons/screenshot-mobile.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets)
        .catch(err => console.error("Failed to cache during install:", err));
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Serve from cache or fetch fresh if not cached
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request)
        .catch(() => console.error("Fetch failed:", event.request.url));
    })
  );
});
