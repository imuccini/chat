import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const nasId = 'ae:b6:ac:f9:6e:1e'
    const slug = 'treno-pisa-aulla'
    const name = 'Treno Pisa-Aulla'

    // Upsert Tenant: Create if not exists, update if exists
    // Upsert Tenant: Create if not exists, update if exists
    const tenant = await prisma.tenant.upsert({
        where: { slug: slug },
        update: {
            name: name,
            devices: {
                upsert: {
                    where: { nasId: nasId },
                    update: { name: 'Main Router' },
                    create: { nasId: nasId, name: 'Main Router' }
                }
            }
        },
        create: {
            slug: slug,
            name: name,
            devices: {
                create: { nasId: nasId, name: 'Main Router' }
            }
        },
    })

    console.log({ tenant })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
