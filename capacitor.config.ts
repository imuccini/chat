import type { CapacitorConfig } from '@capacitor/cli';
import 'dotenv/config';

// Use environment variable for Server URL (defaulting to Cloud IP if missing)
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://104.248.196.179:3000';

const config: CapacitorConfig = {
  appId: 'io.trenochat.app',
  appName: 'TrenoChat',
  webDir: 'out',
  server: {
    androidScheme: 'http',
    cleartext: true
  },
  plugins: {
    Keyboard: {
      resize: 'body' as any
    },
    StatusBar: {
      overlaysWebView: false,
      backgroundColor: '#059669', // Brand Emerald 600
      style: 'DARK'
    }
  }
};

export default config;
