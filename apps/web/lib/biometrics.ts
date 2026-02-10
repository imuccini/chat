import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { Capacitor } from '@capacitor/core';
import { SERVER_URL } from '@/config';

export const BIOMETRIC_ENABLED_KEY = 'biometrics_enabled';

interface BiometricResult {
    success: boolean;
    token?: string;
    error?: string;
    user?: {
        id: string;
        name?: string;
        alias?: string;
        phoneNumber?: string;
        gender?: string;
    };
    sessionToken?: string;
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
     * 1. Prompts FaceID/TouchID to confirm user wants to enable biometrics.
     * 2. Calls backend to generate a secure token.
     * 3. Stores token + phoneNumber in Keychain/Keystore via NativeBiometric.
     * 4. Sets local flag.
     *
     * @param phoneNumber - User's phone number
     * @param sessionToken - Optional session token from OTP login (for native apps where cookies don't work)
     */
    setup: async (phoneNumber: string, sessionToken?: string): Promise<boolean> => {
        try {
            console.log("!!! [BIOMETRICS_V4] SETUP_STARTING_FOR:", phoneNumber, "!!!");
            console.log("[Biometrics] Session token provided:", !!sessionToken);

            // Step 0: Verify identity FIRST to trigger FaceID prompt
            // This gives the user the expected "scan face to enable" experience
            console.log("[Biometrics] Prompting FaceID for setup verification...");
            await NativeBiometric.verifyIdentity({
                reason: 'Attiva Face ID per accessi futuri',
                title: 'Attiva Face ID',
                subtitle: 'Conferma la tua identità',
                description: 'Usa Face ID per abilitare l\'accesso rapido',
            });
            console.log("[Biometrics] FaceID verification successful, proceeding with setup...");

            // 1. Get secure token from backend
            // Use absolute URL on native
            const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/biometric/setup` : '/api/auth/biometric/setup';
            console.log("[Biometrics] Fetching from URL:", url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Pass token in header for native where cookies don't work
                    ...(sessionToken && { 'Authorization': `Bearer ${sessionToken}` })
                },
                credentials: 'include', // Ensure cookies are sent (works on web)
                body: JSON.stringify({
                    deviceId: 'v4_manual_device',
                    sessionToken // Also pass in body as additional fallback
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
     * 1. Prompts FaceID/TouchID via verifyIdentity().
     * 2. Only after successful verification, retrieves secure token.
     * 3. Calls backend login endpoint.
     */
    authenticate: async (): Promise<BiometricResult> => {
        try {
            console.log("!!! [BIOMETRICS_V4] AUTHENTICATE_STARTING !!!");

            // Step 1: Verify identity with FaceID/TouchID
            // This MUST be called first to trigger the biometric prompt
            console.log("[Biometrics] Calling verifyIdentity to trigger FaceID...");
            await NativeBiometric.verifyIdentity({
                reason: 'Accedi con Face ID',
                title: 'Autenticazione',
                subtitle: 'Usa Face ID per accedere',
                description: 'Tocca il sensore per verificare la tua identità',
            });
            console.log("[Biometrics] FaceID verification successful!");

            // Step 2: Only after successful biometric verification, get credentials
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
                credentials: 'include', // Try to get cookies set
                body: JSON.stringify({ token, phoneNumber })
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Server validation failed' };
            }

            // Return the user and session token for native apps to handle
            return {
                success: true,
                user: data.user,
                sessionToken: data.sessionToken
            };

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
