'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CyberRain from '../../components/CyberRain';

import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du compte');
      }

      alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen items-center justify-center py-12">
      {/* ═══ GLOBAL PAGE BACKGROUNDS ═══ */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
      <CyberRain />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md px-4 sm:px-6 relative z-10"
      >
        <div className="glass-panel-elevated p-8 relative overflow-hidden mt-8">
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
                NOUVEAU DOSSIER
              </span>
              <h1 className="text-3xl font-black tracking-tight text-text font-grotesk uppercase drop-shadow-lg">
                Créer un compte
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm font-mono text-center mb-4">
                  {error === 'EMAIL_ALREADY_REGISTERED' ? 'Cet email est déjà utilisé' : error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-primary font-mono text-xs tracking-widest uppercase">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-background/50 border border-surfaceBorder rounded-lg px-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-textDim"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary font-mono text-xs tracking-widest uppercase">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-background/50 border border-surfaceBorder rounded-lg px-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-textDim"
                    placeholder="Doe"
                  />
                </div>
              </div>

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
                <label className="text-primary font-mono text-xs tracking-widest uppercase">
                  Mot de passe
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

              <div className="space-y-2">
                <label className="text-primary font-mono text-xs tracking-widest uppercase">
                  Confirmer Mot de passe
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-background/50 border border-surfaceBorder rounded-lg px-4 py-3 text-text font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-textDim"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full relative group overflow-hidden rounded-lg bg-primary/10 border border-primary/50 px-4 py-3 mt-4 transition-all hover:bg-primary/20 hover:border-primary"
              >
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative text-primary font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Autoriser Création
                </span>
              </button>
            </form>
            
            <div className="mt-8 text-center text-textMuted font-mono text-xs">
              DÉJÀ PILOTE ?{' '}
              <Link href="/login" className="text-primary hover:underline underline-offset-4 decoration-primary/50 font-bold transition-all">
                CONNEXION
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
