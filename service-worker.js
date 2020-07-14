// Define Cache Version and Pages To be cached, We can cahed individual file at one or we can cached whole files

const cacheValue = "V1";

// Cache individual Files
const cacheFiles = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js',
]

// Call Install Event in Service Worker
self.addEventListener('install', e => {
    console.log('Service Worker Installed')
    e.waitUntil(
        caches
        .open(cacheValue)
        .then(cache => {
            console.log("Service Worker: Caching Files")
            cache.addAll(cacheFiles)
        })
        .then(() => self.skipWaiting())
    );

});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log("Service Worker : Activated")

    // Removing Unwanted Cached
    e.waitUntil(

        cache.keys().then(cacheValue => {
            return Promise.all(
                cacheValue.map(cache => {
                    if (cache !== cacheValue) {
                        console.log('Service Worker : Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })

    );
});


// Calling Fetch Event

self.addEventListener('fetch', e => {

    console.log("Service Worker Fetching Working");
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );

});