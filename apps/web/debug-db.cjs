const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tenant = await prisma.tenant.findUnique({
        where: { slug: 'test3' },
        include: { rooms: true }
    });
    console.log('Tenant:', JSON.stringify(tenant, null, 2));

    if (tenant) {
        const members = await prisma.tenantMember.findMany({
            where: { tenantId: tenant.id },
            include: { user: true }
        });
        console.log('Members:', JSON.stringify(members, null, 2));
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
