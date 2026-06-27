'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CyberRain from '../../components/CyberRain';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.error;
        if (Array.isArray(data.error)) {
          errorMessage = data.error.map((e: any) => e.message).join(', ');
        } else if (typeof data.error === 'object') {
          errorMessage = JSON.stringify(data.error);
        }
        throw new Error(errorMessage || 'Erreur lors de la connexion');
      }

      // Store the token and user info
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      setShowSuccessPopup(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err: any) {
      setError(err.message === 'INVALID_CREDENTIALS' 
        ? 'Email ou mot de passe incorrect' 
        : err.message);
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen items-center justify-center">
      {/* ═══ GLOBAL PAGE BACKGROUNDS ═══ */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
      <CyberRain />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md px-4 sm:px-6 relative z-10"
      >
        <div className="glass-panel-elevated p-8 relative overflow-hidden">
          {/* Tracking Reticles */}
          <div className="reticle-container">
            <div className="reticle-bracket top-left" />
            <div className="reticle-bracket top-right" />
            <div className="reticle-bracket bottom-left" />
            <div className="reticle-bracket bottom-right" />
          </div>
          
          <div className="scanline-overlay" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold tracking-widest mb-4 inline-block shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                AUTHENTIFICATION
              </span>
              <h1 className="text-3xl font-black tracking-tight text-text font-grotesk uppercase drop-shadow-lg">
                Se Connecter
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm font-mono text-center mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-primary font-mono text-xs tracking-widest uppercase">
                  Identifiant (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-background/50 border border-surfaceBorder rounded-lg px-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-textDim"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-primary font-mono text-xs tracking-widest uppercase flex justify-between">
                  <span>Mot de passe</span>
                  <Link href="#" className="text-textMuted hover:text-primary transition-colors">
                    Oublié ?
                  </Link>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-background/50 border border-surfaceBorder rounded-lg px-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-textDim"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full relative group overflow-hidden rounded-lg bg-primary/10 border border-primary/50 px-4 py-3 transition-all hover:bg-primary/20 hover:border-primary"
              >
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative text-primary font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Initialiser Session
                </span>
              </button>
            </form>
            
            <div className="mt-8 text-center text-textMuted font-mono text-xs">
              NOUVEAU PILOTE ?{' '}
              <Link href="/register" className="text-primary hover:underline underline-offset-4 decoration-primary/50 font-bold transition-all">
                CRÉER UN COMPTE
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border border-primary/50 shadow-[0_0_40px_rgba(6,182,212,0.3)] p-8 rounded-2xl max-w-sm w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-xl font-bold font-grotesk text-text uppercase mb-2">Accès Autorisé</h2>
              <p className="text-textMuted font-mono text-sm mb-6">Connexion réussie. Redirection vers le terminal central...</p>
              <div className="w-full bg-surfaceBorder h-1 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 1.8, ease: "linear" }}
                  className="h-full bg-primary"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
