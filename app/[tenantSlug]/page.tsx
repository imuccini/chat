import { getTenantBySlug, getMessages } from "@/services/messageService";
import { notFound } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { User, Message } from "@/types"; // We will ensure this exists/is compatible

interface PageProps {
    params: Promise<{ tenantSlug: string }>
}

export default async function TenantChatPage(props: PageProps) {
    const params = await props.params;
    const tenantSlug = params.tenantSlug;

    // 1. Fetch Tenant
    const tenant = await getTenantBySlug(tenantSlug);
    if (!tenant) {
        notFound();
    }

    // 2. Fetch History (Server-side)
    // Note: getMessages returns Prisma objects, we might need to map them to our UI types
    const dbMessages = await getMessages(tenant.id);

    // Transform to UI Message type
    const initialMessages: Message[] = dbMessages.map(msg => ({
        id: msg.id,
        text: msg.text,
        senderId: msg.userId,
        senderAlias: msg.user?.name || "Anonymous", // Fallback
        senderGender: "other", // Database doesn't have gender yet, default/mock
        timestamp: msg.createdAt.toISOString(),
        // Add other fields if necessary
    }));

    return (
        <main className="flex h-screen flex-col items-center justify-between">
            <ChatInterface
                tenant={tenant}
                initialMessages={initialMessages}
            />
        </main>
    );
}
