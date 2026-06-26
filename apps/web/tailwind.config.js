const { colors } = require('@carshop/design-tokens/colors.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ...colors },
      fontFamily: {
        grotesk: ['"Playfair Display"', 'serif'],
        mono: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(to right, #AA8C2C, #D4AF37, #AA8C2C)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.1)',
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1)',
        'amber-glow': '0 0 20px rgba(245, 158, 11, 0.3), 0 0 60px rgba(245, 158, 11, 0.1)',
      },
    },
  },
  plugins: [],
};
