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

          {/* Image Container with Reticle System */}
          <div className="relative aspect-video bg-slate-950 overflow-hidden">
            {/* Dark Studio Floor Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={finalImageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-contain"
            />

            {/* Scanline Overlay */}
            <div className="scanline-overlay z-20" />

            {/* SVG Tracking Reticle */}
            <div className="reticle-container z-20" style={{ animation: 'reticle-pulse 4s ease-in-out infinite' }}>
              <div className="reticle-bracket top-left" />
              <div className="reticle-bracket top-right" />
              <div className="reticle-bracket bottom-left" />
              <div className="reticle-bracket bottom-right" />
              <div className="reticle-crosshair" />
            </div>

            {/* Reticle Telemetry Labels */}
            <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-primary/80 leading-relaxed">
              <div>MODEL: {vehicle.make} {vehicle.model} [{vehicle.year}]</div>
              <div>VIN: {vehicle.vin}</div>
            </div>
            <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-primary/80 leading-relaxed text-right">
              <div>SCANNING...</div>
              <div>STATUS: <span className="text-emerald-400">OPTIMAL</span></div>
            </div>
          </div>

          {/* Telemetry Footer Bar */}
          <div className="px-5 py-3 bg-surface/80 border-t border-surfaceBorder flex justify-between items-center font-mono text-[10px] text-textDim">
            <span>REGISTRY ID: <span className="text-textMuted">{vehicle.id}</span></span>
            <span>LOC: <span className="text-textMuted">{vehicle.dealershipLocationId.slice(0, 8)}...</span></span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            RIGHT: COMMERCE UNIT
            ═══════════════════════════════════════════ */}
        <div className="lg:col-span-5 glass-panel-elevated hex-pattern flex flex-col justify-between h-full p-6">

          {/* Status & VIN Header */}
          <div>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded text-[10px] font-mono font-bold ${
                vehicle.status === 'AVAILABLE'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
              }`}>
                {vehicle.status}
              </span>
              <span className="font-mono text-[10px] text-textDim">{vehicle.vin}</span>
            </div>

            {/* Vehicle Name */}
            <h1 className="text-2xl font-bold text-text font-grotesk mt-4 tracking-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-textMuted text-xs mt-1 capitalize font-mono">
              {vehicle.trim ? `${vehicle.trim} • ` : ''}{vehicle.exteriorColor}
            </p>

            {/* Specification Grid */}
            <div className="my-6 pt-5 border-t border-surfaceBorder grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-mono text-textDim tracking-widest uppercase">ODOMETER</span>
                <span className="text-base font-bold text-text font-grotesk">{vehicle.mileage.toLocaleString('en-US')} km</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-textDim tracking-widest uppercase">SLA HOLD</span>
                <span className="text-base font-bold text-text font-grotesk">48 Hours</span>
              </div>
            </div>
          </div>

          {/* Valuation & CTA Zone */}
          <div className="pt-5 border-t border-surfaceBorder">
            <span className="block text-[10px] font-mono text-textDim tracking-widest uppercase">TOTAL UNIT VALUATION</span>
            <div className="text-3xl font-black text-primary font-grotesk mt-1 mb-6 tracking-tight">
              MAD {Number(vehicle.price).toLocaleString('en-US')}
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
              <div className="w-full py-4 glass-panel text-textDim font-mono text-center text-xs border-amber-500/20">
                [UNIT CURRENTLY LOCKED BY ACTIVE SLA]
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
