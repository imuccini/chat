import React, { useState, useEffect } from 'react';
import { authClient, signIn, signUp } from '@/lib/auth-client';
import { User, Gender } from '@/types';
import { SERVER_URL } from '@/config';
import { Capacitor } from '@capacitor/core';
import { Keyboard, KeyboardStyle } from '@capacitor/keyboard';

interface LoginProps {
  onLogin: (user: User) => void;
  tenantName: string;
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

const Login: React.FC<LoginProps> = ({ onLogin, tenantName }) => {
  const [view, setView] = useState<View>('choice'); // Default to Choice selection
  const [existingUser, setExistingUser] = useState<AppUser | null>(null);
  const [alias, setAlias] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      document.body.style.backgroundColor = '#ffffff';
      document.documentElement.style.backgroundColor = '#ffffff';
      Keyboard.setStyle({ style: KeyboardStyle.Light }).catch(() => { });
    }
  }, []);

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
        body: JSON.stringify({ phone: '+39' + phone, code: otp }) // Alias is optional here, we check user existence
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
        // Ensure user has alias (map from name if needed)
        const appUser = {
          ...data.user,
          alias: data.user.alias || data.user.name || 'User'
        };

        onLogin(appUser);
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
        onLogin(appUser);
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
      // DEBUG: Log the URL being used for auth requests
      console.log("[Login] DEBUG - Capacitor.isNativePlatform():", Capacitor.isNativePlatform());
      console.log("[Login] DEBUG - SERVER_URL:", SERVER_URL);
      console.log("[Login] DEBUG - authClient baseURL:", (authClient as any).$fetch?.baseURL || 'using relative URLs');

      // Check if user already has a session
      let existingSession = null;
      try {
        const result = await authClient.getSession();
        existingSession = result.data;
        console.log("[Login] Existing session check:", JSON.stringify(existingSession, null, 2));
      } catch (sessionErr) {
        console.warn("[Login] Failed to check existing session (expected on first native run if relative URLs used):", sessionErr);
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
        // Create new anonymous session
        console.log("[Login] DEBUG - Calling authClient.signIn.anonymous()...");
        let signInData, error;
        try {
          const result = await authClient.signIn.anonymous();
          signInData = result.data;
          error = result.error;
          console.log("[Login] DEBUG - signIn.anonymous result:", JSON.stringify(result, null, 2));
        } catch (signInError: any) {
          console.error("[Login] DEBUG - signIn.anonymous failed, trying manual fallback:", signInError);

          // FALLBACK 3: Manual Direct Fetch
          // This bypasses the better-auth client entirely to strictly control the request
          try {
            const baseUrl = Capacitor.isNativePlatform()
              ? (SERVER_URL || 'http://192.168.1.111:3000')
              : '';
            const fallbackUrl = `${baseUrl}/api/auth/sign-in/anonymous`;

            console.log("[Login] DEBUG - Attempting manual fetch to:", fallbackUrl);

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
            console.log("[Login] DEBUG - Manual fallback success:", data);

            // Manual fetch succeeded, update state manually
            if (data?.user) {
              signInData = { user: data.user };
              // Clear error since we recovered
              error = null;
            } else {
              throw new Error("Manual fetch succeeded but returned no user");
            }

          } catch (manualErr: any) {
            console.error("[Login] DEBUG - Manual fallback ALSO failed:", manualErr);
            // Throw original error to show in alert/UI, or combine them

            // Extract more info if available
            let detailedError = manualErr.message;
            if (manualErr.cause) detailedError += ` Cause: ${manualErr.cause}`;
            if (manualErr.stack) console.error(manualErr.stack);

            throw new Error(`Fallback Failed: ${detailedError}`);
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

        // Use signIn user data with manual updates
        const createdUserRaw = signInData?.user;

        if (createdUserRaw) {
          const user = {
            ...createdUserRaw,
            alias: alias.trim(),
            gender: gender,
            joinedAt: Date.now()
          } as unknown as AppUser;

          onLogin(user);
        } else {
          // Fallback to getSession only if absolutely necessary
          const { data: sessionData } = await authClient.getSession();
          if (sessionData?.user) {
            const user = {
              ...sessionData.user,
              alias: alias.trim(),
              gender: gender,
              joinedAt: Date.now()
            } as unknown as AppUser;

            onLogin(user);
          }
        }
      }
    } catch (err: any) {
      // Special handling: if server says we are already logged in anonymously but client doesn't know
      if (err.message && err.message.includes("Anonymous users cannot sign in again")) {
        console.log("[Login] Recovering from 'already signed in' state...");

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

      // TEMPORARY DEBUG: Show alert with error details for native debugging
      if (Capacitor.isNativePlatform()) {
        alert(`DEBUG ERROR:\n${err.name}: ${err.message}`);
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
    <div className="bg-white p-6 sm:p-8 w-full h-full sm:h-auto sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:border border-gray-100 flex flex-col min-h-screen sm:min-h-[600px] justify-between">
      <div className={`flex flex-col items-center transition-all duration-500 ${view === 'choice' || view === 'continue' ? 'mt-4 mb-2' : 'mt-2 mb-2'}`}>
        <div className={`transition-all duration-300 ${view === 'choice' || view === 'continue' ? 'w-24 h-24 mb-12' : 'w-16 h-16 mb-2'}`}>
          <img src="/local_logo.svg" alt="Local Logo" className="w-full h-full object-contain" />
        </div>

        {(view === 'choice' || view === 'continue') && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-700 text-center">
            <p className="text-emerald-600 font-bold text-[11px] uppercase tracking-[0.25em] mb-20 px-8 leading-relaxed">
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

      <div className="flex-1 flex flex-col justify-center py-12">

        {view === 'choice' && (
          <div className="space-y-4">
            <button
              onClick={() => setView('anonymous')}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border-2 border-gray-100 hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center gap-2 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">🕵️</span>
              <span>Accedi come Anonimo</span>
            </button>

            <button
              onClick={() => setView('phone_input')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
            >
              <span>Accedi con Account</span>
            </button>
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
              <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 shadow-inner">
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
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2"
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
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="es. ShadowHunter"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
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
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-200'
                      }`}
                  >
                    {genderLabels[g]}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200">
              Entra nella Stanza
            </button>

            <button type="button" onClick={() => setView('choice')} className="w-full text-gray-400 text-sm flex items-center justify-center gap-1 hover:text-gray-600 mt-4">
              ← Torna indietro
            </button>
          </form>
        )}

        {view === 'phone_input' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Accedi</h2>
              <p className="text-sm text-gray-500">Inserisci il tuo numero per accedere al profilo</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Numero di Telefono</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none pointer-events-none">🇮🇹 +39</span>
                <input
                  type="tel"
                  required
                  autoFocus
                  value={phone}
                  onChange={(e) => {
                    // Allow only numbers
                    const val = e.target.value.replace(/\D/g, '');
                    setPhone(val);
                  }}
                  disabled={isLoading}
                  placeholder="333 1234567"
                  className="w-full pl-20 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 font-medium tracking-wide disabled:bg-gray-50 disabled:text-gray-400"
                  style={{ fontSize: '18px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={phone.length < 9 || isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2"
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
                className="w-full px-4 py-4 text-center rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 font-bold tracking-[0.5em] disabled:bg-gray-50 disabled:text-gray-400"
                style={{ fontSize: '24px' }}
              />
            </div>

            <button
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 disabled:bg-gray-50"
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
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-200'
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
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center"
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



        <div className="py-8 border-t border-gray-50/50 mt-auto">
          <p className="text-center text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium opacity-50">
            Powered by Local &bull; Copyright 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
