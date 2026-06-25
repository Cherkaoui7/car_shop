// apps/api/src/seed.ts
import { PrismaClient } from '@carshop/db';

const prisma = new PrismaClient();

async function main() {
  const hq = await prisma.dealershipLocation.upsert({
    where: { code: 'HQ-RABAT' },
    update: {},
    create: { code: 'HQ-RABAT', name: 'Aurora Premium Auto', address: 'Avenue Mohammed V', city: 'Rabat', phone: '+212500000000' }
  });

  await prisma.vehicleInventory.createMany({
    skipDuplicates: true,
    data: [
      { vin: 'WBA00000000000001', make: 'BMW', model: 'M4 Competition', year: 2026, price: 950000.00, exteriorColor: 'Isle of Man Green', dealershipLocationId: hq.id },
      { vin: 'WP000000000000002', make: 'Porsche', model: '911 GT3', year: 2025, price: 2100000.00, exteriorColor: 'Shark Blue', dealershipLocationId: hq.id },
      { vin: '1HG00000000000003', make: 'Honda', model: 'Civic Type R', year: 2026, price: 550000.00, exteriorColor: 'Championship White', dealershipLocationId: hq.id }
    ]
  });
  console.log('[SEED_COMPLETE]: Test inventory injected into PostgreSQL.');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
