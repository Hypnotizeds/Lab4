
const CACHE='sushigo-cart-v1';
const ASSETS=[
  './','./index.html','./products.html','./product-california.html','./product-philadelphia.html','./product-temaki.html','./cart.html','./checkout.html','./contacts.html','./team.html','./request.html',
  './assets/css/style.css','./assets/js/app.js','./assets/js/cart.js',
  './assets/img/icon-192.png','./assets/img/icon-256.png','./assets/img/icon-384.png','./assets/img/icon-512.png',
  './assets/img/california.jpg','./assets/img/philadelphia.jpg','./assets/img/temaki.jpg',
  './assets/img/chef1.jpg','./assets/img/chef2.jpg','./assets/img/chef3.jpg','./assets/img/manager.jpg'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.destination==='style'||r.destination==='image'){
    e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(cache=>cache.put(r,cp));return res;})));
    return;
  }
  if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.match('./index.html')));return;}
  e.respondWith(fetch(r).catch(()=>caches.match(r)));
});
