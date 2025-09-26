if (!self.define) {
  let e,
    i = {};
  const n = (n, c) => (
    (n = new URL(n + '.js', c).href),
    i[n] ||
      new Promise((i) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = n), (e.onload = i), document.head.appendChild(e));
        } else ((e = n), importScripts(n), i());
      }).then(() => {
        let e = i[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, r) => {
    const s = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (i[s]) return;
    let o = {};
    const d = (e) => n(e, s),
      f = { module: { uri: s }, exports: o, require: d };
    i[s] = Promise.all(c.map((e) => f[e] || d(e))).then((e) => (r(...e), o));
  };
}
define(['./workbox-74f2ef77'], function (e) {
  'use strict';
  (self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'assets/main-B6vR1gu7.css', revision: null },
        { url: 'assets/main-DsJFEJSg.js', revision: null },
        { url: 'assets/main-legacy-BgeKDyA8.js', revision: null },
        { url: 'assets/polyfills-legacy-B6LMYtkN.js', revision: null },
        { url: 'cursor-black.png', revision: '6afbfb6dd9891df833ab2c3f0383c13d' },
        { url: 'cursor-cross-green.png', revision: '7c8b74f33cc15a94a48ac67f9f4bfed7' },
        { url: 'cursor-cross-red.png', revision: '6a45f5fca04c3658f59540b2954f1045' },
        { url: 'cursor-red.png', revision: 'c2162e9c52b093f10c438c61d5e532fe' },
        { url: 'desktop_bg.png', revision: 'c51d3f8ab911fe9afc1761259bc3ae7f' },
        { url: 'favicon.ico', revision: '1ba2ae710d927f13d483fd5d1e548c9b' },
        { url: 'icon-128x128.png', revision: '9df2104855d144ada9f4b8954abcc66c' },
        { url: 'icon-144x144.png', revision: '9c7125d9132b3e6a4d5f8a6f9d3e0621' },
        { url: 'icon-152x152.png', revision: '74a9e55ed8dfaceb70c2bd6f7811c15e' },
        { url: 'icon-192x192.png', revision: '6235eb6c14aa163c5d3f83d5a7e82301' },
        { url: 'icon-384x384.png', revision: '7cf7eb595d3e6f9d9cd29d548334673e' },
        { url: 'icon-512x512.png', revision: '67d0425728519ed57e629171d1815e48' },
        { url: 'icon-72x72.png', revision: 'dcc49b375c71cf9f89ccce93adadc408' },
        { url: 'icon-96x96.png', revision: '1b46e976d11731c228dd512e801c2fd2' },
        { url: 'index.html', revision: '482d4f4127214beb49a3c5f1c25c698e' },
        { url: 'logo-gray.svg', revision: 'f1c7f936f90ae83a9e84730a8f5209a8' },
        { url: 'logo.png', revision: '82b9c7a5a3f405032b1db71a25f67021' },
        { url: 'logo.svg', revision: 'ea9ec231398dc7eac0df1dab6f9f376b' },
        { url: 'mobille_bg.png', revision: 'd12a9d5a62fe4c59268c24e6247b4d28' },
        { url: 'registerSW.js', revision: 'f9bad03ba99c34576213593500fe4533' },
        { url: 'favicon.ico', revision: '1ba2ae710d927f13d483fd5d1e548c9b' },
        { url: 'icon-192x192.png', revision: '6235eb6c14aa163c5d3f83d5a7e82301' },
        { url: 'icon-512x512.png', revision: '67d0425728519ed57e629171d1815e48' },
        { url: 'manifest.webmanifest', revision: '9c96efdaf4cf881b00406ab5ce7dde81' },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))),
    e.registerRoute(
      /desktop_bg\.png$/,
      new e.CacheFirst({
        cacheName: 'background-images',
        plugins: [new e.ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 2592e3 })],
      }),
      'GET'
    ));
});
