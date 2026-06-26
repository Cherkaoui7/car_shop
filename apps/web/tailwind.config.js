const { colors } = require('@carshop/design-tokens/colors.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ...colors },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'laser-spin': 'laser-spin 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'reticle-scan': 'reticle-scan 4s ease-in-out infinite',
      },
      keyframes: {
        'laser-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'reticle-scan': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
      backgroundImage: {
        'conic-laser': 'conic-gradient(from 90deg at 50% 50%, #020617 0%, #06B6D4 50%, #020617 100%)',
        'conic-laser-emerald': 'conic-gradient(from 90deg at 50% 50%, #020617 0%, #10B981 50%, #020617 100%)',
        'conic-laser-amber': 'conic-gradient(from 90deg at 50% 50%, #020617 0%, #F59E0B 50%, #020617 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.1)',
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1)',
        'amber-glow': '0 0 20px rgba(245, 158, 11, 0.3), 0 0 60px rgba(245, 158, 11, 0.1)',
      },
    },
  },
  plugins: [],
};
