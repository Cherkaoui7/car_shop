// apps/web/src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "AURORA // Terminal 04",
  description: "Aurora Agentic Automotive Commerce Platform — Sector 04 Rabat, Morocco",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-text antialiased font-grotesk flex flex-col">

        {/* ═══ HUD STATUS BAR ═══ */}
        <header className="hud-bar sticky top-0 z-50 px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">SYSTEM OK</span>
            </span>
            <span className="text-textDim">•</span>
            <span className="text-textMuted">DB: <span className="text-text">0.4ms</span></span>
            <span className="text-textDim">•</span>
            <span className="text-textMuted">RAILS: <span className="text-primary">CMI_MOROCCO_ACTIVE</span></span>
            <span className="text-textDim">•</span>
            <span className="text-textMuted">MUTEX_LOCKED: <span className="text-text">false</span></span>
          </div>
          <span className="font-mono text-[11px] text-textMuted">
            OP: <span className="text-primary font-semibold">CHERKAOUI</span>
          </span>
        </header>

        {/* ═══ NAVIGATION BAR ═══ */}
        <nav className="px-4 sm:px-6 py-3 border-b border-surfaceBorder flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-[33px] z-40">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg tracking-tight font-grotesk">AURORA</span>
            <span className="text-textDim font-mono text-xs">//</span>
            <span className="text-textMuted font-mono text-xs">TERMINAL 04</span>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-1.5 text-xs font-mono font-semibold text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition"
            >
              HOME
            </Link>
            <Link
              href="/collection"
              className="px-4 py-1.5 text-xs font-mono font-semibold text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition"
            >
              COLLECTION
            </Link>
            <Link
              href="/about"
              className="px-4 py-1.5 text-xs font-mono font-semibold text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition"
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className="px-4 py-1.5 text-xs font-mono font-semibold text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition"
            >
              CONTACT
            </Link>
            <Link
              href="/admin/ingest"
              className="ml-2 px-4 py-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-lg transition"
            >
              ADD CAR
            </Link>
          </div>
        </nav>

        {/* ═══ MAIN CONTENT ═══ */}
        <main className="flex-1">
          {children}
        </main>

        {/* ═══ SENTINEL FOOTER ═══ */}
        <footer className="hud-footer px-4 sm:px-6 py-2 flex items-center justify-between font-mono text-[10px]">
          <span className="text-textDim">
            [SYSTEM ONLINE // <span className="text-primary">RABAT, MOROCCO</span>]
          </span>
          <span className="text-textDim">
            SECTOR 04 • BARE-METAL GRID • PostgreSQL {'>'}= 16.x
          </span>
        </footer>

      </body>
    </html>
  );
}
