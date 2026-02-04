import React, { useState } from 'react';
import { authClient, signIn, signUp } from '@/lib/auth-client';
import { User, Gender } from '@/types';
import { Capacitor } from '@capacitor/core';

interface LoginProps {
  onLogin: (user: User) => void;
  tenantName: string;
}

type View = 'choice' | 'anonymous' | 'passkey_reg' | 'loading';

const Login: React.FC<LoginProps> = ({ onLogin, tenantName }) => {
  const [view, setView] = useState<View>('choice');
  const [alias, setAlias] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Feature detection for WebAuthn/Passkeys
  const isWebAuthnSupported = typeof window !== 'undefined' &&
    !!window.PublicKeyCredential &&
    (window.isSecureContext || window.location.hostname === 'localhost');

  // Platform & Social visibility
  const platform = Capacitor.getPlatform();
  const isApple = platform === 'ios' || (typeof window !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
  const isAndroid = platform === 'android' || (typeof window !== 'undefined' && /Android/.test(navigator.userAgent));

  const showApple = isApple && !!process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
  const showGoogle = isAndroid && !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const anySocial = showApple || showGoogle;

  const handleAnonymousSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim()) return;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onLogin({
      id: `guest_${Math.random().toString(36).substr(2, 9)}`,
      alias: alias.trim(),
      gender,
      joinedAt: Date.now(),
    });
  };

  const handlePasskeyLogin = async () => {
    setError(null);
    setView('loading');
    try {
      console.log("[Passkey] Starting authentication...");
      const { data, error } = await authClient.signIn.passkey();
      if (error) {
        console.error("[Passkey] Login error:", error);
        if (error.status === 404 || (error as any).code === "PASSKEY_NOT_FOUND") {
          setError("Nessuna Passkey trovata per questo dispositivo. Registrati prima!");
        } else if (error.message === "auth cancelled" || error.message === "Authentication cancelled") {
          setError("Autenticazione fallita");
        } else {
          setError(error.message || "Errore durante l'accesso");
        }
        setView('choice');
      }
    } catch (err: any) {
      console.error("[Passkey] Unexpected login error:", err);
      if (err.name === 'NotAllowedError') {
        setError("L'operazione non è permessa in questo contesto. Assicurati di usare 'localhost' o HTTPS per accedere alla chat.");
      } else {
        setError(err.message || "Errore inaspettato");
      }
      setView('choice');
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setError(null);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: window.location.href, // Return to current page/tenant
      });
    } catch (err: any) {
      console.error(`[Social] ${provider} login error:`, err);
      setError(`Errore durante l'accesso con ${provider}`);
    }
  };

  const handlePasskeyRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim() || !phone.trim()) return;

    setError(null);
    setView('loading');
    try {
      // Set a flag so ChatInterface doesn't redirect immediately upon anonymous session creation
      localStorage.setItem('waiting_for_passkey', 'true');

      // 1. Create anonymous session first (Passkey registration requires a session)
      const { data: anonData, error: anonError } = await authClient.signIn.anonymous();
      if (anonError) {
        localStorage.removeItem('waiting_for_passkey');
        setError(anonError.message || "Errore durante l'inizializzazione");
        setView('passkey_reg');
        return;
      }

      // 2. Update user profile
      const { error: updateError } = await authClient.updateUser({
        name: alias.trim(),
        // @ts-ignore - custom fields
        phoneNumber: phone.trim(),
        gender: gender
      });
      if (updateError) {
        console.warn("Profile update failed, continuing with passkey", updateError);
      }

      // 3. Register the Passkey
      console.log("[Passkey] Starting biometric registration...");
      const { data, error: passkeyError } = await authClient.passkey.addPasskey({
        name: 'Passkey Principale'
      });

      if (passkeyError) {
        console.error("[Passkey] Registration error:", passkeyError);
        localStorage.removeItem('waiting_for_passkey');
        if (passkeyError.message === "auth cancelled" || passkeyError.message === "Authentication cancelled") {
          setError("Autenticazione fallita");
        } else {
          setError(passkeyError.message || "Errore durante la registrazione biometrica");
        }
        setView('passkey_reg');
      } else {
        console.log("[Passkey] Registration successful!");

        // Final "Account Upgrade": Set isAnonymous to false
        await authClient.updateUser({
          // @ts-ignore
          isAnonymous: false
        });

        localStorage.removeItem('waiting_for_passkey');
        // Force session refresh or manually callback
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err: any) {
      console.error("[Passkey] Unexpected error:", err);
      localStorage.removeItem('waiting_for_passkey');
      if (err.name === 'NotAllowedError' || err.message === "auth cancelled" || err.message === "Authentication cancelled") {
        setError(err.name === 'NotAllowedError'
          ? "L'operazione non è permessa in questo contesto. Assicurati di usare 'localhost' o HTTPS per accedere alla chat."
          : "Autenticazione fallita");
      } else {
        setError(err.message || "Errore inaspettato");
      }
      setView('passkey_reg');
    }
  };

  const genderLabels: Record<Gender, string> = {
    male: 'Maschio',
    female: 'Femmina',
    other: 'Altro'
  };

  if (view === 'loading') {
    return (
      <div className="bg-white p-6 sm:p-8 w-full h-full sm:h-auto sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:border border-gray-100 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4" />
        <p className="text-gray-500">In attesa...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 w-full h-full sm:h-auto sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:border border-gray-100 flex flex-col justify-center">
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <img src="/local_logo.svg" alt="Local Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{tenantName}</h1>
        {view === 'choice' && <p className="text-gray-500 mt-2 text-sm">chatta in modo anonimo o crea un profilo sicuro</p>}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      {view === 'choice' && (
        <div className="space-y-4">
          <button
            onClick={() => setView('anonymous')}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-2"
          >
            Accesso anonimo
          </button>

          {(anySocial || isWebAuthnSupported) && (
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Oppure</span></div>
            </div>
          )}

          {anySocial && (
            <div className="flex gap-3">
              {showApple && (
                <button
                  onClick={() => handleSocialLogin('apple')}
                  className="flex-1 bg-black hover:bg-zinc-900 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.88-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.02zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                  Apple
                </button>
              )}
              {showGoogle && (
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Google
                </button>
              )}
            </div>
          )}

          {isWebAuthnSupported && (
            <>
              <button
                onClick={handlePasskeyLogin}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              >
                Accedi con Passkey
              </button>
              <button
                onClick={() => setView('passkey_reg')}
                className="w-full text-emerald-600 font-semibold text-sm hover:underline py-2"
              >
                Non hai un account? Registrati con Passkey
              </button>
            </>
          )}
        </div>
      )}

      {view === 'anonymous' && (
        <form onSubmit={handleAnonymousSubmit} className="space-y-6">
          <button onClick={() => setView('choice')} className="text-gray-400 text-sm flex items-center gap-1 hover:text-gray-600 mb-2">
            ← Torna indietro
          </button>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Il tuo Alias</label>
            <input
              type="text"
              required
              maxLength={20}
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="es. ShadowHunter"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-800"
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
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200">
            Entra nella Stanza
          </button>
        </form>
      )}

      {isWebAuthnSupported && view === 'passkey_reg' && (
        <form onSubmit={handlePasskeyRegister} className="space-y-6">
          <button onClick={() => setView('choice')} className="text-gray-400 text-sm flex items-center gap-1 hover:text-gray-600 mb-2">
            ← Torna indietro
          </button>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Scegli un Alias</label>
            <input
              type="text"
              required
              maxLength={20}
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="es. MarcoPass"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cellulare (per il recupero)</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+39 333 1234567"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-800"
            />
          </div>
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
            Crea Account con Passkey
          </button>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Il tuo numero verrà utilizzato esclusivamente per permetterti di recuperare l'accesso in caso di smarrimento del dispositivo.
          </p>
        </form>
      )}

      <p className="text-center text-[10px] text-gray-400 mt-8 uppercase tracking-widest">
        Powered by Local - Copyright 2025
      </p>
    </div>
  );
};

export default Login;
