// scripts/seed-mock-user.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userId = '550e8400-e29b-41d4-a716-446655440001';
  
  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: 'test@buyer.dev',
      passwordHash: 'hash', // In reality this would be properly bcrypt hashed
      role: 'CUSTOMER',
      firstName: 'John',
      lastName: 'Doe',
    },
  });

  console.log(`Mock user seeded perfectly: [${user.id}] ${user.firstName} ${user.lastName}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
