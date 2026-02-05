const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const userId = '5704b4b0-2f55-4833-9762-fefa83d27d00'; // SpaceAdmin
    const tenantId = '19ed7f58-f326-4671-be95-0e5584e40fa6'; // test3

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    console.log('Tenant:', tenant?.name);

    const membership = await prisma.tenantMember.findUnique({
        where: {
            userId_tenantId: {
                userId,
                tenantId
            }
        }
    });
    console.log('Membership:', JSON.stringify(membership, null, 2));

    // Simulating hardware check logic
    const hasHardwareConstraints = !!(tenant.bssid || tenant.staticIp);
    console.log('Has Constraints:', hasHardwareConstraints);
}

main().catch(console.error).finally(() => prisma.$disconnect());
