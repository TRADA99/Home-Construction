const CACHE_NAME = "home-cost-calci-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/CSS/styles.css",
    "/HTML/Beam steel.html",
    "/HTML/Plaster Cost Calculator.html",
    "/HTML/newbrick.html",
    "/HTML/newslab.html",
    "/JS/beam steel.js",
    "/JS/newbrick.js",
    "/JS/newslab.js",
    "/JS/plaster-calculator.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
