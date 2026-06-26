import { prisma } from './lib/prisma';
import { execSync } from 'child_process';
import path from 'path';

async function main() {
  console.log('🔥 INITIATING DIRECTIVE BRAVO: THE CHAOS ENGINE 🔥\n');

  // Find a target vehicle
  const vehicle = await prisma.vehicleInventory.findFirst({
    where: { status: 'AVAILABLE' }
  });

  if (!vehicle) {
    console.error('❌ NO AVAILABLE VEHICLES TO TARGET. ABORTING SIEGE.');
    process.exit(1);
  }

  console.log(`🎯 TARGET ACQUIRED: ${vehicle.make} ${vehicle.model} (VIN: ${vehicle.vin})`);
  console.log(`   Vehicle ID: ${vehicle.id}`);
  const user = await prisma.user.upsert({
    where: { email: 'chaos@siege.com' },
    update: {},
    create: {
      email: 'chaos@siege.com',
      passwordHash: 'dummy',
      firstName: 'Chaos',
      lastName: 'Engine',
      phone: '555-0000'
    }
  });

  try {
    const totalRequests = 500;
    console.log(`\n🚀 LAUNCHING ${totalRequests} CONCURRENT REQUESTS TO GATEWAY...`);
    
    const requests = Array.from({ length: totalRequests }).map(async (_, i) => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/inventory/reserve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            vehicleId: vehicle.id,
            userId: user.id,
            depositAmount: 1000
          })
        });
        const data = await res.json();
        if (i === 0) console.log('First response:', data);
      } catch (err) {
        if (i === 0) console.error('First error:', err);
      }
    });

    await Promise.all(requests);
    
    console.log('\n✅ SIEGE COMPLETED.');
  } catch (error) {
    console.error('\n❌ SIEGE FAILED OR WAS INTERRUPTED.');
  }

  console.log('\n📊 ANALYZING POST-SIEGE LEDGER MUTEX STATE...');
  
  // Wait a second to allow any pending requests to flush (though artillery waits for responses)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Verify that ONLY ONE reservation was created
  const reservations = await prisma.reservationOrder.findMany({
    where: { vehicleId: vehicle.id }
  });

  console.log(`\n======================================================`);
  console.log(`   TOTAL SUCCESSFUL RESERVATIONS FOR VEHICLE: ${reservations.length}`);
  console.log(`======================================================`);

  if (reservations.length === 1) {
    console.log(`\n🛡️  MUTEX HELD STRONG. Only 1 booking allowed out of 500 attempts.`);
    console.log(`   Order #: ${reservations[0].orderNumber} (${reservations[0].status})`);
    console.log(`\n🚀 DIRECTIVE BRAVO: SUCCESS. READY FOR GOLD MASTER TAG.`);
  } else if (reservations.length > 1) {
    console.log(`\n⚠️  CRITICAL FAILURE: MUTEX BREACHED!`);
    console.log(`   Double booking occurred. ${reservations.length} orders created for the same vehicle.`);
    process.exit(1);
  } else {
    console.log(`\n⚠️  NO RESERVATIONS CREATED. Ensure backend is running and vehicle was available.`);
  }
}

main().catch(console.error);
