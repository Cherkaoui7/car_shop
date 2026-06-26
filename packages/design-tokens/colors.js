// packages/design-tokens/colors.js
// PROJECT OBSIDIAN — CommonJS export for Tailwind/PostCSS consumption
// This file is the authoritative color palette. index.ts re-exports it for TypeScript consumers.

const colors = {
  // Canvas & Surfaces
  background: "#050505",       // Deep luxury black
  surface: "#111111",          // Slightly lighter surface
  surfaceLight: "#1A1A1A",     // Elevated panel
  surfaceBorder: "#2A2A2A",    // Panel edge boundary

  // Primary Accent: Champagne Gold
  primary: "#D4AF37",          // Champagne Gold
  primaryLight: "#E6C96C",     // Light Gold (hover states)
  primaryDark: "#AA8C2C",      // Dark Gold (pressed states)

  // Secondary: Emerald (Status / Success)
  secondary: "#10B981",        // Emerald-500
  secondaryLight: "#34D399",   // Emerald-400

  // Status Colors
  accent: "#F59E0B",           // Amber
  error: "#F43F5E",            // Rose-500
  success: "#10B981",          // Emerald-500

  // Typography
  text: "#F8F9FA",             // Off-white (primary text)
  textMuted: "#ADB5BD",        // Gray-500 (secondary text)
  textDim: "#6C757D",          // Gray-600 (tertiary/labels)
};

module.exports = { colors };
