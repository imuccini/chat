'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSession } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';
import Login from '@/components/Login';
import AccountProfile from '@/components/AccountProfile';
import { Loader2, AlertCircle } from 'lucide-react';

function AccountManagementContent() {
    const { data: session, isPending: loading, error: sessionError } = useSession();
    const [user, setUser] = useState<any>(null);
    const searchParams = useSearchParams();
    const errorParam = searchParams.get('error');
    const [error, setError] = useState<string | null>(errorParam);

    // Sync local user state with session data
    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
            document.cookie = "local_no_signup=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        } else {
            setUser(null);
        }
    }, [session]);

    const handleLogin = (loggedInUser: any) => {
        setUser(loggedInUser);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
            {error && !user && (
                <div className="max-w-md w-full mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="shrink-0" size={20} />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {user ? (
                <AccountProfile user={user} />
            ) : (
                <div className="max-w-md w-full">
                    <Login
                        onLogin={handleLogin}
                        tenantName="Area Riservata"
                        requireExisting={true}
                    />
                </div>
            )}
        </div>
    );
}

export default function AccountPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        }>
            <AccountManagementContent />
        </Suspense>
    );
}
