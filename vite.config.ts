import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Treno WiFi Chat',
        short_name: 'TrenoChat',
        description: 'Chat anonima per passeggeri',
        theme_color: '#10b981',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    // 1. Espone il server sulla rete locale (necessario per bridge100)
    host: true,

    // 2. Forza la porta 5173 (quella che usiamo nel redirect di pfctl)
    port: 5173,

    // 3. Permette a Vite di accettare richieste da domini "finti" come apple.com o google.com
    allowedHosts: true,

    // 4. Configurazione del proxy per le API
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true // Proxy WebSockets too
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    },
  },
});



