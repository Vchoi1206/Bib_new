const CACHE_NAME = 'word-card-v1';
const urlsToCache = [
  '/Bib/bib_mem_new2.html',
  '/Bib/krv_eng/matthew.json',
  '/Bib/krv_eng/mark.json',
  '/Bib/krv_eng/luke.json',
  '/Bib/krv_eng/john.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => caches.match('/Bib/bib_mem_new2.html'))
  );
});
