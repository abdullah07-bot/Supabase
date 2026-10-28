var C="stock-v30",F=["./","config.js","manifest.json","icon.svg","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).catch(function(){}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request;if(r.method!="GET")return;var u=new URL(r.url);
 if(u.origin!=location.origin||u.pathname.indexOf("/api/")==0)return; /* data always comes live from the server */
 if(r.mode=="navigate"){e.respondWith(fetch(r).catch(function(){return caches.match("./")}));return} /* pages: network first, never replay a redirect */
 e.respondWith(caches.match(r).then(function(m){return (m&&!m.redirected)?m:fetch(r)}))
});
