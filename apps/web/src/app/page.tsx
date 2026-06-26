'use client';

// apps/web/src/app/page.tsx
// PROJECT OBSIDIAN — Landing Page
import Link from 'next/link';
import { motion } from 'framer-motion';
import CyberRain from '../components/CyberRain';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-130px)] relative">
      {/* ═══ GLOBAL PAGE BACKGROUNDS ═══ */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
      <CyberRain />
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold tracking-widest mb-6"
          >
            MARKETPLACE ONLINE
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-7xl font-black text-text font-grotesk tracking-tighter leading-tight mb-6 drop-shadow-2xl"
          >
            COLLECTION AUTOMOBILE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryLight">PREMIUM</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-textMuted text-lg sm:text-xl font-mono max-w-2xl mb-12 leading-relaxed drop-shadow-md"
          >
            Trouvez la voiture de vos rêves parmi notre sélection exclusive de véhicules premium au Maroc. Achat sécurisé, accompagnement sur-mesure et livraison directe chez vous.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/collection" className="relative group overflow-hidden rounded-xl bg-slate-950 p-px font-mono text-sm font-bold text-primary shadow-cyan-glow active:scale-[0.99] transition w-64 block">
              <span className="absolute inset-0 animate-laser-spin bg-conic-laser opacity-75 group-hover:opacity-100 transition" />
              <span className="relative flex w-full items-center justify-center gap-3 rounded-[11px] bg-slate-900/90 px-8 py-5 backdrop-blur-xl transition group-hover:bg-slate-900/70">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <span>VOIR LA COLLECTION</span>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="border-t border-surfaceBorder bg-surface/20 backdrop-blur-md z-10 relative"
      >
        <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-surfaceBorder/50">
            <div className="text-center px-4">
              <div className="text-3xl font-black font-grotesk text-text mb-1">04</div>
              <div className="text-[10px] font-mono text-textDim tracking-widest uppercase">Villes Desservies</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-black font-grotesk text-text mb-1">24/48h</div>
              <div className="text-[10px] font-mono text-textDim tracking-widest uppercase">Livraison Rapide</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-black font-grotesk text-primary mb-1">100%</div>
              <div className="text-[10px] font-mono text-textDim tracking-widest uppercase">Transactions Sécurisées</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-black font-grotesk text-text mb-1">24/7</div>
              <div className="text-[10px] font-mono text-textDim tracking-widest uppercase">Service Client</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
