import { API_BASE_URL } from '@/config';

export function resolveAvatarUrl(image?: string | null): string | undefined {
    if (!image) return undefined;

    // Reject base64 data URIs — treat as no image
    if (image.startsWith('data:')) return undefined;

    // Already an absolute URL (e.g. OAuth provider avatar)
    if (image.startsWith('http://') || image.startsWith('https://')) return image;

    // Relative path from our API (e.g. /api/uploads/avatars/xxx.jpg)
    // Prepend API_BASE_URL which is set correctly per environment
    if (API_BASE_URL) {
        return `${API_BASE_URL}${image}`;
    }

    // Web production: relative path works as-is (nginx proxies)
    return image;
}
