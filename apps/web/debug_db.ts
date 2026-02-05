import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const passkeys = await prisma.passkey.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });
    console.log('Last 5 passkeys:', JSON.stringify(passkeys, null, 2));

    const sessions = await prisma.session.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });
    console.log('Last 5 sessions:', JSON.stringify(sessions, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
