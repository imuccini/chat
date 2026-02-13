import type { CapacitorConfig } from '@capacitor/cli';
import 'dotenv/config';

// Use environment variable for Server URL (defaulting to Cloud IP if missing)
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

const config: CapacitorConfig = {
  appId: 'io.local.app',
  appName: 'Local',
  webDir: 'out',
  backgroundColor: '#ffffff',
  server: {
    androidScheme: 'http',
    cleartext: true
  },
  plugins: {
    Keyboard: {
      // Resize is handled manually via useKeyboardAnimation hook
      // Do NOT set resize here - it conflicts with KeyboardResize.None
    },
  },
  ios: {
    backgroundColor: '#ffffff'
  }
};

export default config;
