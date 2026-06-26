import { PrismaClient } from '@carshop/db';
const p = new PrismaClient();

async function updateImages() {
  await p.vehicleInventory.update({
    where: { id: '1b0f03b5-33ef-4781-a8e8-fffd7d212f0f' },
    data: { imageUrl: '/uploads/honda_civic.png' }
  });

  console.log('Honda image updated to locally generated file!');
  await p.$disconnect();
}

updateImages();
