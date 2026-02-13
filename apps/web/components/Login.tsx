
import React, { useState, useEffect } from 'react';
import { authClient, signIn, signUp } from '@/lib/auth-client';
import { User, Gender } from '@/types';
import { SERVER_URL } from '@/config';
import { Capacitor } from '@capacitor/core';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';
import { useKeyboardAnimation } from '@/hooks/useKeyboardAnimation';
import { BiometricService } from "@/lib/biometrics";
import { Haptics, NotificationType } from '@capacitor/haptics';
import { Fingerprint } from "lucide-react";
import { SocialLogin } from '@capgo/capacitor-social-login';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface LoginProps {
  onLogin: (user: User) => void;
  tenantName: string;
  tenantLogo?: string;
  requireExisting?: boolean;
}

type View = 'phone_input' | 'otp_verification' | 'profile_completion' | 'loading' | 'choice' | 'anonymous' | 'passkey_reg' | 'continue'; // Keeping old ones for safety during transition

// Local definition extending/matching expected user shape
// In a real app this should be imported from shared types that match DB
// Local definitions
// We need 'User' from types, but also compatible with better-auth session user which has name/image/email
interface AppUser extends User {
  name?: string;
  image?: string;
  phoneNumber?: string;
  email?: string;
  // ensure alias/gender are present or optional if they come from User
}

export default function Login({ onLogin, tenantName, tenantLogo, requireExisting }: LoginProps) {
  const [view, setView] = useState<View>('choice'); // Default to Choice selection
  const [existingUser, setExistingUser] = useState<AppUser | null>(null);
  const [alias, setAlias] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { keyboardHeight } = useKeyboardAnimation();

  // Biometric State
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(false);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);
  const [pendingUser, setPendingUser] = useState<AppUser | null>(null);
  const [pendingSessionToken, setPendingSessionToken] = useState<string | null>(null);
  const [biometricFailed, setBiometricFailed] = useState(false); // Track if FaceID failed to show account button

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      document.body.style.backgroundColor = '#ffffff';
      document.documentElement.style.backgroundColor = '#ffffff';
      Keyboard.setStyle({ style: KeyboardStyle.Light }).catch(() => { });

      // Initialize Social Login
      SocialLogin.initialize({
        google: {
          webClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_WEB || '',
          iOSClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_IOS || '',
          iOSServerClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_WEB || '', // CRITICAL for server-side token verification
          mode: 'online'
        },
        apple: {}
      });
    }
  }, []);

  // Check Biometrics on Mount
  useEffect(() => {
    const checkBio = async () => {
      const available = await BiometricService.isAvailable();
      const enabled = BiometricService.isEnabled();
      setIsBiometricsAvailable(available);
      setIsBiometricsEnabled(enabled);
    };
    checkBio();
  }, []);

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    setError(null);
    const result = await BiometricService.authenticate();

    if (result.success && result.user) {
      // Store session token in localStorage for native apps
      if (result.sessionToken) {
        localStorage.setItem('session_token', result.sessionToken);
      }

      // Construct user object and log in directly
      const appUser: AppUser = {
        id: result.user.id,
        name: result.user.name,
        alias: result.user.alias || result.user.name || 'User',
        phoneNumber: result.user.phoneNumber,
        email: result.user.email,
        image: result.user.image,
        gender: (result.user.gender as Gender) || 'other'
      };

      // Call onLogin with the user data - no need to reload
      onLogin(appUser);
    } else {
      // FaceID failed - show account button instead
      setBiometricFailed(true);
      // Re-check if biometrics are still enabled (might have been cleared due to invalid token)
      setIsBiometricsEnabled(BiometricService.isEnabled());
      setError(result.error || "Autenticazione biometrica fallita. Accedi normalmente per riattivare Face ID.");
      setIsLoading(false);
    }
  };

  const handleBiometricSetup = async () => {
    // Support both phone-based and email-based users (social login)
    const identifier = pendingUser?.phoneNumber || pendingUser?.email;

    if (!identifier) {
      setShowBiometricPrompt(false);
      if (pendingUser) onLogin(pendingUser);
      return;
    }

    try {
      // Pass session token for native apps where cookies don't work
      const success = await BiometricService.setup(
        identifier,
        pendingSessionToken || undefined
      );

      if (success) {
        await Haptics.notification({ type: NotificationType.Success });
        setIsBiometricsEnabled(true);
      }
    } catch (e) {
      console.error('[Login] Biometric setup failed:', e);
    } finally {
      // Always proceed to login, don't block user
      setShowBiometricPrompt(false);
      setPendingSessionToken(null);
      onLogin(pendingUser);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    setError(null);
    try {
      if (Capacitor.isNativePlatform()) {
        const platform = Capacitor.getPlatform();
        let googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_WEB || '';

        if (platform === 'ios') {
          googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_IOS || '';
        } else if (platform === 'android') {
          googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_ANDROID || '';
        }

        const loginOptions = provider === 'apple'
          ? { provider: 'apple' as const, options: { scopes: ['email', 'name'] } }
          : { provider: 'google' as const, options: {} };

        const result = await SocialLogin.login(loginOptions);

        if (result.result) {
          const authData = result.result as any;
          const idToken = authData.idToken || authData.id_token;
          const accessToken = authData.accessToken || authData.access_token;

          if (!idToken) {
            setError("Errore: token di autenticazione mancante");
            setIsLoading(false);
            return;
          }

          try {
            // Use custom native social login endpoint
            const url = `${SERVER_URL}/api/auth/social/native`;
            const profile = authData.profile || {};

            // Apple returns givenName/familyName/user, Google returns name/id
            const profileName = provider === 'apple'
              ? [profile.givenName, profile.familyName].filter(Boolean).join(' ') || undefined
              : profile.name || profile.displayName;

            const profileId = provider === 'apple'
              ? profile.user
              : profile.id;

            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                provider,
                idToken,
                requireExisting,
                profile: {
                  email: profile.email,
                  name: profileName,
                  imageUrl: profile.imageUrl || profile.picture,
                  id: profileId
                }
              })
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || 'Social login failed');
            }

            if (data.success && data.user) {
              // Store session token for native apps
              if (data.sessionToken) {
                localStorage.setItem('session_token', data.sessionToken);
              }

              const appUser: AppUser = {
                id: data.user.id,
                name: data.user.name,
                alias: data.user.alias || data.user.name || data.user.email?.split('@')[0],
                email: data.user.email,
                image: data.user.image,
                gender: (data.user.gender as Gender) || 'other'
              };

              // Check if we should prompt for biometrics (new user or never set up)
              if (isBiometricsAvailable && !isBiometricsEnabled) {
                setPendingUser(appUser);
                setPendingSessionToken(data.sessionToken || null);
                setShowBiometricPrompt(true);
                setIsLoading(false);
              } else {
                onLogin(appUser);
              }
            } else {
              throw new Error('Invalid response from server');
            }
          } catch (signInErr: any) {
            throw signInErr;
          }
        } else {
          console.warn(`[SocialLogin] Result.result is empty/null`);
          setIsLoading(false);
        }
      } else {
        if (requireExisting) {
          document.cookie = "local_no_signup=true; path=/; max-age=300; SameSite=Lax";
        }
        await signIn.social({
          provider,
          callbackURL: window.location.href + (window.location.href.includes('?') ? '&' : '?') + (requireExisting ? 'requireExisting=true' : ''),
        });
      }
    } catch (err: any) {
      setError(err.message || `Errore accesso con ${provider}`);
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (phone.length < 9) return;

    const formattedPhone = phone.replace(/ /g, '');
    const fullPhone = '+39' + formattedPhone;

    setIsLoading(true);
    const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/otp/send` : '/api/auth/otp/send';

    // DEBUG: Alert to check URL on device
    // alert(`Sending OTP to: ${url}`);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: fullPhone })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Errore invio SMS");
      }

      setIsLoading(false);
      setView('otp_verification');
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (otp.length !== 6) return;

    setIsLoading(true);
    try {
      const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/otp/verify` : '/api/auth/otp/verify';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          phone: '+39' + phone,
          code: otp,
          requireExisting
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Codice non valido");
      }

      // Special case: New user needs alias (now returns 200)
      if (data.isNewUser) {
        setIsLoading(false);
        setView('profile_completion');
        return;
      }

      if (data.success && data.user) {
        // Login successful
        const appUser = {
          ...data.user,
          alias: data.user.alias || data.user.name || 'User'
        };

        // Check if we should prompt for biometrics
        if (isBiometricsAvailable && !isBiometricsEnabled) {
          setPendingUser(appUser);
          setPendingSessionToken(data.sessionToken || null); // Store session token for biometric setup
          setShowBiometricPrompt(true);
          setIsLoading(false);
          // Don't call onLogin yet, wait for prompt interaction
        } else {
          onLogin(appUser);
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setIsLoading(true);
    try {
      // Retry verify with alias to create user
      const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/auth/otp/verify` : '/api/auth/otp/verify';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          phone: '+39' + phone,
          code: otp,
          alias: alias.trim(),
          gender: gender
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Errore creazione profilo");
      }

      if (data.success && data.user) {
        const appUser = {
          ...data.user,
          alias: data.user.alias || data.user.name || 'User'
        };

        // Check if we should prompt for biometrics
        if (isBiometricsAvailable && !isBiometricsEnabled) {
          setPendingUser(appUser);
          setPendingSessionToken(data.sessionToken || null); // Store session token for biometric setup
          setShowBiometricPrompt(true);
          setIsLoading(false);
        } else {
          onLogin(appUser);
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (session?.user) {
          // The session.user from better-auth usually has name/email/image/id etc.
          // We cast it to AppUser, assuming we extended User type properly or it is compatible enough
          // We might need to fetch full user details if session user is partial
          const user = session.user as unknown as AppUser;
          if (!user.alias && user.name) user.alias = user.name;

          setExistingUser(user);
          setView('continue');
        }
      } catch (e) {
        console.warn("[Login] Initial session check failed:", e);
      }
    };
    checkSession();
  }, []);

  const handleContinue = () => {
    if (existingUser) {
      onLogin(existingUser);
    }
  };

  const handleDifferentUser = () => {
    authClient.signOut().then(() => {
      setExistingUser(null);
      setView('phone_input');
    });
  };

  const handleAnonymousSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim()) return;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setIsLoading(true);
    try {
      // Check if user already has a session
      let existingSession = null;
      try {
        const result = await authClient.getSession();
        existingSession = result.data;
      } catch (sessionErr) {
        // Expected on first native run if relative URLs used
        // Continue as if no session exists
      }

      if (existingSession?.user?.isAnonymous) {
        // User already has an anonymous session, just update their info
        await authClient.updateUser({
          name: alias.trim(),
          // @ts-ignore - custom fields supported in auth.ts
          gender: gender
        });

        const user = {
          ...existingSession.user,
          alias: alias.trim(),
          gender: gender,
          joinedAt: Date.now()
        } as unknown as AppUser;

        onLogin(user);
      } else {
        // If a session exists but is NOT anonymous (e.g. Admin/User), force logout first
        // This prevents "leaking" admin permissions into a new anonymous session
        if (existingSession?.user) {
          console.log("[Login] Found non-anonymous session, forcing sign out before anonymous login...");
          await authClient.signOut();
        }

        // Create new anonymous session
        let signInData, error;
        try {
          const result = await authClient.signIn.anonymous();
          signInData = result.data;
          error = result.error;
        } catch (signInError: any) {
          // signIn.anonymous failed, trying manual fallback

          // FALLBACK 3: Manual Direct Fetch
          // This bypasses the better-auth client entirely to strictly control the request
          try {
            const baseUrl = Capacitor.isNativePlatform()
              ? (SERVER_URL || 'http://localhost:3000')
              : '';
            const fallbackUrl = `${baseUrl}/api/auth/sign-in/anonymous`;

            const res = await fetch(fallbackUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include' // This is critical for setting the session cookie
            });

            if (!res.ok) {
              const errorText = await res.text();
              throw new Error(`Manual fetch failed: ${res.status} ${errorText}`);
            }

            const data = await res.json();

            // Manual fetch succeeded, update state manually
            if (data?.user) {
              signInData = { user: data.user };
              // Clear error since we recovered
              error = null;
            } else {
              throw new Error("Manual fetch succeeded but returned no user");
            }

          } catch (manualErr: any) {
            throw new Error(`Fallback Failed: ${manualErr.message}`);
          }
        }

        if (error) throw new Error(error.message || "Errore accesso anonimo");

        // Update user with alias and gender
        try {
          // Try to update user using client first (might work if session cookie was set by manual fetch)
          await authClient.updateUser({
            name: alias.trim(),
            gender: gender
          } as any);
        } catch (updateErr) {
          console.warn("[Login] updateUser failed after login, user might need to retry profile update later", updateErr);
          // Don't block login if just profile update fails, we have the user
        }

        // Sync BetterAuth client state after sign-in
        // This ensures the session cookie is recognized by authClient for socket auth
        const postSignInSession = await authClient.getSession();
        if (!postSignInSession?.data?.user) {
          console.warn("[Login] BetterAuth getSession() returned null after anonymous sign-in — socket will use cookie fallback");
        }

        // Use signIn user data with manual updates
        const createdUserRaw = signInData?.user || postSignInSession?.data?.user;

        if (createdUserRaw) {
          const user = {
            ...createdUserRaw,
            alias: alias.trim(),
            gender: gender,
            joinedAt: Date.now()
          } as unknown as AppUser;

          onLogin(user);
        }
      }
    } catch (err: any) {
      // Special handling: if server says we are already logged in anonymously but client doesn't know
      if (err.message && err.message.includes("Anonymous users cannot sign in again")) {
        // Recovering from 'already signed in' state

        // Force update regardless of session state since we know we have a valid session token
        // Catch result directly
        await authClient.updateUser({
          name: alias.trim(),
          gender: gender
        } as any);

        // Note: updateUser returns { status: true } on success, NOT the user object.
        // So we cannot use it for immediate login. We MUST use one of the fallbacks.

        // Fallback 1: Force fetch session again (standard)
        const sessionResult = await authClient.getSession();

        if (sessionResult.data?.user) {
          const user = {
            ...sessionResult.data.user,
            alias: alias.trim(),
            gender: gender,
            joinedAt: Date.now()
          } as unknown as AppUser;
          onLogin(user);
          return;
        }

        // Fallback 2: Custom debug endpoint (Bypass better-auth client)
        try {
          const url = Capacitor.isNativePlatform() ? `${SERVER_URL}/api/debug-session` : '/api/debug-session';
          const res = await fetch(url, { credentials: 'include' });
          const debugData = await res.json();

          if (debugData?.user) {
            const user = {
              ...debugData.user,
              alias: alias.trim(),
              gender: gender,
              joinedAt: Date.now()
            } as unknown as AppUser;
            onLogin(user);
            return;
          }
        } catch (e) {
          // Silently fail on fallback 2
        }
      }

      setError(err.message);
      setIsLoading(false);
    }
  };

  // Feature detection for WebAuthn/Passkeys
  const isWebAuthnSupported = typeof window !== 'undefined' &&
    !!window.PublicKeyCredential &&
    (window.isSecureContext || window.location.hostname === 'localhost');


  const genderLabels: Record<Gender, string> = {
    male: 'Maschio',
    female: 'Femmina',
    other: 'Altro'
  };

  // Removed fallback Loading view block to support inline loading state

  return (
    <div
      className="bg-white px-6 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))] sm:p-8 w-full h-full sm:h-auto sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:border border-gray-100 flex flex-col min-h-screen sm:min-h-[600px] justify-between"
      style={{ paddingBottom: `${keyboardHeight > 0 ? keyboardHeight + 24 : 24}px`, overflowY: keyboardHeight > 0 ? 'auto' : 'hidden' }}
    >
      <div className={`flex flex-col items-center transition-all duration-500 ${view === 'choice' || view === 'continue' ? 'mt-4 mb-2' : 'mt-2 mb-2'}`}>
        <div className={`transition-all duration-300 ${view === 'choice' || view === 'continue' ? 'w-24 h-24 mb-12' : 'w-16 h-16 mb-2'}`}>
          {tenantLogo ? (
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-transparent">
              <img src={tenantLogo} alt={tenantName} className="w-full h-full object-cover" />
            </div>
          ) : (
            <img src="/local_logo.svg" alt="Local Logo" className="w-full h-full object-contain" />
          )}
        </div>

        {(view === 'choice' || view === 'continue') && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-700 text-center">
            <p className="text-primary font-bold text-[11px] uppercase tracking-[0.25em] mb-12 sm:mb-20 px-8 leading-relaxed">
              Chatta con le persone intorno a te
            </p>

            <div className="space-y-2">
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-medium">Ti trovi nello spazio:</p>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                {tenantName}
              </h1>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">

          {view === 'choice' && (
            <div className="space-y-4 pt-8">
              {/* FaceID button: Show only if biometrics available, enabled, and NOT failed */}
              {isBiometricsAvailable && isBiometricsEnabled && !biometricFailed && (
                <button
                  onClick={handleBiometricLogin}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
                >
                  <Fingerprint className="w-6 h-6" />
                  <span>Accedi con FaceID</span>
                </button>
              )}

              {/* Account button: Show if biometrics NOT enabled OR if FaceID failed */}
              {(!isBiometricsEnabled || biometricFailed) && (
                <button
                  onClick={() => setView('phone_input')}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Accedi con Account</span>
                </button>
              )}

              {/* Anonymous button: Always shown last (unless restricted) */}
              {!requireExisting && (
                <button
                  onClick={() => setView('anonymous')}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">🕵️</span>
                  <span>Accesso anonimo</span>
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center animate-pulse">
              {error}
            </div>
          )}

          {view === 'continue' && existingUser && (
            <div className="space-y-6 text-center">
              <div className="mb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 shadow-inner">
                  {existingUser.image ? (
                    <img src={existingUser.image} className="w-full h-full rounded-full border-2 border-white" alt={existingUser.name} />
                  ) : (
                    <span className="opacity-80">👤</span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Ciao, {existingUser.name}!</h2>
                <p className="text-gray-500 mt-2">Il tuo profilo è pronto. Entra subito nella chat dello spazio.</p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Entra nella Chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                onClick={handleDifferentUser}
                className="text-gray-400 text-sm hover:text-gray-600 font-medium transition-colors"
              >
                Usa un altro account
              </button>
            </div>
          )}

          {view === 'anonymous' && (
            <form onSubmit={handleAnonymousSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Benvenuto</h2>
                <p className="text-sm text-gray-500">Scegli un alias per entrare subito</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Il tuo Alias</label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  maxLength={20}
                  // Removed duplicate maxLength prop which was causing conflict in previous chunk
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="es. ShadowHunter"
                  className="w-full px-4 py-3 rounded-xl focus:outline-none text-gray-800"
                  style={{ fontSize: '18px' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Identità di Genere</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['male', 'female', 'other'] as Gender[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${gender === g
                        ? 'bg-primary/10 text-primary border-primary shadow-sm'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-primary/50'
                        }`}
                    >
                      {genderLabels[g]}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20">
                Entra nella Stanza
              </button>

              <button type="button" onClick={() => setView('choice')} className="w-full text-gray-400 text-sm flex items-center justify-center gap-1 hover:text-gray-600 mt-4">
                ← Torna indietro
              </button>
            </form>
          )}

          {view === 'phone_input' && (
            <div className="space-y-6 pt-4">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">Accedi</h2>
                <p className="text-sm text-gray-500">Scegli un metodo per accedere o registrarti</p>
              </div>

              {/* FaceID button: Show if biometrics available and enabled */}
              {isBiometricsAvailable && isBiometricsEnabled && (
                <button
                  type="button"
                  onClick={handleBiometricLogin}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <Fingerprint className="w-6 h-6" />
                  <span>Accedi con Face ID</span>
                </button>
              )}

              {/* SSO Section */}
              <div className="flex gap-3">
                {(Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android' || !Capacitor.isNativePlatform()) && (
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700 shadow-sm active:scale-95 disabled:opacity-50"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    <span>Google</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all font-bold shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5 invert" />
                  <span>Apple ID</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">oppure</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Numero di Telefono</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none pointer-events-none">🇮🇹 +39</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onFocus={(e) => {
                        // Scroll the whole page so that the input is at the top
                        setTimeout(() => {
                          e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 300);
                      }}
                      onChange={(e) => {
                        // Allow only numbers
                        const val = e.target.value.replace(/\D/g, '');
                        setPhone(val);
                      }}
                      disabled={isLoading}
                      placeholder="333 1234567"
                      className="w-full pl-20 pr-4 py-3 rounded-xl focus:outline-none text-gray-800 font-medium tracking-wide disabled:bg-gray-50 disabled:text-gray-400 border border-transparent focus:border-primary/20"
                      style={{ fontSize: '18px' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={phone.length < 9 || isLoading}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <span>Invia Codice Verifica</span>
                  )}
                </button>

                <button type="button" onClick={() => setView('choice')} className="w-full text-gray-400 text-sm flex items-center justify-center gap-1 hover:text-gray-600 mt-4">
                  ← Torna indietro
                </button>
              </form>
            </div>
          )}

          {view === 'otp_verification' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <button type="button" disabled={isLoading} onClick={() => setView('phone_input')} className="text-gray-400 text-sm flex items-center gap-1 hover:text-gray-600 mb-2">
                ← Modifica numero
              </button>

              <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-gray-800">Verifica Numero</h2>
                <p className="text-sm text-gray-500">Codice inviato a +39 {phone}</p>
              </div>

              <div>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="0 0 0 0 0 0"
                  disabled={isLoading}
                  className="w-full px-4 py-4 text-center rounded-xl focus:outline-none text-gray-800 font-bold tracking-[0.5em] disabled:bg-gray-50 disabled:text-gray-400"
                  style={{ fontSize: '24px' }}
                />
              </div>

              <button
                type="submit"
                disabled={otp.length !== 6 || isLoading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  "Verifica e Accedi"
                )}
              </button>
            </form>
          )}

          {view === 'profile_completion' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Completa Profilo</h2>
                <p className="text-sm text-gray-500">Dicci come chiamarti</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Il tuo Nome (Alias)</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  disabled={isLoading}
                  placeholder="es. Mario Rossi"
                  className="w-full px-4 py-3 rounded-xl focus:outline-none text-gray-800 disabled:bg-gray-50"
                  style={{ fontSize: '18px' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Genere</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['male', 'female', 'other'] as Gender[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      disabled={isLoading}
                      className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${gender === g
                        ? 'bg-primary/10 text-primary border-primary shadow-sm'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-primary/50'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {genderLabels[g]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!alias.trim() || isLoading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  "Entra nella Chat"
                )}
              </button>
            </form>
          )}

          {/* Legacy/Other views removed for Phone-First enforcement */}



          <div className="py-8 border-t border-gray-50/50 mt-auto flex items-center justify-center gap-2">
            <img src="/local_logo.svg" alt="" className="w-5 h-5 opacity-80" />
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium opacity-50">
              Powered by Local &bull; Copyright 2026
            </p>
          </div>
        </div>
        {/* PWA Install Prompt - Subtle */}
        {/* ... existing PWA prompt ... */}

        {/* Biometric Setup Dialog */}
        <Dialog open={showBiometricPrompt} onOpenChange={(open) => {
          if (!open && pendingUser) {
            setShowBiometricPrompt(false);
            onLogin(pendingUser); // Proceed if dismissed
          }
        }}>
          <DialogContent className="sm:max-w-md p-6 bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-2xl">
            <DialogHeader>
              <div className="flex flex-col items-center text-center space-y-6 py-4">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-2 animate-bounce-slow">
                  <Fingerprint className="w-10 h-10 text-blue-600" />
                </div>

                <div className="space-y-2">
                  <DialogTitle className="text-2xl font-black text-gray-900">Accesso Rapido</DialogTitle>
                  <DialogDescription className="text-gray-500 text-base">
                    Attiva FaceID/TouchID per accedere al tuo account in un istante, senza SMS.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <div className="grid grid-cols-2 gap-3 w-full pt-4">
                <button
                  onClick={() => { setShowBiometricPrompt(false); if (pendingUser) onLogin(pendingUser); }}
                  className="px-4 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Più tardi
                </button>
                <button
                  onClick={handleBiometricSetup}
                  className="px-4 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all transform active:scale-95"
                >
                  Attiva Ora
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
