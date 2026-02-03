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
        <div className="flex flex-col h-full bg-gray-50">
            <header className="bg-white pt-safe border-b border-gray-100 sticky top-0 z-10">
                <div className="h-[60px] px-4 flex items-center">
                    <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto">
                {/* Scrollable area needs padding to clear the FIXED BottomNav */}
                <div className="pb-32">

                    {/* Avatar Section */}
                    <div className="py-8 flex flex-col items-center bg-white border-b border-gray-100">
                        <div className="relative group">
                            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-sm overflow-hidden">
                                {user.alias.charAt(0).toUpperCase()}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                        <button className="mt-4 text-emerald-600 font-medium text-sm hover:opacity-75">Edit</button>
                    </div>

                    {/* Info Groups */}
                    <div className="mt-6 space-y-6">
                        {/* About Section */}
                        <div>
                            <h3 className="px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">About</h3>
                            <div className="bg-white border-y border-gray-100">
                                <button
                                    onClick={() => setIsEditingStatus(true)}
                                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex flex-col items-start truncate overflow-hidden">
                                        {isEditingStatus ? (
                                            <input
                                                type="text"
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}
                                                onBlur={handleSaveStatus}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveStatus()}
                                                maxLength={50}
                                                className="text-[17px] text-gray-900 focus:outline-none w-full bg-transparent"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="text-[17px] text-gray-900 truncate overflow-hidden w-full text-left">
                                                {user.status || 'Available'}
                                            </span>
                                        )}
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Name Section */}
                        <div>
                            <h3 className="px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</h3>
                            <div className="bg-white border-y border-gray-100">
                                <button
                                    onClick={() => setIsEditingAlias(true)}
                                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex flex-col items-start">
                                        {isEditingAlias ? (
                                            <input
                                                type="text"
                                                value={newAlias}
                                                onChange={(e) => setNewAlias(e.target.value)}
                                                onBlur={handleSaveAlias}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveAlias()}
                                                maxLength={20}
                                                className="text-[17px] text-gray-900 focus:outline-none w-full bg-transparent"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="text-[17px] text-gray-900">
                                                {user.alias}
                                            </span>
                                        )}
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Account Info Section */}
                        <div>
                            <h3 className="px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Account</h3>
                            <div className="bg-white border-y border-gray-100 divide-y divide-gray-50">
                                <div className="px-4 py-3.5 flex items-center justify-between">
                                    <span className="text-[17px] text-gray-400 capitalize">Gender</span>
                                    <span className="text-[17px] text-gray-900">{user.gender}</span>
                                </div>
                                <div className="px-4 py-3.5 flex items-center justify-between">
                                    <span className="text-[17px] text-gray-400">User ID</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{user.id}</span>
                                </div>
                            </div>
                        </div>

                        {/* Red Actions Section */}
                        <div className="pt-4">
                            <div className="bg-white border-y border-gray-100">
                                <button
                                    onClick={onLogout}
                                    className="w-full px-4 py-4 flex items-center justify-center text-red-600 font-semibold text-lg hover:bg-red-50 transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
