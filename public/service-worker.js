const cacheName = "pomodoro-cache-v3";


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

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        
        if (event.request.url.indexOf("index.html") !== -1 || event.request.url.indexOf("script.js") !== -1) {
          caches.open(cacheName).then(cache => {
            cache.put(event.request, response);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          if (event.request.mode === "navigate") {
           
            return caches.match("/index.html");
          }

          return new Response("Offline: Resource not available", {
            status: 404,
            statusText: "Not Found"
          });
        });
      })
  );
});
