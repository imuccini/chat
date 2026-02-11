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
        email?: string;
        image?: string;
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
        const value = localStorage.getItem(BIOMETRIC_ENABLED_KEY);
        console.log("[Biometrics] isEnabled check - localStorage value:", value);
        return value === 'true';
    },

    /**
     * Sets up biometrics for the current user.
     * 1. Prompts FaceID/TouchID to confirm user wants to enable biometrics.
     * 2. Calls backend to generate a secure token.
     * 3. Stores token + identifier in Keychain/Keystore via NativeBiometric.
     * 4. Sets local flag.
     *
     * @param identifier - User's phone number or email (used to identify user during biometric login)
     * @param sessionToken - Optional session token from OTP/social login (for native apps where cookies don't work)
     */
    setup: async (identifier: string, sessionToken?: string): Promise<boolean> => {
        try {
            console.log("!!! [BIOMETRICS] SETUP_STARTING_FOR:", identifier, "!!!");
            console.log("[Biometrics] Session token provided:", !!sessionToken);
            console.log("[Biometrics] Is native platform:", Capacitor.isNativePlatform());

            // Step 0: Verify identity FIRST to trigger FaceID prompt
            console.log("[Biometrics] Step 0: Calling verifyIdentity...");
            await NativeBiometric.verifyIdentity({
                reason: 'Attiva Face ID per accessi futuri',
                title: 'Attiva Face ID',
                subtitle: 'Conferma la tua identità',
                description: 'Usa Face ID per abilitare l\'accesso rapido',
            });
            console.log("[Biometrics] Step 0 DONE: FaceID verification successful!");

            // Step 1: Get secure token from backend
            const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/biometric/setup` : '/api/auth/biometric/setup';
            console.log("[Biometrics] Step 1: Fetching token from:", url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(sessionToken && { 'Authorization': `Bearer ${sessionToken}` })
                },
                credentials: 'include',
                body: JSON.stringify({
                    deviceId: 'v4_manual_device',
                    sessionToken
                })
            });

            console.log("[Biometrics] Step 1: Backend response status:", response.status);

            if (!response.ok) {
                const errText = await response.text();
                console.error("[Biometrics] Step 1 FAILED: Backend error:", errText);
                throw new Error('Failed to generate biometric token: ' + errText);
            }

            const data = await response.json();
            console.log("[Biometrics] Step 1 DONE: Got token:", data.token ? 'YES' : 'NO');

            if (!data.token) {
                console.error("[Biometrics] Step 1 FAILED: No token in response");
                throw new Error('No token received from server');
            }

            // Step 2: Save to Secure Store (Keychain on iOS)
            console.log("[Biometrics] Step 2: Saving credentials to keychain...");
            console.log("[Biometrics] Username (identifier):", identifier);

            // First, try to delete any existing credentials to avoid KeychainError
            try {
                console.log("[Biometrics] Step 2a: Deleting any existing credentials...");
                await NativeBiometric.deleteCredentials({
                    server: 'com.antigravity.chat',
                });
                console.log("[Biometrics] Step 2a: Existing credentials deleted (or none existed)");
            } catch (deleteErr) {
                // It's OK if delete fails - might mean no credentials existed
                console.log("[Biometrics] Step 2a: No existing credentials to delete (this is OK)");
            }

            // Now set the new credentials
            console.log("[Biometrics] Step 2b: Setting new credentials...");
            await NativeBiometric.setCredentials({
                username: identifier,
                password: data.token,
                server: 'com.antigravity.chat',
            });
            console.log("[Biometrics] Step 2 DONE: Credentials saved to keychain!");

            // Step 3: Set localStorage flag
            console.log("[Biometrics] Step 3: Setting localStorage flag...");
            localStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');

            // Verify it was set
            const flagValue = localStorage.getItem(BIOMETRIC_ENABLED_KEY);
            console.log("[Biometrics] Step 3 DONE: localStorage flag value:", flagValue);

            console.log("[Biometrics] SETUP COMPLETE SUCCESS!");
            return true;
        } catch (error: any) {
            console.error('[Biometrics] SETUP FAILED at some step:', error?.message || error);
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

            // Username can be phone number or email - backend handles both
            const identifier = credentials.username;
            const token = credentials.password;

            console.log("[Biometrics] Valid credentials retrieved, calling login with identifier:", identifier);

            // Call Backend Login - Use absolute URL on native
            const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/biometric/login` : '/api/auth/biometric/login';

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Try to get cookies set
                body: JSON.stringify({ token, identifier })
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
