// apps/web/src/app/inventory/[id]/page.tsx
// PROJECT OBSIDIAN — Vehicle Matrix + Commerce Unit
import { fetchVehicleById, resolveImageUrl } from '@carshop/api-client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReservationButton from './ReservationButton';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await fetchVehicleById(params.id).catch(() => null);
  if (!car) return { title: 'Terminal Not Found | AURORA' };

  return {
    title: `${car.year} ${car.make} ${car.model} | AURORA Terminal 04`,
    description: `VIN: ${car.vin} • ${car.exteriorColor} • MAD ${Number(car.price).toLocaleString('en-US')}`,
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const vehicle = await fetchVehicleById(params.id).catch(() => null);

  if (!vehicle) notFound();

  const finalImageUrl = resolveImageUrl(vehicle.imageUrl);
  const depositRequired = Number(vehicle.price) * 0.10;
  const MOCK_USER_ID = "550e8400-e29b-41d4-a716-446655440001";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ═══════════════════════════════════════════
            LEFT: VEHICLE MATRIX
            ═══════════════════════════════════════════ */}
        <div className="lg:col-span-7 glass-panel overflow-hidden">

          {/* Image Container */}
          <div className="relative aspect-video bg-slate-950/30 overflow-hidden flex items-center justify-center">
            {/* Dark Studio Floor Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent z-10 pointer-events-none" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={finalImageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            RIGHT: COMMERCE UNIT
            ═══════════════════════════════════════════ */}
        <div className="lg:col-span-5 glass-panel-elevated flex flex-col justify-between h-full p-8">

          {/* Status Header */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold ${
                vehicle.status === 'AVAILABLE'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
              }`}>
                {vehicle.status === 'AVAILABLE' ? 'DISPONIBLE' : vehicle.status === 'PENDING_RESERVATION' ? 'EN RÉSERVATION' : 'VENDU'}
              </span>
            </div>

            {/* Vehicle Name */}
            <h1 className="text-3xl font-bold text-text font-grotesk tracking-tight">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-textMuted text-sm mt-2 capitalize font-mono">
              {vehicle.year} • {vehicle.trim ? `${vehicle.trim} • ` : ''}{vehicle.exteriorColor}
            </p>

            {/* Specification Grid */}
            <div className="my-8 pt-6 border-t border-surfaceBorder grid grid-cols-2 gap-6">
              <div>
                <span className="block text-xs font-mono text-textDim tracking-widest uppercase mb-1">KILOMÉTRAGE</span>
                <span className="text-lg font-bold text-text font-grotesk">{vehicle.mileage.toLocaleString('fr-FR')} km</span>
              </div>
              <div>
                <span className="block text-xs font-mono text-textDim tracking-widest uppercase mb-1">DÉLAI DE RÉSERVATION</span>
                <span className="text-lg font-bold text-text font-grotesk">48 Heures</span>
              </div>
            </div>
          </div>

          {/* Valuation & CTA Zone */}
          <div className="pt-6 border-t border-surfaceBorder">
            <span className="block text-xs font-mono text-textDim tracking-widest uppercase mb-2">PRIX TOTAL</span>
            <div className="text-4xl font-black text-primary font-grotesk mt-1 mb-8 tracking-tight">
              {Number(vehicle.price).toLocaleString('fr-FR')} MAD
            </div>

            {vehicle.status === 'AVAILABLE' ? (
              <ReservationButton
                vehicleId={vehicle.id}
                vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                vin={vehicle.vin}
                userId={MOCK_USER_ID}
                depositAmount={depositRequired}
              />
            ) : (
              <div className="w-full py-4 glass-panel text-textDim font-mono text-center text-sm border-amber-500/20">
                [CE VÉHICULE N'EST PLUS DISPONIBLE]
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
