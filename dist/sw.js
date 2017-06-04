const CACHE_NAME = 'calendar-cache-v2';
const urlsToCache = [
    '/',
    // '/styles.css',
    '/app.bundle.js'
];

async function cacheResources() {
    try {
        const cache = await caches.open(CACHE_NAME);

        return cache.addAll(urlsToCache);
    } catch (err) {
        console.log('Failed to cache: ', err);
    }
}

async function cachedResource(req) {
    try {
        const response = await caches.match(req);

        if (response) {
            return response;
        }

        return fetch(req);
    } catch (err) {
        console.log('Failed to fetch: ', err);
    }
}

self.addEventListener('install', event =>
    event.waitUntil(cacheResources())
);

self.addEventListener('fetch', event =>
    event.respondWith(cachedResource(event.request))
);

self.addEventListener('activate', (event) => {
    console.info('Event: Activate');

    // Remove old and unwanted caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache); // Deleting the cache
                    }
                })
            );
        })
    );
});
