const CACHE='tokyo-izu-handbook-github-v16';
const ASSETS=['./','./index.html','./images/visit-japan-web-qr-wu-jiayu.jpg','./images/ginza-shopping-guide.jpg','./images/saphir-odoriko-2026-10-04.png','./images/odoriko-base-fare-2026-10-06.png','./images/shibuya-sky-ticket-1.jpg','./images/shibuya-sky-ticket-2.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./index.html'))))});
