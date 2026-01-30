
import React, { useState } from 'react';
import { User, Gender } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  tenantName: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, tenantName }) => {
  const [alias, setAlias] = useState('');
  const [gender, setGender] = useState<Gender>('male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim()) return;

    // Forza il blur per chiudere la tastiera su mobile (iOS CNA)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      alias: alias.trim(),
      gender,
      joinedAt: Date.now(),
    };

    onLogin(newUser);
  };

  const genderLabels: Record<Gender, string> = {
    male: 'Maschio',
    female: 'Femmina',
    other: 'Altro'
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4 shadow-lg shadow-emerald-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{tenantName}</h1>
        <p className="text-gray-500 mt-2 text-sm">chatta in modo anonimo con le persone intorno a te</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Il tuo Alias</label>
          <input
            type="text"
            required
            maxLength={20}
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="es. ShadowHunter"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-800 placeholder-gray-300"
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

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group"
        >
          Entra nella Stanza
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>

      <p className="text-center text-[10px] text-gray-400 mt-8 uppercase tracking-widest">
        Zero database esterni • Privacy totale
      </p>
    </div>
  );
};

export default Login;
