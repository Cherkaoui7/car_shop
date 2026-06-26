import { PrismaClient } from '@carshop/db';
const p = new PrismaClient();

async function updateImages() {
  await p.vehicleInventory.updateMany({
    where: { make: 'Porsche', model: '911 GT3 RS' },
    data: { imageUrl: '/uploads/porsche_gt3.png' }
  });
  
  await p.vehicleInventory.updateMany({
    where: { make: 'Bentley', model: 'Continental GT' },
    data: { imageUrl: '/uploads/bentley.png' }
  });
  
  await p.vehicleInventory.updateMany({
    where: { make: 'Mercedes-Benz', model: 'G-Class' },
    data: { imageUrl: '/uploads/mercedes.png' }
  });
  
  await p.vehicleInventory.updateMany({
    where: { make: 'Land Rover', model: 'Range Rover' },
    data: { imageUrl: '/uploads/range_rover.png' }
  });

  console.log('New luxury car images updated to locally generated files!');
  await p.$disconnect();
}

updateImages();
