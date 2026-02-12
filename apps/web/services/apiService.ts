import { API_BASE_URL, SERVER_URL } from "@/config";
import { Message } from "@/types";

export const clientResolveTenant = async (urlNasId?: string, bssid?: string): Promise<string | null> => {
    try {
        const payload = {
            nasId: urlNasId || null,
            bssid: bssid || null,
            // Note: publicIp will be detected by the server from the request headers
        };

        // Use the Next.js API route which proxies to the NestJS backend
        // This avoids direct port 3001 access issues from the device
        // On Web, SERVER_URL is empty, so this becomes relative '/api/tenants/validate-nas'

        const url = `${API_BASE_URL}/api/tenants/validate-nas`;
        console.log(`[apiService] Resolving tenant via ${url}`, payload);

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            console.error(`[apiService] Resolve tenant failed: ${res.status}`);
            return null;
        }

        const data = await res.json();
        console.log(`[apiService] Resolve tenant result:`, data);

        // NestJS returns { valid: boolean, tenant: { slug: string } }
        // Next.js Proxy returns { valid: boolean, tenantSlug: string }
        return data.valid ? (data.tenantSlug || data.tenant?.slug) : null;
    } catch (e) {
        console.error("[apiService] Network error during tenant resolution:", e);
        return null;
    }
};

export const clientGetTenantBySlug = async (slug: string) => {
    // Add cache: 'no-store' to prevent iOS/Capacitor from caching the GET request aggressively
    const res = await fetch(`${API_BASE_URL}/api/tenants/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
};

export const clientGetTenants = async () => {
    const res = await fetch(`${API_BASE_URL}/api/tenants`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
};

export const clientGetMessages = async (tenantSlug: string, roomId?: string, tenantId?: string): Promise<Message[]> => {
    const params = new URLSearchParams({ tenant: tenantSlug });
    if (roomId) params.append('roomId', roomId);
    if (tenantId) params.append('tenantId', tenantId);

    // Add cache: 'no-store' to ensure we always get the latest messages
    const res = await fetch(`${API_BASE_URL}/api/messages?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
};

export const clientGetTenantStaff = async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/api/tenants/${slug}/staff`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
};

export const clientSubmitFeedback = async (slug: string, score: number, comment?: string, userId?: string) => {
    const res = await fetch(`${API_BASE_URL}/api/tenants/${slug}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ score, comment, userId }),
    });
    if (!res.ok) throw new Error('Failed to submit feedback');
    return await res.json();
};

export const clientGetFeedback = async (slug: string, userId?: string) => {
    const params = userId ? `?userId=${userId}` : '';
    const res = await fetch(`${API_BASE_URL}/api/tenants/${slug}/feedback${params}`, {
        credentials: 'include',
        cache: 'no-store',
    });
    if (!res.ok) return [];
    return await res.json();
};
