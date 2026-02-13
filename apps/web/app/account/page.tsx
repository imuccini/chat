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

    // Check if we just came back from OAuth callback
    const callbackSuccess = searchParams.get('callbackSuccess');

    console.log("[AccountPage] Render - Loading:", loading, "Session:", !!session, "User:", !!user);
    console.log("[AccountPage] Cookies present:", typeof document !== 'undefined' ? {
        raw: document.cookie,
        parsed: document.cookie.split(';').map(c => c.trim()),
        hasBetterSession: document.cookie.includes('better-auth.session_token') || document.cookie.includes('session_token')
    } : 'SSR - No document');
    console.log("[AccountPage] Search params:", {
        error: errorParam,
        callbackSuccess,
        allParams: Object.fromEntries(searchParams.entries())
    });
    if (sessionError) console.error("[AccountPage] Session Error:", sessionError);

    // Handle OAuth callback return - force session refresh with retry logic
    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 3;
        let retryTimer: NodeJS.Timeout;

        const checkSessionAfterOAuth = () => {
            // Detect if we just came back from OAuth (URL will have no callbackSuccess yet)
            const urlParams = new URLSearchParams(window.location.search);
            const hasOAuthParams = urlParams.has('state') || urlParams.has('code');

            if (hasOAuthParams && !session && !loading) {
                console.log(`[AccountPage] OAuth return detected (attempt ${retryCount + 1}/${maxRetries}), checking for session...`);

                if (retryCount < maxRetries) {
                    retryCount++;
                    // Wait a bit and try again - cookie might not be readable immediately
                    retryTimer = setTimeout(() => {
                        console.log("[AccountPage] Retrying session check...");
                        // Force a hard reload to re-read cookies
                        window.location.href = '/account';
                    }, 1000); // 1 second delay
                } else {
                    console.error("[AccountPage] Max retries reached, session still not found");
                    setError("Accesso non riuscito. Riprova.");
                }
            } else if (callbackSuccess === 'true' && !session && !loading) {
                console.log("[AccountPage] callbackSuccess flag detected but no session, reloading...");
                window.history.replaceState({}, '', '/account');
                window.location.reload();
            }
        };

        checkSessionAfterOAuth();

        return () => {
            if (retryTimer) clearTimeout(retryTimer);
        };
    }, [callbackSuccess, session, loading]);

    // Sync local user state with session data
    useEffect(() => {
        console.log("[AccountPage] Session changed:", JSON.stringify(session, null, 2));
        if (session?.user) {
            console.log("[AccountPage] Found user in session:", session.user.email);
            setUser(session.user);
            // Clear the restriction cookie if it exists
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
