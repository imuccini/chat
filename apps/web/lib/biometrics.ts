import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { Capacitor } from '@capacitor/core';
import { SERVER_URL } from '@/config';

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
            console.log("!!! [BIOMETRICS_V4] SETUP_STARTING_FOR:", phoneNumber, "!!!");

            // 1. Get secure token from backend
            // Use absolute URL on native
            const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/biometric/setup` : '/api/auth/biometric/setup';
            console.log("[Biometrics] Fetching from URL:", url);

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deviceId: 'v4_manual_device'
                })
            });

            console.log("[Biometrics] Backend response status:", response.status);

            if (!response.ok) {
                const errText = await response.text();
                console.error("[Biometrics] Backend setup error:", errText);
                throw new Error('Failed to generate biometric token');
            }

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
            console.log("!!! [BIOMETRICS_V4] AUTHENTICATE_STARTING !!!");

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

            console.log("[Biometrics] Valid credentials retrieved, calling login...");

            // Call Backend Login - Use absolute URL on native
            const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/biometric/login` : '/api/auth/biometric/login';

            const response = await fetch(url, {
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
