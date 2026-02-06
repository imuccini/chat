
import { prisma } from './packages/database/src/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    try {
        console.log('Testing @local/database abstraction...');
        console.log('Prisma instance type:', typeof prisma);

        if (!prisma) {
            console.error('ERROR: prisma is undefined!');
            return;
        }

        const tenantCount = await prisma.tenant.count();
        console.log('Success! Tenant count:', tenantCount);
    } catch (err) {
        console.error('Error testing @local/database:', err);
    }
}

main();
