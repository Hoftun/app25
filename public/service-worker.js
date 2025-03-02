const cacheName = "pomodoro-cache-v2"; 
const assets = [
  "/",
  "/index.html",
  "/script.js",
  "/style.css",
  "/manifest.json",
  "/favicon.ico", 
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/screenshot-wide.png",
  "/icons/screenshot-mobile.png",
  "/images/cat.GIF"
];


self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets).catch(err => console.error("Failed to cache:", err));
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


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).catch(() => console.error("Fetch failed:", event.request.url));
    })
  );
});
