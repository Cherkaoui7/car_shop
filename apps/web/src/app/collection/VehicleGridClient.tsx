'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function VehicleGridClient({ inventory }: { inventory: any[] }) {
  if (inventory.length === 0) {
    return (
      <div className="col-span-full glass-panel p-12 text-center">
        <p className="text-amber-500 font-mono text-sm">AUCUN VÉHICULE TROUVÉ : Ajustez les filtres de recherche.</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-1 grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      {inventory.map((vehicle: any) => {
        const imageUrl = vehicle.resolvedImageUrl;
        const isAvailable = vehicle.status === 'AVAILABLE';

        return (
          <motion.div key={vehicle.id} variants={item}>
            <Link href={`/inventory/${vehicle.id}`} className="block group h-full">
              <div className="glass-panel overflow-hidden flex flex-col justify-between group-hover:border-primary/40 group-hover:shadow-cyan-glow transition-all duration-300 h-full">

                {/* Vehicle Image */}
                <div className="relative aspect-video bg-slate-950/50 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                  />

                  {/* Status Badge Overlay */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-full backdrop-blur-md ${
                      isAvailable
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {vehicle.status === 'AVAILABLE' ? 'DISPONIBLE' : vehicle.status === 'PENDING_RESERVATION' ? 'EN RÉSERVATION' : 'VENDU'}
                    </span>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-text font-grotesk group-hover:text-primary transition">
                    {vehicle.make} {vehicle.model}
                  </h2>
                  <p className="text-textMuted text-sm mt-1 capitalize font-mono">
                    {vehicle.year} • {vehicle.exteriorColor} • {vehicle.mileage.toLocaleString('fr-FR')} km
                  </p>
                </div>

                {/* Price Bar */}
                <div className="px-5 py-4 border-t border-surfaceBorder flex items-center justify-between bg-surface/30 mt-auto">
                  <span className="text-xl font-bold text-primary font-grotesk">
                    {Number(vehicle.price).toLocaleString('fr-FR')} MAD
                  </span>
                  <span className="text-xs font-mono font-bold text-primary/80 group-hover:text-primary transition flex items-center gap-1 uppercase tracking-wider">
                    Voir détails
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>

              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
