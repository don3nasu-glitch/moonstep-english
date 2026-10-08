// Moonstep English: ページはネット優先で取得し、つながらないときだけ保存した版を出す。音声はブラウザ任せ（範囲取得のため触らない）
const V='ms-pages-1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin||u.pathname.includes('/audio/'))return;
  e.respondWith(fetch(r).then(res=>{if(res.ok&&res.status===200){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));
});
