'use client';

import React, { useState } from 'react';
import { User } from '@/types';
import { Mail, Phone, User as UserIcon, Trash2, LogOut, Loader2, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface AccountProfileProps {
    user: User & { email?: string; phoneNumber?: string };
}

export default function AccountProfile({ user }: AccountProfileProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async () => {
        await authClient.signOut();
        window.location.reload();
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            const res = await fetch('/api/auth/account/delete', {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Errore durante l\'eliminazione dell\'account');
            }

            // Success - clear local storage and redirect
            localStorage.clear();
            window.location.href = '/account';
        } catch (err: any) {
            setError(err.message);
            setIsDeleting(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-6 space-y-8">
            <div className="text-center space-y-2">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner border-4 border-white">
                    {user.image ? (
                        <img src={user.image} alt={user.alias} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        (user.alias || (user as any).name || '?').charAt(0).toUpperCase()
                    )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{user.alias || (user as any).name}</h1>
                <p className="text-gray-500 text-sm">Gestisci le tue informazioni personali</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                <div className="px-6 py-4 flex items-center gap-4">
                    <UserIcon className="text-gray-400 shrink-0" size={20} />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome / Alias</span>
                        <span className="text-gray-900 font-medium">{user.alias || (user as any).name}</span>
                    </div>
                </div>

                {user.phoneNumber && (
                    <div className="px-6 py-4 flex items-center gap-4">
                        <Phone className="text-gray-400 shrink-0" size={20} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Telefono</span>
                            <span className="text-gray-900 font-medium">{user.phoneNumber}</span>
                        </div>
                    </div>
                )}

                {user.email && (
                    <div className="px-6 py-4 flex items-center gap-4">
                        <Mail className="text-gray-400 shrink-0" size={20} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</span>
                            <span className="text-gray-900 font-medium">{user.email}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                    <LogOut size={20} />
                    Esci
                </button>

                {!showConfirm ? (
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
                    >
                        <Trash2 size={20} />
                        Elimina Account
                    </button>
                ) : (
                    <div className="p-6 bg-red-600 rounded-2xl text-white space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={24} />
                            <h3 className="font-bold text-lg">Sei sicuro?</h3>
                        </div>
                        <p className="text-red-50 text-sm">
                            Questa operazione è irreversibile. Tutti i tuoi dati verranno cancellati permanentemente.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="py-3 px-4 bg-white/10 hover:bg-white/20 font-bold rounded-xl transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="py-3 px-4 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                            >
                                {isDeleting ? <Loader2 className="animate-spin" size={20} /> : 'Sì, Elimina'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-center rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="text-center pt-8">
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                    &copy; 2026 Local &bull; Privacy &bull; Termini
                </p>
            </div>
        </div>
    );
}
