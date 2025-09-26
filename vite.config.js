import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/splitfair-pwa/' : '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Splitfair',
        short_name: 'splitfair',
        theme_color: '#3367d6',
        background_color: '#3367d6',
        display: 'standalone',
        orientation: 'portrait',
        scope: mode === 'production' ? '/splitfair-pwa/' : '/',
        start_url: mode === 'production' ? '/splitfair-pwa/' : '/',
        icons: [
          {
            src: 'icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
        globIgnores: ['**/desktop_bg.png'], // Exclude large background image
      },
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: './',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  // Since we're using Web Components, we want to preserve the module structure
  esbuild: {
    // Don't minify for development
    minify: false,
  },
}));
