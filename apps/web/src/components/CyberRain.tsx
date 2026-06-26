'use client';

import { useEffect, useRef } from 'react';

export default function CyberRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let drops: { x: number; y: number; speed: number; length: number; opacity: number }[] = [];

    const initDrops = () => {
      drops = [];
      const maxDrops = Math.floor(window.innerWidth / 5); // Responsive amount of rain
      for (let i = 0; i < maxDrops; i++) {
        drops.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speed: 10 + Math.random() * 15,
          length: 15 + Math.random() * 30,
          opacity: 0.1 + Math.random() * 0.4
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };
    
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Use the primary cyan color for the rain to match the Obsidian theme
        ctx.strokeStyle = `rgba(34, 211, 238, ${drop.opacity})`;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;

        // If drop goes below screen, reset to top
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
          drop.speed = 10 + Math.random() * 15;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen"
    />
  );
}
