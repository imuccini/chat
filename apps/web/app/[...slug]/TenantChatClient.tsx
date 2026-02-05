'use client';

import React, { useEffect, useState } from "react";
import { usePathname, notFound } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { clientGetTenantBySlug, clientGetMessages } from "@/services/apiService";
import { Tenant, Message } from "@/types";

export default function TenantChatClient() {
    const pathname = usePathname();
    // Extract tenant slug from pathname (e.g., "/treno-lucca-aulla" -> "treno-lucca-aulla")
    const tenantSlug = pathname?.replace(/^\//, '') || '';

    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [initialMessages, setInitialMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Skip if no slug (root path)
        if (!tenantSlug) {
            setError(true);
            setLoading(false);
            return;
        }

        async function loadData() {
            try {
                const tenantData = await clientGetTenantBySlug(tenantSlug);
                if (!tenantData) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setTenant(tenantData);

                const dbMessages = await clientGetMessages(tenantSlug);
                const mappedMessages: Message[] = dbMessages.map((msg: any) => ({
                    id: msg.id,
                    text: msg.text,
                    senderId: msg.senderId || msg.userId,
                    senderAlias: msg.senderAlias || msg.user?.name || "Anonymous",
                    senderGender: msg.senderGender || "other",
                    timestamp: new Date(msg.timestamp || msg.createdAt).toISOString(),
                }));
                setInitialMessages(mappedMessages);
                setLoading(false);
            } catch (err) {
                console.error("Error loading chat data", err);
                setError(true);
                setLoading(false);
            }
        }
        loadData();
    }, [tenantSlug]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-400 font-medium">Caricamento chat...</div>
            </div>
        );
    }

    if (error || !tenant) {
        notFound();
    }

    return (
        <main className="flex h-full flex-col items-center justify-between">
            <ChatInterface
                tenant={tenant}
                initialMessages={initialMessages}
            />
        </main>
    );
}
