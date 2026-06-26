// apps/web/src/app/about/page.tsx
// PROJECT OBSIDIAN — About Page

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold tracking-widest mb-6 inline-block">
          DECRYPTING ORIGINS
        </span>
        <h1 className="text-4xl font-black tracking-tight text-text font-grotesk uppercase drop-shadow-lg">
          About <span className="text-primary">Aurora</span>
        </h1>
      </div>

      <div className="space-y-8">
        <div className="glass-panel p-8 md:p-12 border-l-4 border-l-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-32 h-32 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-text font-grotesk mb-4">THE INITIATIVE</h2>
          <p className="text-textMuted font-mono text-sm leading-relaxed mb-6">
            Aurora Agentic Automotive Commerce Platform was initialized in Sector 04 (Rabat, Morocco) to eliminate the friction inherent in legacy vehicle acquisition pipelines. By providing direct, bare-metal access to a relational terminal, we allow operatives to secure high-value assets with zero latency.
          </p>
          <p className="text-textMuted font-mono text-sm leading-relaxed">
            Every transaction is safeguarded by cryptographic Mutex locks, ensuring absolute data integrity during the reservation sequence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold text-text font-grotesk mb-3">SYSTEM ARCHITECTURE</h3>
            <ul className="space-y-3 font-mono text-xs text-textDim">
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Next.js React Framework</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Tailwind CSS (Project Obsidian Theme)</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Express API Gateway</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Prisma ORM / PostgreSQL</li>
            </ul>
          </div>
          
          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold text-text font-grotesk mb-3">OPERATIONAL PROTOCOLS</h3>
            <ul className="space-y-3 font-mono text-xs text-textDim">
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Real-time Inventory Sync</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Atomic Reservation Locking</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Secure Asset Ingestion</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Distributed Fleet Management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
