// 7.8.2: refresh the app shell from the network; preserve offline use and local user data.
const SCOPE = self.registration.scope;
const CACHE = 'hokkaido-pwa-v7.8.2-' + new URL(SCOPE).pathname;
const CORE = ['./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
const INDEX = new URL('./index.html',SCOPE).href;
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    // A missing optional icon must not prevent installing the new app shell.
    const index=await fetch(new Request(INDEX,{cache:'reload'}));
    if(!index.ok)throw new Error('Unable to fetch app shell');
    await cache.put(INDEX,index);
    await Promise.allSettled(CORE.slice(1).map(async path=>{
      const url=new URL(path,SCOPE).href,response=await fetch(new Request(url,{cache:'reload'}));
      if(response.ok)await cache.put(url,response);
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  // Old caches are left intact. Never delete other applications' caches or user data.
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;
  const url=new URL(request.url),scopeUrl=new URL(SCOPE);
  const sameApp=url.origin===scopeUrl.origin&&url.pathname.startsWith(scopeUrl.pathname);
  if(sameApp&&(request.mode==='navigate'||url.pathname===new URL(INDEX).pathname)){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE),controller=new AbortController();
      const timer=setTimeout(()=>controller.abort(),8000);
      try{
        const response=await fetch(new Request(request,{cache:'no-cache',signal:controller.signal}));
        if(response.ok){await cache.put(INDEX,response.clone());return response;}
        return await cache.match(INDEX)||response;
      }catch(error){
        const offline=await cache.match(INDEX)||await caches.match(INDEX);
        return offline||new Response('目前離線，請連線後重新開啟旅行 App。',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }finally{clearTimeout(timer);}
    })());
    return;
  }
  if(sameApp||url.hostname==='cdn.jsdelivr.net'){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE),hit=await cache.match(request)||await caches.match(request);
      if(hit)return hit;
      const response=await fetch(request);
      if(response.ok)await cache.put(request,response.clone());
      return response;
    })());
  }
});
