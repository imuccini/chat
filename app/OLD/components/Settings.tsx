import React, { useState } from 'react';
import { User } from '@/types';

interface SettingsProps {
    user: User;
    onLogout: () => void;
    onUpdateAlias: (newAlias: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onLogout, onUpdateAlias }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newAlias, setNewAlias] = useState(user.alias);

    const handleSave = () => {
        if (newAlias.trim() && newAlias !== user.alias) {
            onUpdateAlias(newAlias.trim());
        }
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="bg-white pt-safe border-b border-gray-100 sticky top-0 z-10">
                <div className="h-[60px] px-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Profilo</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Profile Card */}
                <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                        {user.alias.charAt(0).toUpperCase()}
                    </div>

                    {isEditing ? (
                        <div className="w-full flex flex-col items-center gap-2">
                            <input
                                type="text"
                                value={newAlias}
                                onChange={(e) => setNewAlias(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center text-lg font-bold"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button onClick={handleSave} className="px-4 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold">Salva</button>
                                <button onClick={() => { setIsEditing(false); setNewAlias(user.alias); }} className="px-4 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-sm font-bold">Annulla</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {user.alias}
                                <button onClick={() => setIsEditing(true)} className="p-1 text-gray-400 hover:text-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            </h2>
                            <p className="text-gray-500 capitalize">{user.gender}</p>
                            <p className="text-[10px] text-gray-400 mt-1 font-mono uppercase tracking-widest">{user.id}</p>
                        </>
                    )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                    >
                        <div className="p-2 bg-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <span className="font-semibold">Disconnetti</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Settings;
