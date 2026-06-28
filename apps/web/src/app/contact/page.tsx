'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Je veux des infos sur une voiture');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // On simule l'envoi du message
    setShowNotification(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold tracking-widest mb-6 inline-block">
          NOUS CONTACTER
        </span>
        <h1 className="text-4xl font-black tracking-tight text-text font-grotesk uppercase drop-shadow-lg">
          Contactez-<span className="text-primary">Nous</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* ═══ CONTACT INFO ═══ */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-sm font-mono font-bold text-primary mb-1">NOS BUREAUX</h3>
            <p className="text-text font-grotesk text-lg">Bureau Principal</p>
            <p className="text-textMuted font-mono text-xs mt-2">
              Technopolis Park<br />
              Rabat 11100<br />
              Maroc
            </p>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-sm font-mono font-bold text-primary mb-1">APPELEZ-NOUS</h3>
            <p className="text-text font-grotesk text-lg">+212 537 000 000</p>
            <p className="text-textMuted font-mono text-xs mt-2">
              contact@carstore.com
            </p>
          </div>

          <div className="glass-panel p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400">NOTRE ÉQUIPE EST LÀ</span>
            </div>
          </div>
        </div>

        {/* ═══ SECURE FORM ═══ */}
        <div className="md:col-span-3 glass-panel p-8 relative">
          
          <AnimatePresence>
            {showNotification && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-background/95 backdrop-blur-md rounded-xl"
              >
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold font-grotesk text-text uppercase mb-2">Message Envoyé !</h3>
                  <p className="text-textMuted font-mono text-sm">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold text-textDim mb-2">VOTRE NOM</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-surfaceBorder rounded-lg px-4 py-3 text-sm font-mono text-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition"
                  placeholder="Comment vous appelez-vous ?"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-textDim mb-2">VOTRE E-MAIL</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-surfaceBorder rounded-lg px-4 py-3 text-sm font-mono text-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition"
                  placeholder="Pour qu'on puisse vous répondre"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-textDim mb-2">POURQUOI NOUS CONTACTEZ-VOUS ?</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-surfaceBorder rounded-lg px-4 py-3 text-sm font-mono text-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition appearance-none"
              >
                <option>Je veux des infos sur une voiture</option>
                <option>J'ai besoin d'aide avec ma réservation</option>
                <option>Je souhaite proposer un partenariat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-textDim mb-2">VOTRE MESSAGE</label>
              <textarea 
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-surfaceBorder rounded-lg px-4 py-3 text-sm font-mono text-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition resize-none"
                placeholder="Dites-nous tout..."
              />
            </div>

            <button type="submit" className="w-full relative group overflow-hidden rounded-xl bg-slate-950 p-px font-mono text-sm font-bold text-primary shadow-[0_0_15px_rgba(34,211,238,0.15)] active:scale-[0.99] transition mt-4">
              <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-50 group-hover:opacity-100 transition duration-500" />
              <span className="relative flex w-full items-center justify-center gap-3 rounded-[11px] bg-slate-900/95 px-8 py-4 backdrop-blur-xl transition group-hover:bg-slate-900/80">
                <span>ENVOYER LE MESSAGE</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
