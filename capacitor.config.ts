import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.trenochat.app',
  appName: 'TrenoChat',
  webDir: 'public',
  server: {
    url: 'http://192.168.1.111:3000',
    cleartext: true
  }
};

export default config;
