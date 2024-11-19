// import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@preflower/barcode-detector-polyfill'],
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
    proxy: {
      // '/api': 'https://demo.softeis.net',
      // '/api': 'https://admin.softeis.net',
      '/api': 'http://127.0.0.1:8000',
    },
    host: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
    proxy: {
      // '/api': 'https://demo.softeis.net',
      // '/api': 'https://admin.softeis.net',
      '/api': 'http://127.0.0.1:8000',
    },
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  base: '/',
  plugins: [
    react(),
    // basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
      // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        "short_name": "Stocky",
        "name": "Zarg Lagerverwaltung & Barcode Sanner",
        "icons": [
          {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "logo192x192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "logo256x256.png",
            "type": "image/png",
            "sizes": "256x256"
          }
        ],
        "start_url": ".",
        "scope": ".",
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
      }
    }),
  ],
})
