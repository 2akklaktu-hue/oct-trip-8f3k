// Офлайн-режим: всё приложение хранится в телефоне. Версия меняется при каждой сборке,
// тогда телефон при первом выходе в интернет скачивает новую версию и перезагружает страницу.
const CACHE='belek-07b78cbc3c65';
const CORE=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "fonts/fonts.css", "fonts/IBMPlexMono-cyrillic.woff2", "fonts/IBMPlexMono-latin-ext.woff2", "fonts/IBMPlexMono-latin.woff2", "fonts/Onest-cyrillic.woff2", "fonts/Onest-latin-ext.woff2", "fonts/Onest-latin.woff2", "fonts/Unbounded-cyrillic.woff2", "fonts/Unbounded-latin-ext.woff2", "fonts/Unbounded-latin.woff2"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('belek-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(caches.match('index.html',{cacheName:CACHE}).then(m=>m||fetch(r)));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r)));
});
