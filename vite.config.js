import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/splitfair-pwa/' : '/',
  plugins: [
    // PWA support disabled for now
    // VitePWA({...}),
  ],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: 'dist',
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
