import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    // base: '{frontend}',
    server: {
        proxy: {
            // '/api': 'http://127.0.0.1:8000',
            '/api': 'https://demo.softeis.net/',
        },
    },
    plugins: [react(), basicSsl()],
})
