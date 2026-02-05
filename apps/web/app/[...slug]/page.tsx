import TenantChatClient from "./TenantChatClient";

// Force dynamic rendering - don't cache tenant pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CatchAllPage() {
    return <TenantChatClient />;
}
