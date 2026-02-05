import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            phoneNumber: true,
            gender: true,
            isAnonymous: true,
            createdAt: true
        }
    });
    console.log('Last 5 users:', JSON.stringify(users, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
