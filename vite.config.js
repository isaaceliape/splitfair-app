import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/splitfair-app/',
  plugins: [],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: './docs',
    assetsDir: 'assets',
    sourcemap: false,
  },
  // Since we're using Web Components, we want to preserve the module structure
  esbuild: {
    // Don't minify for development
    minify: false,
  },
}));
