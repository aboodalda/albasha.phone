const V="basha-v31",F=["./","index.html","style.css","app.js","demo.js","firebase-config.js","logo-mark.jpg","iphone18proma.png","manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!="GET"||u.hostname=="firestore.googleapis.com"||u.hostname.includes("identitytoolkit")||u.pathname.includes("admin"))return;
e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(x=>{if(x.ok||x.type=="opaque")caches.open(V).then(c=>c.put(r,x.clone()));return x}).catch(()=>m);return m||n}))});
