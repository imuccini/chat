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
        return localStorage.getItem(BIOMETRIC_ENABLED_KEY) === 'true';
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
            // Step 0: Verify identity FIRST to trigger FaceID prompt
            await NativeBiometric.verifyIdentity({
                reason: 'Attiva Face ID per accessi futuri',
                title: 'Attiva Face ID',
                subtitle: 'Conferma la tua identità',
                description: 'Usa Face ID per abilitare l\'accesso rapido',
            });

            // Step 1: Get secure token from backend
            const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/biometric/setup` : '/api/auth/biometric/setup';

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

            if (!response.ok) {
                const errText = await response.text();
                console.error('[Biometrics] Backend setup error:', errText);
                throw new Error('Failed to generate biometric token');
            }

            const data = await response.json();

            if (!data.token) {
                throw new Error('No token received from server');
            }

            // Step 2: Save to Secure Store (Keychain on iOS, Keystore on Android)
            // First delete any existing credentials to avoid KeychainError
            try {
                await NativeBiometric.deleteCredentials({
                    server: 'com.antigravity.chat',
                });
            } catch {
                // OK if delete fails - might mean no credentials existed
            }

            // Set the new credentials
            await NativeBiometric.setCredentials({
                username: identifier,
                password: data.token,
                server: 'com.antigravity.chat',
            });

            // Step 3: Set localStorage flag
            localStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');

            return true;
        } catch (error: any) {
            console.error('[Biometrics] Setup failed:', error?.message || error);
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
            // Step 1: Verify identity with FaceID/TouchID
            await NativeBiometric.verifyIdentity({
                reason: 'Accedi con Face ID',
                title: 'Autenticazione',
                subtitle: 'Usa Face ID per accedere',
                description: 'Tocca il sensore per verificare la tua identità',
            });

            // Step 2: Get credentials from secure storage
            const credentials = await NativeBiometric.getCredentials({
                server: 'com.antigravity.chat',
            });

            if (!credentials || !credentials.password) {
                return { success: false, error: 'No credentials found' };
            }

            const identifier = credentials.username;
            const token = credentials.password;

            // Step 3: Call Backend Login
            const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/biometric/login` : '/api/auth/biometric/login';

            let response: Response;
            try {
                response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ token, identifier })
                });
            } catch (fetchError: any) {
                console.error('[Biometrics] Network error:', fetchError);
                return { success: false, error: 'Network error: ' + (fetchError?.message || 'Connection failed') };
            }

            let data: any;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('[Biometrics] Invalid response:', response.status);
                return { success: false, error: 'Server returned invalid response' };
            }

            if (!response.ok) {
                const errorMsg = data?.error || `Server error (${response.status})`;
                console.error('[Biometrics] Server rejected login:', errorMsg);

                // If token is invalid, clear stored credentials so user can re-setup
                if (response.status === 401) {
                    console.log('[Biometrics] Token invalid, clearing stored credentials');
                    await BiometricService.clear();
                }

                return { success: false, error: errorMsg };
            }

            return {
                success: true,
                user: data.user,
                sessionToken: data.sessionToken
            };

        } catch (error: any) {
            console.error('[Biometrics] Authentication failed:', error?.message || error);
            return { success: false, error: error?.message || 'Authentication failed' };
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
