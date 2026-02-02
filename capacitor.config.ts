import type { CapacitorConfig } from '@capacitor/cli';
import 'dotenv/config';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

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
