import type { CapacitorConfig } from '@capacitor/cli';
import 'dotenv/config';

// Hardcoded for Digital Ocean Production
const serverUrl = 'http://104.248.196.179:3000';
// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

const config: CapacitorConfig = {
  appId: 'io.trenochat.app',
  appName: 'TrenoChat',
  webDir: 'public',
  server: {
    url: serverUrl,
    cleartext: true
  }
};

export default config;
