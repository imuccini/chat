import TenantChatClient from "./TenantChatClient";

export default function TenantChatPage() {
    return <TenantChatClient />;
}

// Added for Static Export - you might want to extend this list
export function generateStaticParams() {
    return [
        { tenantSlug: 'treno-lucca-aulla' },
        { tenantSlug: 'pisa-centrale' },
        { tenantSlug: 'demo' }
    ];
}

