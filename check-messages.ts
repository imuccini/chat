import { PrismaClient } from './packages/database/generated/client/index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

async function main() {
    const prisma = new PrismaClient();
    console.log("Checking Tenant and Rooms in DB...");

    const tenant = await prisma.tenant.findUnique({
        where: { slug: 'test6' },
        include: { rooms: true }
    });

    if (tenant) {
        console.log(`Tenant found: ${tenant.name} (ID: ${tenant.id})`);
        console.log("Rooms:");
        tenant.rooms.forEach(r => {
            console.log(`- Room: ${r.name} (ID: ${r.id}, Type: ${r.type})`);
        });
    } else {
        console.log("Tenant 'test6' not found!");
    }

    console.log("\nChecking recent messages...");
    const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    messages.forEach(m => {
        console.log(`- [${m.createdAt.toISOString()}] RoomID: ${m.roomId}, TenantID: ${m.tenantId}, Sender: ${m.senderAlias}, Text: ${m.text}`);
    });

    await prisma.$disconnect();
}

main().catch(console.error);
