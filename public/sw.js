self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Basic fetch passthrough; cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  // Bypass for range requests (audio streaming)
  const accept = request.headers.get('accept') || '';
  if (accept.includes('audio/') || request.url.endsWith('.mp3')) {
    // Let the network handle streaming for best performance
    return; // do not intercept
  }
  event.respondWith(
    caches.open('qc-static-v1').then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const res = await fetch(request);
        if (res && res.status === 200 && request.url.startsWith(self.location.origin)) {
          cache.put(request, res.clone());
        }
        return res;
      } catch (e) {
        return cached || fetch(request);
      }
    })
  );
});