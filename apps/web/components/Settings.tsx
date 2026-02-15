import React, { useState, useRef } from 'react';
import { User } from '@/types';
import { useMembership } from '@/hooks/useMembership';
import { ShieldCheck, ShieldAlert, Camera, User as UserIcon, Mail, Phone, CheckCircle2, UserCircle2, Loader2 } from 'lucide-react';
import { compressImage } from '@/lib/imageCompression';
import { clientUploadAvatar } from '@/services/apiService';
import { resolveAvatarUrl } from '@/lib/avatarUrl';

interface SettingsProps {
    user: User;
    onLogout: () => void;
    onUpdateAlias: (newAlias: string) => void;
    onUpdateStatus: (newStatus: string) => void;
    onUpdateImage: (newImage: string) => void;
    tenantId?: string;
}

const Settings: React.FC<SettingsProps> = ({ user, onLogout, onUpdateAlias, onUpdateStatus, onUpdateImage, tenantId }) => {
    const { isAdmin, isModerator } = useMembership(tenantId, user.id);
    const [isEditingAlias, setIsEditingAlias] = useState(false);
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [newAlias, setNewAlias] = useState(user.alias);
    const [newStatus, setNewStatus] = useState(user.status || '');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const compressed = await compressImage(file);
            const imageUrl = await clientUploadAvatar(user.id, compressed);
            onUpdateImage(imageUrl);
        } catch (err) {
            console.error('[Settings] Avatar upload failed:', err);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const genderLabels: Record<string, string> = {
        male: 'maschio',
        female: 'femmina',
        other: 'altro'
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <header className="bg-white pt-safe sticky top-0 z-10">
                <div className="h-[60px] px-4 flex items-center">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Profilo</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto">
                <div className="pb-32">

                    {/* Avatar Section */}
                    <div className="py-8 flex flex-col items-center bg-white border-b border-gray-100">
                        <div className="relative group mb-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <div
                                onClick={() => !isUploading && fileInputRef.current?.click()}
                                className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-sm overflow-hidden cursor-pointer relative transition-transform active:scale-95 group"
                            >
                                {resolveAvatarUrl(user.image) ? (
                                    <img src={resolveAvatarUrl(user.image)} alt={user.alias} className="w-full h-full object-cover" />
                                ) : (
                                    (user.alias || (user as any).name || '?').charAt(0).toUpperCase()
                                )}
                                {isUploading ? (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Loader2 size={28} className="text-white animate-spin" />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md text-primary border border-gray-50"
                            >
                                <Camera size={16} />
                            </button>
                        </div>

                        {/* Session Type Indicator */}
                        <div className="mt-2">
                            {user.isAnonymous ? (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                                    <UserCircle2 size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Sessione Temporanea</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                                    <CheckCircle2 size={14} className="fill-green-50" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Utente Verificato</span>
                                </div>
                            )}
                        </div>

                        {/* Role Badges */}
                        <div className="flex flex-wrap gap-2 px-4 mt-3 justify-center">
                            {isAdmin && (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
                                    <ShieldCheck size={14} className="fill-blue-100" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Admin</span>
                                </div>
                            )}
                            {isModerator && (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
                                    <ShieldAlert size={14} className="fill-purple-100" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Moderatore</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Groups */}
                    <div className="mt-6 space-y-6">
                        {/* About Section */}
                        <div>
                            <h3 className="px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</h3>
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
                                                {user.status || 'Disponibile'}
                                            </span>
                                        )}
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Account Section */}
                        <div>
                            <h3 className="px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Informazioni Account</h3>
                            <div className="bg-white border-y border-gray-100 divide-y divide-gray-50">
                                {/* Alias Item */}
                                <button
                                    onClick={() => setIsEditingAlias(true)}
                                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <UserIcon size={20} className="text-gray-400" />
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs text-gray-400">Nome o Alias</span>
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
                                                    {user.alias || (user as any).name || 'User'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Phone Item */}
                                <div className="px-4 py-3.5 flex items-center gap-3">
                                    <Phone size={20} className="text-gray-400" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">Telefono</span>
                                        <span className="text-[17px] text-gray-900">{user.phoneNumber || 'Non collegato'}</span>
                                    </div>
                                </div>

                                {/* Email Item */}
                                {!user.isAnonymous && (
                                    <div className="px-4 py-3.5 flex items-center gap-3">
                                        <Mail size={20} className="text-gray-400" />
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400">Email</span>
                                            <span className="text-[17px] text-gray-900">{user.email || 'Non collegata'}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Gender Item */}
                                <div className="px-4 py-3.5 flex items-center gap-3">
                                    <UserIcon size={20} className="text-gray-400" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">Sesso</span>
                                        <span className="text-[17px] text-gray-900 capitalize">{genderLabels[user.gender] || user.gender}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions Section */}
                        <div className="pt-4">
                            <div className="bg-white border-y border-gray-100">
                                <button
                                    onClick={onLogout}
                                    className="w-full px-4 py-4 flex items-center justify-center text-red-600 font-semibold text-lg hover:bg-red-50 transition-colors"
                                >
                                    Esci
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
