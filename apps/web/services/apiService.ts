import { API_BASE_URL } from "@/config";
import { Message } from "@/types";

export const clientResolveTenant = async (urlNasId?: string, bssid?: string): Promise<string | null> => {
    const params = new URLSearchParams();
    if (bssid) params.append('bssid', bssid);
    if (urlNasId) params.append('nas_id', urlNasId);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/api/validate-nas${query}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.valid ? data.tenantSlug : null;
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
