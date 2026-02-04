import React, { useState } from 'react';
import { authClient, signIn, signUp } from '@/lib/auth-client';
import { User, Gender } from '@/types';

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
        setError(passkeyError.message || "Errore durante la registrazione biometrica");
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
      if (err.name === 'NotAllowedError') {
        setError("L'operazione non è permessa in questo contesto. Assicurati di usare 'localhost' o HTTPS per accedere alla chat.");
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
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Oppure</span></div>
          </div>
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

      {view === 'passkey_reg' && (
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
