'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement admin login logic
    console.log('Admin login attempt', { username, password });
  };

  return (
    <div className="flex flex-col relative min-h-screen items-center justify-center bg-[#010409]">
      {/* ═══ ADMIN BACKGROUND ═══ */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-background to-background" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 hex-pattern opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm px-4 relative z-10"
      >
        <div className="bg-[#050B14] border border-red-900/30 p-8 rounded-lg relative overflow-hidden shadow-[0_0_40px_rgba(153,27,27,0.1)]">
          
          {/* Admin Reticles */}
          <div className="reticle-container">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/50" />
          </div>
          
          <div className="scanline-overlay opacity-50" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="px-3 py-1 rounded bg-red-950/50 border border-red-900/50 text-red-500 font-mono text-[10px] font-bold tracking-[0.2em] mb-4 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                SYSTÈME INTERNE
              </span>
              <h1 className="text-2xl font-black tracking-widest text-gray-200 font-mono uppercase">
                Accès Admin
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-red-500/80 font-mono text-[10px] tracking-widest uppercase">
                  Identifiant Système
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-[#020617] border border-red-900/30 rounded px-4 py-3 text-red-100 font-mono text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all placeholder:text-red-950"
                  placeholder="admin_id"
                />
              </div>

              <div className="space-y-2">
                <label className="text-red-500/80 font-mono text-[10px] tracking-widest uppercase">
                  Clé d'Accès
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#020617] border border-red-900/30 rounded px-4 py-3 text-red-100 font-mono text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all placeholder:text-red-950"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full relative group overflow-hidden rounded bg-red-950/30 border border-red-900/50 px-4 py-3 mt-2 transition-all hover:bg-red-900/40 hover:border-red-500"
              >
                <span className="relative text-red-500 font-mono text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Authentifier
                </span>
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
