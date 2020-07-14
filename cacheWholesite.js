// Define Cache Version and Pages To be cached, We can cahed individual file at one or we can cached whole files

const cacheValue = "Whole Site Cached";

// Call Install Event in Service Worker
self.addEventListener('install', e => {
    console.log('Service Worker Installed')
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log("Service Worker : Activated")

    // Removing Unwanted Cached
    e.waitUntil(

        caches.keys().then(cacheValue => {
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
        fetch(e.request)
        .then(res => {
            // Make Copy/Clone of response of request/response
            const cloneResponse = res.clone();

            //open cache
            caches
                .open(cacheValue)
                .then(cache => {
                    // add the reposne to cache
                    cache.put(e.request, cloneResponse);
                });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );

});