import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { getConnectedWifiInfo } from '@/lib/wifi';

interface Membership {
    id: string;
    role: 'ADMIN' | 'MODERATOR' | 'STAFF';
    canModerate: boolean;
    canManageOrders: boolean;
    canViewStats: boolean;
}

export function useMembership(tenantId?: string) {
    const { data: session } = useSession();
    const [membership, setMembership] = useState<Membership | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!session?.user || !tenantId) {
            setMembership(null);
            setIsAuthorized(false);
            setIsLoading(false);
            return;
        }

        async function checkMembership() {
            try {
                // 1. Get hardware context
                const wifi = await getConnectedWifiInfo();

                // 2. Fetch authorized membership from server
                const url = new URL('/api/auth/membership', window.location.origin);
                url.searchParams.append('tenantId', tenantId);
                if (wifi.bssid) {
                    url.searchParams.append('bssid', wifi.bssid);
                }

                const response = await fetch(url.toString());
                const data = await response.json();

                if (data.isMember) {
                    setMembership(data.membership);
                    setIsAuthorized(data.isAuthorized);
                } else {
                    setMembership(null);
                    setIsAuthorized(false);
                }
            } catch (err) {
                console.error("Failed to check membership:", err);
            } finally {
                setIsLoading(false);
            }
        }

        checkMembership();
    }, [session?.user?.id, tenantId]);

    const isAdmin = isAuthorized && (membership?.role === 'ADMIN' || membership?.role === 'MODERATOR');

    return {
        membership,
        isAuthorized,
        isAdmin,
        isLoading
    };
}
