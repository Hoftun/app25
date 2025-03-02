const cacheName = "pomodoro-cache-v2";  

const assets = [
  "/",
  "/index.html",
  "/style.css",  
  "/script.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); 
});

// Activate event: Delete old caches
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
    fetch(event.request) 
      .catch(() => caches.match(event.request))
  );
});
