import { API_BASE_URL } from "@/config";
import { Message } from "@/types";

export const clientResolveTenant = async (urlNasId?: string, bssid?: string): Promise<string | null> => {
    try {
        const payload = {
            nasId: urlNasId || null,
            bssid: bssid || null,
            // Note: publicIp will be detected by the server from the request headers
        };

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
        return data.valid ? data.tenant.slug : null;
    } catch (e) {
        console.error("[apiService] Network error during tenant resolution:", e);
        return null;
    }
};

export const clientGetTenantBySlug = async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/api/tenants/${slug}`);
    if (!res.ok) return null;
    return await res.json();
};

export const clientGetMessages = async (tenantSlug: string, roomId?: string, tenantId?: string): Promise<Message[]> => {
    const params = new URLSearchParams({ tenant: tenantSlug });
    if (roomId) params.append('roomId', roomId);
    if (tenantId) params.append('tenantId', tenantId);

    const res = await fetch(`${API_BASE_URL}/api/messages?${params.toString()}`);
    if (!res.ok) return [];
    return await res.json();
};
