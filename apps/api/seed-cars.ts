import { PrismaClient } from '@carshop/db';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding luxury cars...");

  // Get the first dealership location
  const location = await prisma.dealershipLocation.findFirst();
  
  if (!location) {
    console.error("No dealership location found. Run the main DB seeder first.");
    return;
  }

  const newCars = [
    {
      vin: `WPOZZZ99Z${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      make: "Porsche",
      model: "911 GT3 RS",
      year: 2024,
      trim: "Weissach Package",
      price: 3200000,
      mileage: 1500,
      exteriorColor: "GT Silver Metallic",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "https://images.unsplash.com/photo-1503376712344-652d0b01c3bc?q=80&w=1200&auto=format&fit=crop"
    },
    {
      vin: `SADGB${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "Bentley",
      model: "Continental GT",
      year: 2023,
      trim: "Mulliner",
      price: 2850000,
      mileage: 8000,
      exteriorColor: "Onyx Black",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop"
    },
    {
      vin: `WDB463${Math.floor(Math.random() * 10000000000).toString().padStart(11, '0')}`,
      make: "Mercedes-Benz",
      model: "G-Class",
      year: 2024,
      trim: "G63 AMG",
      price: 2450000,
      mileage: 50,
      exteriorColor: "Designo Night Black Magno",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop"
    },
    {
      vin: `SAL${Math.floor(Math.random() * 100000000000000).toString().padStart(14, '0')}`,
      make: "Land Rover",
      model: "Range Rover",
      year: 2023,
      trim: "Autobiography",
      price: 1850000,
      mileage: 12000,
      exteriorColor: "Santorini Black",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "https://images.unsplash.com/photo-1606016159991-d17f65320c87?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  for (const car of newCars) {
    await prisma.vehicleInventory.create({
      // @ts-ignore
      data: car
    });
    console.log(`Added: ${car.year} ${car.make} ${car.model}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
