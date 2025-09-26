if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/splitfair-pwa/sw.js', { scope: '/splitfair-pwa/' });
  });
}
