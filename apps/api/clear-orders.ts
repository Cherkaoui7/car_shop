import { prisma } from './src/lib/prisma';

async function main() {
  await prisma.reservationOrder.deleteMany({});
  console.log('Orders cleared');
}
main().catch(console.error);
