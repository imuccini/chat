import type { CapacitorConfig } from '@capacitor/cli';
import 'dotenv/config';

// Use environment variable for Server URL (defaulting to Cloud IP if missing)
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://104.248.196.179:3000';

const config: CapacitorConfig = {
  appId: 'io.trenochat.app',
  appName: 'TrenoChat',
  webDir: 'out',
  backgroundColor: '#e5ddd5',  // Beige - matches input bar, visible behind keyboard corners
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
    backgroundColor: '#e5ddd5'  // Beige - matches input bar
  }
};

export default config;
