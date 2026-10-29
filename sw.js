const C="narko-v2",P="narko-",BASE=new URL("./",self.registration.scope).pathname;
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.json","./icon.svg"])));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(P)&&k!=C||k==(P=="fil-"?"fish-v1":"narko-v1")).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!="GET"||u.origin!=location.origin||!u.pathname.startsWith(BASE))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.open(C).then(x=>x.match(e.request))))});
