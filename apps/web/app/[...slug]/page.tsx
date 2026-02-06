import TenantChatClient from "./TenantChatClient";

// Use 'auto' to allow both static export (Capacitor) and server-side rendering.
export const dynamic = 'auto';
// revalidate 0 is fine for development/server but will be ignored during static export.
export const revalidate = 0;

export default function CatchAllPage() {
    return <TenantChatClient />;
}
