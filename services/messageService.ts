import { prisma } from "@/lib/db";

// SERVICE: Tenant Resolution
export const getTenantByNasId = async (nasId: string) => {
    return await prisma.tenant.findFirst({
        where: {
            devices: {
                some: {
                    nasId: nasId
                }
            }
        }
    });
};

export const getTenantBySlug = async (slug: string) => {
    return await prisma.tenant.findUnique({
        where: { slug },
    });
};

// SERVICE: Messagging (Multi-tenant Filtered)
export const getMessages = async (tenantId: string, limit = 50) => {
    return await prisma.message.findMany({
        where: { tenantId },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: { user: true }, // Include sender details
    });
};

export const createMessage = async (content: string, userId: string, tenantId: string) => {
    return await prisma.message.create({
        data: {
            content,
            userId,
            tenantId,
        },
    });
};
