import { prisma } from './lib/prisma';

async function main() {
  const loc = await prisma.dealershipLocation.upsert({
    where: { code: 'HQ1' },
    update: {},
    create: {
      code: 'HQ1',
      name: 'Main HQ',
      address: '123 Main St',
      country: 'USA',
      phone: '555-555-5555',
      city: 'New York'
    }
  });

  const car = await prisma.vehicleInventory.create({
    data: {
      make: 'Tesla',
      model: 'Model S',
      year: 2024,
      vin: 'SIEGE' + Date.now().toString().slice(-6),
      status: 'AVAILABLE',
      mileage: 0,
      price: 90000,
      exteriorColor: 'Black',
      location: { connect: { id: loc.id } }
    }
  });
  console.log('Seeded vehicle', car.id);
}
main().catch(console.error);
