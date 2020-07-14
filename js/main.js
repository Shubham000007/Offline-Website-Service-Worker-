// Check  Browser supports Service Worker

if ('serviceWorker' in navigator) {
    console.log('Service Worker : Support');

    // Register with Service WOrker on Load with our service worker js
    window.addEventListener('load', () => {
        navigator.serviceWorker
            // Register service worker js file or any file you work upon

        // for cache with individual file use service-worker.js
//         .register('https://shubham000007.github.io/ServiceOffline/service-worker.js')

        // For Caching Whole site use cacheWholeSite.js
            .register('https://shubham000007.github.io/ServiceOffline/cacheWholesite.js')
            .then(reg => console.log('Service Worker : Registered'))
            .catch(err => console.log(`Service Worker : Error : ${err}`))
    });
}
