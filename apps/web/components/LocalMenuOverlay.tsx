'use client';

import React, { useState } from 'react';
import { Tenant } from '@/types';
import { Icon } from './Icon';
import { Button } from './ui/button';
import { SERVER_URL } from '@/config';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LocalMenuOverlayProps {
    tenant: Tenant;
    isAdmin: boolean;
    token?: string;
    onClose: () => void;
    onUpdateTenant: (updatedTenant: Tenant) => void;
}

export const LocalMenuOverlay: React.FC<LocalMenuOverlayProps> = ({
    tenant,
    isAdmin,
    token,
    onClose,
    onUpdateTenant
}) => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const file = formData.get('menuFile') as File;

            if (!file || file.size === 0) {
                alert("Per favore seleziona un file");
                setIsUploading(false);
                return;
            }

            const menuUrl = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const isNative = typeof window !== 'undefined' && window.location.protocol === 'capacitor:';
            const fetchHeaders: Record<string, string> = {
                'Content-Type': 'application/json',
            };
            if (isNative && token) {
                fetchHeaders['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${SERVER_URL}/api/tenants/${tenant.slug}`, {
                method: 'POST',
                headers: fetchHeaders,
                credentials: 'include',
                body: JSON.stringify({
                    menuUrl
                })
            });

            if (!response.ok) throw new Error('Failed to update menu');

            const updatedTenant = await response.json();
            onUpdateTenant({ ...tenant, menuUrl });
            setIsUploadOpen(false);
        } catch (error) {
            console.error("Failed to upload menu:", error);
            alert("Errore durante il caricamento del menu");
        } finally {
            setIsUploading(false);
        }
    };

    const isPdf = tenant.menuUrl?.startsWith('data:application/pdf') || tenant.menuUrl?.toLowerCase().endsWith('.pdf');

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-hidden w-full">
            {/* Header */}
            <header className="bg-white pt-safe border-b border-gray-100 shrink-0 sticky top-0 z-10">
                <div className="h-[60px] px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="font-extrabold text-2xl text-gray-900 leading-tight tracking-tight">Menu</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                <p className="text-[11px] font-bold text-primary uppercase tracking-wide truncate max-w-[150px]">
                                    {tenant.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    {isAdmin && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsUploadOpen(true)}
                            className="rounded-full gap-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all font-bold text-xs px-4"
                        >
                            <Icon name="Upload_Cloud" className="w-4 h-4" />
                            Carica
                        </Button>
                    )}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-gray-100 relative">
                {!tenant.menuUrl ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Icon name="Menu_Alt_01" className="w-10 h-10" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-600 mb-2">Nessun menu disponibile</h3>
                        <p className="max-w-xs text-sm">Il locale non ha ancora caricato un menu digitale.</p>
                        {isAdmin && (
                            <Button
                                onClick={() => setIsUploadOpen(true)}
                                className="mt-6 rounded-full"
                            >
                                Carica il tuo primo menu
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="h-full w-full">
                        {isPdf ? (
                            <iframe
                                src={tenant.menuUrl}
                                className="w-full h-full border-none"
                                title="Menu PDF"
                            />
                        ) : (
                            <div className="min-h-full w-full p-4 flex items-start justify-center">
                                <img
                                    src={tenant.menuUrl}
                                    alt="Menu"
                                    className="max-width-full h-auto rounded-xl shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Upload Dialog */}
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Carica Menu</DialogTitle>
                        <DialogDescription>
                            Carica un'immagine (JPG, PNG) o un file PDF del tuo menu.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpload} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="menuFile">File Menu</Label>
                            <Input
                                id="menuFile"
                                name="menuFile"
                                type="file"
                                accept="image/*,application/pdf"
                                required
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsUploadOpen(false)}
                                disabled={isUploading}
                            >
                                Annulla
                            </Button>
                            <Button type="submit" disabled={isUploading}>
                                {isUploading ? 'Caricamento...' : 'Carica Menu'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
