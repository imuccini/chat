import { PrismaClient } from './packages/database/generated/client/index.js';

const prisma = new PrismaClient();

async function check() {
  try {
    const users = await prisma.user.findMany({
      where: { email: 'muccini.ivan@gmail.com' }
    });

    console.log('\n=== USERS ===');
    console.log(`Found ${users.length} user(s)`);

    if (users.length > 0) {
      const user = users[0];
      console.log('ID:', user.id);
      console.log('Email:', user.email);
      console.log('Role:', user.role);
      console.log('Created:', user.createdAt);

      const sessions = await prisma.session.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 5
      });

      console.log('\n=== SESSIONS ===');
      console.log(`Found ${sessions.length} session(s) for this user\n`);

      sessions.forEach((s, i) => {
        console.log(`[${i+1}] Token: ${s.token}`);
        console.log(`    Created: ${s.createdAt}`);
        console.log(`    Expires: ${s.expiresAt}\n`);
      });

      const cookieToken = '6ygHWjDwunffAPxhswESIZFWVyF58YWY';
      console.log('=== MATCH CHECK ===');
      console.log('Cookie token:', cookieToken);
      const match = sessions.find(s => s.token === cookieToken);
      console.log('Match found:', match ? '✅ YES' : '❌ NO');

      if (!match && sessions.length > 0) {
        console.log('\n⚠️  The session token in your cookie does NOT match any session in the database!');
        console.log('This explains why login is failing.');
      }
    }

    await prisma.$disconnect();
  } catch (e) {
    console.error('Error:', e.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

check();
