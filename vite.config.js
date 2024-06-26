import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            // '/api': 'http://127.0.0.1:8000',
            '/api': 'https://demo.softeis.net/',
        },
    },
    plugins: [react(), basicSsl(), VitePWA({
        registerType: 'autoUpdate', devOptions: {
            enabled: true
        }
    })],
})
