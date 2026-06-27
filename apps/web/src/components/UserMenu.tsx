'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserMenu() {
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: string } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  if (!isMounted) return null; // Avoid hydration mismatch

  if (user) {
    return (
      <div className="flex items-center gap-3 ml-2 group relative">
        <div className="flex items-center gap-2 cursor-pointer p-1.5 pr-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold text-xs">
            {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
          </div>
          <span className="text-primary font-mono text-xs font-bold uppercase">
            {user.firstName}
          </span>
        </div>
        
        {/* Dropdown Menu */}
        <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="glass-panel p-2 rounded-lg border border-primary/20 shadow-cyan-glow flex flex-col gap-1 bg-background/95 backdrop-blur-xl">
            <div className="px-3 py-2 border-b border-surfaceBorder/50 mb-1">
              <p className="text-xs text-textMuted">Connecté en tant que</p>
              <p className="text-sm text-text font-bold truncate">{user.firstName} {user.lastName}</p>
            </div>
            {user.role === 'ADMIN' && (
              <Link href="/admin/ingest" className="px-3 py-2 text-xs font-mono text-emerald-400 hover:bg-surfaceBorder/30 rounded transition">
                ESPACE ADMIN
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-mono text-red-400 text-left hover:bg-surfaceBorder/30 rounded transition"
            >
              DÉCONNEXION
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="px-4 py-1.5 text-xs font-mono font-semibold text-textMuted hover:text-primary hover:bg-primary/5 rounded-lg transition"
      >
        CONNEXION
      </Link>
      <Link
        href="/register"
        className="px-4 py-1.5 text-xs font-mono font-bold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 rounded-lg transition"
      >
        S'INSCRIRE
      </Link>
    </>
  );
}
