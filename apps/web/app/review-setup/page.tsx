'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

function ReviewSetupContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function setup() {
            const name = searchParams.get('name');
            const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
            const query = name ? `?name=${encodeURIComponent(name)}` : '';

            try {
                const response = await fetch(`${apiUrl}/api/tenants/setup-review${query}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Errore durante la configurazione: ${response.statusText}`);
                }

                setStatus('success');

                // Allow user to see success state for a moment before redirecting
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } catch (err: any) {
                console.error('Setup failed:', err);
                setStatus('error');
                setError(err.message || 'Errore imprevisto durante la configurazione.');
            }
        }

        setup();
    }, [router, searchParams]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full space-y-6">
                {status === 'loading' && (
                    <>
                        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
                        <h1 className="text-xl font-bold text-gray-900">Configurazione Ambiente</h1>
                        <p className="text-gray-500">Stiamo preparando il tuo spazio di revisione personalizzato...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                        <h1 className="text-xl font-bold text-gray-900">Configurazione Completata</h1>
                        <p className="text-gray-500">Il tuo IP è stato autorizzato. Ti stiamo reindirizzando alla chat...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                        <h1 className="text-xl font-bold text-gray-900">Errore</h1>
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-bold shadow-sm active:scale-95 transition-transform"
                        >
                            Riprova
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ReviewSetupPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        }>
            <ReviewSetupContent />
        </Suspense>
    );
}
