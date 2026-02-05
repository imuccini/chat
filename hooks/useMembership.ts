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
    const [isSuperadmin, setIsSuperadmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("[useMembership] Hook triggered for tenant:", tenantId, "User ID:", session?.user?.id);
        if (!session?.user || !tenantId) {
            setMembership(null);
            setIsAuthorized(false);
            setIsSuperadmin(false);
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
                console.log("[useMembership] Result for tenant", tenantId, data);

                if (data.isMember) {
                    setMembership(data.membership);
                    setIsAuthorized(data.isAuthorized);
                    setIsSuperadmin(data.isSuperadmin || false);
                } else {
                    setMembership(null);
                    setIsAuthorized(false);
                    setIsSuperadmin(false);
                }
            } catch (err) {
                console.error("Failed to check membership:", err);
            } finally {
                setIsLoading(false);
            }
        }

        checkMembership();
    }, [session?.user?.id, tenantId]);

    const isAdmin = isSuperadmin || (isAuthorized && membership?.role?.toUpperCase() === 'ADMIN');
    const isModerator = isAuthorized && (membership?.role?.toUpperCase() === 'MODERATOR' || !!membership?.canModerate);
    const canManageTenant = isAdmin || isModerator;

    return {
        membership,
        isAuthorized,
        isSuperadmin,
        isAdmin,
        isModerator,
        canManageTenant,
        isLoading
    };
}
