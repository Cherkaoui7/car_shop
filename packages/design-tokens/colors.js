// packages/design-tokens/colors.js
// PROJECT OBSIDIAN — CommonJS export for Tailwind/PostCSS consumption
// This file is the authoritative color palette. index.ts re-exports it for TypeScript consumers.

const colors = {
  // Canvas & Surfaces
  background: "#020617",       // True space black (slate-950)
  surface: "#0f172a",          // Frosted carbon glass base (slate-900)
  surfaceLight: "#1e293b",     // Elevated glass panel (slate-800)
  surfaceBorder: "#1e293b",    // Panel edge boundary

  // Primary Accent: Electric Cyan
  primary: "#06B6D4",          // Cyan-500
  primaryLight: "#22D3EE",     // Cyan-400 (hover states)
  primaryDark: "#0891B2",      // Cyan-600 (pressed states)

  // Secondary: Emerald (Status / Success)
  secondary: "#10B981",        // Emerald-500
  secondaryLight: "#34D399",   // Emerald-400

  // Status Colors
  accent: "#F59E0B",           // Amber (sentinel/warning)
  error: "#F43F5E",            // Rose-500
  success: "#10B981",          // Emerald-500

  // Typography
  text: "#E2E8F0",             // Slate-200 (primary text)
  textMuted: "#94A3B8",        // Slate-400 (secondary text — brighter)
  textDim: "#64748B",          // Slate-500 (tertiary/labels)
};

module.exports = { colors };
