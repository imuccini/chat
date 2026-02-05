const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Checking sessions...");
    const sessions = await prisma.session.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 5
    });

    console.log(JSON.stringify(sessions, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
