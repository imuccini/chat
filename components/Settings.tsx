import React, { useState } from 'react';
import { User } from '@/types';

interface SettingsProps {
    user: User;
    onLogout: () => void;
    onUpdateAlias: (newAlias: string) => void;
    onUpdateStatus: (newStatus: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onLogout, onUpdateAlias, onUpdateStatus }) => {
    const [isEditingAlias, setIsEditingAlias] = useState(false);
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [newAlias, setNewAlias] = useState(user.alias);
    const [newStatus, setNewStatus] = useState(user.status || '');

    const handleSaveAlias = () => {
        if (newAlias.trim() && newAlias !== user.alias) {
            onUpdateAlias(newAlias.trim());
        }
        setIsEditingAlias(false);
    };

    const handleSaveStatus = () => {
        if (newStatus.trim() !== (user.status || '')) {
            onUpdateStatus(newStatus.trim());
        }
        setIsEditingStatus(false);
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

                    {/* Alias Section */}
                    {isEditingAlias ? (
                        <div className="w-full flex flex-col items-center gap-2 mb-3">
                            <input
                                type="text"
                                value={newAlias}
                                onChange={(e) => setNewAlias(e.target.value)}
                                maxLength={20}
                                className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center text-lg font-bold"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button onClick={handleSaveAlias} className="px-4 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold">Salva</button>
                                <button onClick={() => { setIsEditingAlias(false); setNewAlias(user.alias); }} className="px-4 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-sm font-bold">Annulla</button>
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-1">
                            {user.alias}
                            <button onClick={() => setIsEditingAlias(true)} className="p-1 text-gray-400 hover:text-emerald-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </h2>
                    )}

                    {/* Status Section */}
                    {isEditingStatus ? (
                        <div className="w-full flex flex-col items-center gap-2 mt-2">
                            <input
                                type="text"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                maxLength={50}
                                placeholder="Es. In viaggio verso Roma..."
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center text-sm"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button onClick={handleSaveStatus} className="px-4 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-bold">Salva</button>
                                <button onClick={() => { setIsEditingStatus(false); setNewStatus(user.status || ''); }} className="px-4 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-sm font-bold">Annulla</button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditingStatus(true)}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors mt-1"
                        >
                            <span className="italic">{user.status || 'Aggiungi uno stato...'}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    )}

                    <p className="text-gray-400 capitalize text-xs mt-3">{user.gender}</p>
                    <p className="text-[10px] text-gray-300 mt-1 font-mono uppercase tracking-widest">{user.id}</p>
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
