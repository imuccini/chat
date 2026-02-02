import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const tenants = [
        {
            name: "Treno Lucca-Aulla",
            slug: "treno-lucca-aulla",
            nasId: "ae:b6:ac:f9:6e:1e"
        },
        {
            name: "Pisa Centrale",
            slug: "pisa-centrale",
            nasId: "pisa-router-01"
        },
        {
            name: "Demo Environment",
            slug: "demo",
            nasId: "demo-nas-id"
        }
    ];

    console.log('Seeding database...');

    for (const t of tenants) {
        const tenant = await prisma.tenant.upsert({
            where: { slug: t.slug },
            update: { name: t.name },
            create: {
                name: t.name,
                slug: t.slug,
            },
        });

        await prisma.nasDevice.upsert({
            where: { nasId: t.nasId },
            update: { tenantId: tenant.id },
            create: {
                nasId: t.nasId,
                name: `${t.name} NAS`,
                tenantId: tenant.id,
            }
        });

        console.log(`- Seeded ${t.slug}`);
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
