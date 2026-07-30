const CACHE_NAME = 'rhythmbreathe-shell-v1';
const DYNAMIC_CACHE_NAME = 'rhythmbreathe-dynamic-v1';

const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/logo.png',
    './assets/icon-192.png',
    './assets/icon-512.png',
    './assets/icon-maskable-192.png',
    './assets/icon-maskable-512.png',
    './assets/apple-touch-icon.png'
];

// Install Event - Pre-cache core shell resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching app shell');
            return cache.addAll(STATIC_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Activate Event - Clean up old caches & claim clients
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Don't intercept non-GET requests or chrome-extension schemes
    if (req.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
        return;
    }

    // 1. Navigation requests (index.html): Stale-while-revalidate / Network-first with cache fallback
    if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(req)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
                    }
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match(req).then((cachedResponse) => {
                        if (cachedResponse) return cachedResponse;
                        return caches.match('./index.html') || caches.match('./');
                    });
                })
        );
        return;
    }

    // 2. Google Fonts & static assets: Cache first, fallback to network and update cache
    if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
        event.respondWith(
            caches.match(req).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;
                return fetch(req).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const copy = networkResponse.clone();
                        caches.open(DYNAMIC_CACHE_NAME).then((cache) => cache.put(req, copy));
                    }
                    return networkResponse;
                }).catch(() => {
                    // Fail silently or fallback if missing
                });
            })
        );
        return;
    }

    // 3. General static resources: Cache-first with network fallback
    event.respondWith(
        caches.match(req).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return fetch(req).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const copy = networkResponse.clone();
                    caches.open(DYNAMIC_CACHE_NAME).then((cache) => cache.put(req, copy));
                }
                return networkResponse;
            }).catch(() => {
                // If offline and requesting an image, return logo fallback if available
                if (req.headers.get('accept')?.includes('image/')) {
                    return caches.match('./assets/logo.png');
                }
            });
        })
    );
});

// Skip waiting message handler
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
