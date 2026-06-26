'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GhostNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState('');

  const notifications = [
    "Quelqu'un à Casablanca vient de réserver une Porsche 911 GT3",
    "Un utilisateur à Rabat consulte la Mercedes AMG GT",
    "Plus que 2 unités de la Tesla Model S en stock au Maroc",
    "Quelqu'un à Tanger vient d'acquérir la BMW M4",
    "Un client à Marrakech est intéressé par le Range Rover"
  ];

  useEffect(() => {
    // Show a random notification after 5 seconds
    const showTimer = setTimeout(() => {
      const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
      setNotification(randomNotif);
      setIsVisible(true);
    }, 5000);

    // Hide it after 10 seconds total
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-6 right-6 z-50 glass-panel px-4 py-3 border border-primary/30 shadow-cyan-glow flex items-center gap-3 rounded-lg bg-slate-900/90 backdrop-blur-md max-w-sm"
        >
          <div className="h-2 w-2 rounded-full bg-primary animate-ping shrink-0" />
          <p className="text-xs font-mono text-text">
            {notification}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
