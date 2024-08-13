import basicSsl from '@vitejs/plugin-basic-ssl'
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
    proxy: {
      // '/api': 'http://127.0.0.1:8000',
      '/api': 'https://demo.softeis.net',
    },
  },
  preview: {
    port: 3000,
    proxy: {
      // '/api': 'http://127.0.0.1:8000',
      '/api': 'https://demo.softeis.net',
    },
  },
  build: {
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    react(),
    basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
  ],
})
