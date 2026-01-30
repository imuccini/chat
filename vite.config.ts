import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
        // Usa '127.0.0.1' invece di 'localhost' per evitare conflitti IPv6 su macOS
        target: 'http://192.168.2.1:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});



