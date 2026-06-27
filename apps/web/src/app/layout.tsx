// apps/web/src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";

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

        {/* ═══ HEADER (Sticky) ═══ */}
        <header className="sticky top-0 z-50 w-full flex flex-col">
          {/* ═══ TOP BANNER ═══ */}
        <div className="bg-primary/10 border-b border-primary/20 px-4 sm:px-6 py-2 flex items-center justify-center text-center">
          <p className="font-mono text-[11px] text-primary tracking-widest uppercase font-bold">
            LIVRAISON PARTOUT AU MAROC, DIRECTEMENT CHEZ VOUS
          </p>
        </div>

          {/* ═══ NAVIGATION BAR ═══ */}
          <nav className="px-4 sm:px-6 py-3 border-b border-surfaceBorder flex items-center justify-between bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-lg tracking-tight font-grotesk uppercase">Car Store</span>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-1.5 text-xs font-mono font-semibold text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition"
              >
                ACCUEIL
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
                À PROPOS
              </Link>
              <Link
                href="/contact"
                className="px-4 py-1.5 text-xs font-mono font-semibold text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition"
              >
                CONTACT
              </Link>
              
              <div className="h-4 w-px bg-surfaceBorder mx-1 hidden sm:block" />

              <UserMenu />
            </div>
          </nav>
        </header>

        {/* ═══ MAIN CONTENT ═══ */}
        <main className="flex-1">
          {children}
        </main>

        {/* ═══ FOOTER ═══ */}
        <footer className="border-t border-surfaceBorder px-4 sm:px-6 py-8 bg-background/90 backdrop-blur-md flex flex-col md:flex-row items-center justify-between text-textMuted text-xs font-mono relative z-10">
          <p>© {new Date().getFullYear()} Car Store. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-primary transition">À Propos</Link>
            <Link href="/contact" className="hover:text-primary transition">Contact</Link>
            <span className="hover:text-primary transition cursor-pointer">Politique de Confidentialité</span>
            <span className="hover:text-primary transition cursor-pointer">Conditions Générales</span>
          </div>
        </footer>

      </body>
    </html>
  );
}
