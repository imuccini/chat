
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { Capacitor } from '@capacitor/core';

export const BIOMETRIC_ENABLED_KEY = 'biometrics_enabled';

interface BiometricResult {
    success: boolean;
    token?: string;
    error?: string;
}

export const BiometricService = {
    /**
     * Checks if hardware biometrics are available on the device.
     */
    isAvailable: async (): Promise<boolean> => {
        if (!Capacitor.isNativePlatform()) return false;
        try {
            const result = await NativeBiometric.isAvailable();
            return result.isAvailable;
        } catch (e) {
            console.error('[Biometrics] Availability check failed', e);
            return false;
        }
    },

    /**
     * Checks if the user has opted-in to biometric login.
     */
    isEnabled: (): boolean => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem(BIOMETRIC_ENABLED_KEY) === 'true';
    },

    /**
     * Sets up biometrics for the current user.
     * 1. Calls backend to generate a secure token.
     * 2. Stores token + phoneNumber in Keychain/Keystore via NativeBiometric.
     * 3. Sets local flag.
     */
    setup: async (phoneNumber: string): Promise<boolean> => {
        try {
            // 1. Get secure token from backend
            const response = await fetch('/api/auth/biometric/setup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deviceId: (await NativeBiometric.getCredentials({ server: 'com.antigravity.chat' })).password ? 'existing_device' : 'new_device' // Simple check, or generate UUID
                })
            });

            if (!response.ok) throw new Error('Failed to generate biometric token');

            const { token } = await response.json();

            // 2. Save to Secure Store
            // Server: Identify specific app/server scope
            await NativeBiometric.setCredentials({
                username: phoneNumber,
                password: token,
                server: 'com.antigravity.chat',
            });

            // 3. Enable flag
            localStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');

            return true;
        } catch (error) {
            console.error('[Biometrics] Setup failed', error);
            return false;
        }
    },

    /**
     * Authenticates the user via Biometrics.
     * 1. Prompts FaceID/TouchID.
     * 2. Retrieves secure token.
     * 3. Calls backend login endpoint.
     */
    authenticate: async (): Promise<BiometricResult> => {
        try {
            // Verify Identity & Get Credentials
            // The plugin handles the prompt UI
            const credentials = await NativeBiometric.getCredentials({
                server: 'com.antigravity.chat',
            });

            if (!credentials || !credentials.password) {
                return { success: false, error: 'No credentials found' };
            }

            const phoneNumber = credentials.username;
            const token = credentials.password;

            // Call Backend Login
            const response = await fetch('/api/auth/biometric/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, phoneNumber })
            });

            if (!response.ok) {
                const data = await response.json();
                return { success: false, error: data.error || 'Server validation failed' };
            }

            return { success: true };

        } catch (error: any) {
            console.error('[Biometrics] Authentication failed', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Clears biometric credentials.
     */
    clear: async () => {
        try {
            if (Capacitor.isNativePlatform()) {
                await NativeBiometric.deleteCredentials({
                    server: 'com.antigravity.chat',
                });
            }
            localStorage.removeItem(BIOMETRIC_ENABLED_KEY);
        } catch (e) {
            console.error('[Biometrics] Clear failed', e);
        }
    }
};
