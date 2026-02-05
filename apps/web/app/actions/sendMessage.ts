'use server'

import { auth } from "@/lib/auth"; // Better-auth
import { createMessage } from "@/services/messageService";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function sendMessageAction(formData: FormData) {
    // 1. Authentication Check
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return { success: false, error: "Unauthorized" };
    }

    // 2. Extract Data
    const content = formData.get("content") as string;
    const tenantId = formData.get("tenantId") as string;

    if (!content || !tenantId) {
        return { success: false, error: "Missing content or tenantId" };
    }

    try {
        // 3. Create Message (Service Pattern)
        await createMessage(content, session.user.id, tenantId);

        // 4. Revalidate UI
        revalidatePath(`/chat/${tenantId}`); // Assume this is the path
        return { success: true };

    } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false, error: "Failed to send message" };
    }
}
