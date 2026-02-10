'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { clientGetTenantBySlug } from '@/services/apiService';
import { Tenant } from '@/types';
import { Icon } from '@/components/Icon';

export default function StaffClient() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        async function loadTenant() {
            try {
                const data = await clientGetTenantBySlug(slug);
                setTenant(data);
            } catch (error) {
                console.error("Failed to load tenant:", error);
            } finally {
                setLoading(false);
            }
        }
        loadTenant();
    }, [slug]);

    if (loading) return null;

    return (
        <div className="flex flex-col h-screen bg-gray-50 w-full">
            <div className="bg-white px-4 pt-safe pb-4 border-b border-gray-100 flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <Icon name="Arrow_Left" className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Contatta lo Staff</h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-primary">
                    <Icon name="Chat_Conversation" className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-600">Coming Soon</h3>
                <p className="max-w-xs text-sm text-gray-500 mt-2">La possibilità di contattare lo staff sarà disponibile a breve per {tenant?.name}.</p>
            </div>
        </div>
    );
}
