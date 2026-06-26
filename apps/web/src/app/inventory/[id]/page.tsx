// apps/web/src/app/inventory/[id]/page.tsx
import { fetchVehicleById, resolveImageUrl } from '@carshop/api-client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReservationButton from './ReservationButton';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await fetchVehicleById(params.id).catch(() => null);
  if (!car) return { title: 'Terminal Not Found' };
  
  return {
    title: `${car.year} ${car.make} ${car.model} | Aurora`,
    description: `VIN: ${car.vin} • Exterior: ${car.exteriorColor}`,
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const vehicle = await fetchVehicleById(params.id).catch(() => null);

  if (!vehicle) notFound();

  const finalImageUrl = resolveImageUrl(vehicle.imageUrl);
  const depositRequired = Number(vehicle.price) * 0.10; // 10% strict deposit

  const MOCK_USER_ID = "550e8400-e29b-41d4-a716-446655440001";

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
        {/* Left Column: Visual Asset */}
        <div className="lg:col-span-7 bg-surface rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="aspect-video w-full bg-slate-900 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={finalImageUrl} 
              alt={vehicle.model} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 bg-slate-50 flex justify-between items-center border-t border-slate-200 font-mono text-xs text-slate-500">
            <span>REGISTRY ID: {vehicle.id}</span>
            <span>LOC: {vehicle.dealershipLocationId.slice(0,8)}...</span>
          </div>
        </div>

        {/* Right Column: Spec & Action Manifest */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-surface p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20">
                {vehicle.status}
              </span>
              <span className="font-mono text-xs text-slate-400">{vehicle.vin}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-primary mt-4">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
          
            <p className="text-slate-500 text-sm mt-1 capitalize">
              {vehicle.trim ? `${vehicle.trim} • ` : ''}{vehicle.exteriorColor}
            </p>

            <div className="my-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-mono text-slate-400">ODOMETER</span>
                <span className="text-lg font-bold text-primary">{vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div>
                <span className="block text-xs font-mono text-slate-400">SLA HOLD</span>
                <span className="text-lg font-bold text-primary">48 Hours</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <span className="block text-xs font-mono text-slate-400">TOTAL UNIT VALUATION</span>
            <div className="text-3xl font-black text-primary mb-6">
              {Number(vehicle.price).toLocaleString('en-US', { style: 'currency', currency: 'MAD' })}
            </div>

            {vehicle.status === 'AVAILABLE' ? (
              <ReservationButton 
                vehicleId={vehicle.id} 
                userId={MOCK_USER_ID} 
                depositAmount={depositRequired} 
              />
            ) : (
              <div className="w-full py-4 bg-slate-100 text-slate-400 font-mono text-center text-sm rounded-xl border border-slate-200">
                [UNIT CURRENTLY LOCKED BY ACTIVE SLA]
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
