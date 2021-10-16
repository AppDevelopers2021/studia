const cacheName = "STUDIA-v0.1"
const contentToCache = [
    '/calendar/index.html',
    '/calendar/index.js',
    '/calendar/index.css',
    '/calendar/img/google_login.png',
    '/libs/fontawesome.css',
    '/libs/moment.js',
    '/libs/pikaday.css',
    '/libs/pikaday.js',
    '/libs/swiper.css',
    '/libs/swiper.js'
];

self.addEventListener('install', function (e) {
    console.log("[ServiceWorker] App Installed")
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        if (r) {
            return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        cache.put(e.request, response.clone());
        return response;
    })());
});