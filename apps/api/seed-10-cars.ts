import { PrismaClient } from '@carshop/db';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding 10 new luxury cars...");

  const location = await prisma.dealershipLocation.findFirst();
  if (!location) {
    console.error("No dealership location found.");
    return;
  }

  const newCars = [
    {
      vin: `AMDB12${Math.floor(Math.random() * 100000000000).toString().padStart(11, '0')}`,
      make: "Aston Martin",
      model: "DB12",
      year: 2024,
      trim: "Volante",
      price: 2450000,
      mileage: 100,
      exteriorColor: "British Racing Green",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/aston_martin_db12.png"
    },
    {
      vin: `ZFFRM${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "Ferrari",
      model: "Roma",
      year: 2023,
      trim: "V8 Turbo",
      price: 2250000,
      mileage: 4500,
      exteriorColor: "Rosso Corsa",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/ferrari_roma.png"
    },
    {
      vin: `ZHWUR${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "Lamborghini",
      model: "Urus",
      year: 2024,
      trim: "Performante",
      price: 3100000,
      mileage: 800,
      exteriorColor: "Giallo Inti",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/lamborghini_urus.png"
    },
    {
      vin: `SCBGH${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "Rolls-Royce",
      model: "Ghost",
      year: 2023,
      trim: "Extended",
      price: 4200000,
      mileage: 1200,
      exteriorColor: "Arctic White",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/rolls_royce_ghost.png"
    },
    {
      vin: `SBM75${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "McLaren",
      model: "750S",
      year: 2024,
      trim: "Coupe",
      price: 3400000,
      mileage: 250,
      exteriorColor: "Papaya Spark",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/mclaren_750s.png"
    },
    {
      vin: `WAUZZZ${Math.floor(Math.random() * 100000000000).toString().padStart(11, '0')}`,
      make: "Audi",
      model: "RS e-tron GT",
      year: 2024,
      trim: "Performance",
      price: 1550000,
      mileage: 600,
      exteriorColor: "Daytona Gray",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/audi_rs_etron.png"
    },
    {
      vin: `WBSM8${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "BMW",
      model: "M8",
      year: 2023,
      trim: "Competition",
      price: 1850000,
      mileage: 3200,
      exteriorColor: "Marina Bay Blue",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/bmw_m8.png"
    },
    {
      vin: `VF9CH${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "Bugatti",
      model: "Chiron",
      year: 2022,
      trim: "Super Sport",
      price: 35000000,
      mileage: 150,
      exteriorColor: "French Racing Blue",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/bugatti_chiron.png"
    },
    {
      vin: `ZA9PA${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "Pagani",
      model: "Huayra",
      year: 2021,
      trim: "BC",
      price: 28000000,
      mileage: 400,
      exteriorColor: "Bianco Benny",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/pagani_huayra.png"
    },
    {
      vin: `ZAMMC${Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')}`,
      make: "Maserati",
      model: "MC20",
      year: 2023,
      trim: "Cielo",
      price: 2850000,
      mileage: 1100,
      exteriorColor: "Bianco Audace",
      status: "AVAILABLE",
      dealershipLocationId: location.id,
      imageUrl: "/uploads/maserati_mc20.png"
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
