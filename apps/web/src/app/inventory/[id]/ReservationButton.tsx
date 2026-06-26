// apps/web/src/app/inventory/[id]/ReservationButton.tsx
// PROJECT OBSIDIAN — Spinning Laser Conic Cyber-Button
'use client';

import React, { useState, useEffect } from 'react';
import { reserveVehicle, probeOrderState } from '@carshop/api-client';
import jsPDF from 'jspdf';

interface Props {
  vehicleId: string;
  vehicleName: string;
  vin: string;
  userId: string;
  depositAmount: number;
}

export default function ReservationButton({ vehicleId, vehicleName, vin, userId, depositAmount }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State Machine Tracking
  const [activeIntent, setActiveIntent] = useState<string | null>(null);
  const [ratifiedOrder, setRatifiedOrder] = useState<any | null>(null);

  // THE SENTINEL LOOP
  useEffect(() => {
    if (!activeIntent || ratifiedOrder) return;

    const sentinelInterval = setInterval(async () => {
      try {
        const liveState = await probeOrderState(activeIntent);

        if (liveState.status === 'DEPOSIT_SECURED') {
          setRatifiedOrder(liveState);
          setActiveIntent(null);
          clearInterval(sentinelInterval);
        }
      } catch (e) {
        // Silently absorb transient dev-network dropped packets
      }
    }, 1500); // 1.5s telemetry sweep

    // Failsafe: Kill sentinel after 30s to prevent infinite RAM polling
    const killSwitch = setTimeout(() => {
      clearInterval(sentinelInterval);
      if (!ratifiedOrder) {
        setActiveIntent(null);
        setErrorMessage("GATEWAY_TIMEOUT: Interbank settlement exceeded 30s SLA.");
      }
    }, 30000);

    return () => {
      clearInterval(sentinelInterval);
      clearTimeout(killSwitch);
    };
  }, [activeIntent, ratifiedOrder]);

  const handleHoldAuthorization = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const response = await reserveVehicle({ vehicleId, userId, depositAmount });
      if (response.success) {
        // Arm the Sentinel; do not grant green status yet!
        setActiveIntent(response.order.intentToken);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || "TRANSACTION_CONCURRENCY_VIOLATION";
      setErrorMessage(errorMsg === "VEHICLE_UNAVAILABLE_FOR_RESERVATION"
        ? "MISSION_FAILED: This unit was locked by another transaction terminal."
        : `SYSTEM_ALERT: ${errorMsg}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProformaPDF = () => {
    if (!ratifiedOrder) return;
    const doc = new jsPDF();

    // Helper to safely format numbers for jsPDF without Intl thin-space encoding issues
    const formatCurrency = (amount: number) => {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // --- OBSIDIAN Voucher Layout ---

    // Full-page Obsidian background
    doc.setFillColor(2, 6, 23); // #020617
    doc.rect(0, 0, 210, 297, "F");

    // Header Band
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 50, "F");

    // Cyan accent line
    doc.setFillColor(6, 182, 212); // primary cyan
    doc.rect(0, 50, 210, 1.5, "F");

    // Header Text
    doc.setTextColor(6, 182, 212);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("AURORA", 20, 28);

    doc.setTextColor(226, 232, 240); // text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("OFFICIAL PROFORMA HOLD VOUCHER", 20, 37);
    doc.setTextColor(100, 116, 139);
    doc.text("TERMINAL 04 // SECTOR RABAT", 20, 43);

    // Status Badge
    doc.setFillColor(16, 185, 129); // emerald
    doc.roundedRect(145, 18, 45, 14, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("RATIFIED", 157, 27);

    // Asset Manifest Section
    doc.setTextColor(6, 182, 212);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("ASSET MANIFEST", 20, 70);

    // Separator line
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.3);
    doc.line(20, 74, 190, 74);

    // Key-Value Grid
    const startY = 84;
    const lineHeight = 12;

    const drawField = (label: string, value: string, y: number) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // textDim
      doc.text(label, 20, y);
      doc.setTextColor(226, 232, 240); // text
      doc.setFont("helvetica", "bold");
      doc.text(value, 75, y);
    };

    drawField("LEDGER REF:", ratifiedOrder.orderNumber, startY);
    drawField("VEHICLE:", vehicleName, startY + lineHeight);
    drawField("OPTICAL VIN:", vin, startY + lineHeight * 2);

    // Financial Box
    doc.setFillColor(15, 23, 42);
    doc.setDrawColor(30, 41, 59);
    doc.roundedRect(20, 125, 170, 50, 3, 3, "FD");

    // Hold Deposit
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("HOLD DEPOSIT SECURED:", 30, 142);
    doc.setTextColor(16, 185, 129); // emerald
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`MAD ${formatCurrency(Number(ratifiedOrder.depositAmount))}`, 120, 142);

    // Total Valuation
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("TOTAL UNIT VALUATION:", 30, 160);
    doc.setTextColor(6, 182, 212); // cyan
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`MAD ${formatCurrency(Number(ratifiedOrder.finalPrice))}`, 120, 160);

    // SLA Details
    const slaDate = new Date(ratifiedOrder.expiresAt).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(244, 63, 94); // rose/error
    doc.text(`MUTEX EXPIRATION SLA: ${slaDate}`, 20, 192);

    // Footer
    doc.setDrawColor(30, 41, 59);
    doc.line(20, 200, 190, 200);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text("LEGAL NOTICE: Unit locked in PostgreSQL database for 48 hours awaiting wire funds.", 20, 208);
    doc.text("AURORA AGENTIC AUTOMOTIVE PLATFORM // SECTOR 04 RABAT, MOROCCO", 20, 214);

    doc.save(`AURORA_${ratifiedOrder.orderNumber}_VOUCHER.pdf`);
  };

  // ═══════════════════════════════════════════════════════════
  // RENDER STAGE 4: RATIFIED — Emerald Laser
  // ═══════════════════════════════════════════════════════════
  if (ratifiedOrder) {
    return (
      <div className="flex flex-col gap-3">
        {/* Ratified Status Badge */}
        <div className="flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest">
            CENTRAL BANK CLEARANCE RATIFIED
          </span>
        </div>

        {/* PDF Download — Emerald Laser Button */}
        <button
          onClick={downloadProformaPDF}
          className="relative group w-full overflow-hidden rounded-xl bg-slate-950 p-px font-mono text-xs font-bold text-emerald-400 shadow-emerald-glow active:scale-[0.99] transition"
        >
          <span className="absolute inset-0 animate-laser-spin bg-conic-laser-emerald opacity-75 group-hover:opacity-100 transition" />
          <span className="relative flex w-full items-center justify-center gap-3 rounded-[11px] bg-slate-900/90 px-6 py-4 backdrop-blur-xl transition group-hover:bg-slate-900/70">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>DOWNLOAD PROFORMA VOUCHER (PDF)</span>
          </span>
        </button>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // RENDER STAGE 3: THE SENTINEL — Amber Laser
  // ═══════════════════════════════════════════════════════════
  if (activeIntent) {
    return (
      <div className="flex flex-col gap-3">
        <button
          disabled
          className="relative w-full overflow-hidden rounded-xl bg-slate-950 p-px font-mono text-xs font-bold text-amber-400 cursor-wait"
        >
          <span className="absolute inset-0 animate-laser-spin bg-conic-laser-amber opacity-60 transition" />
          <span className="relative flex w-full items-center justify-center gap-3 rounded-[11px] bg-slate-900/90 px-6 py-4 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <span className="animate-pulse">NEGOTIATING INTERBANK RAILS...</span>
          </span>
        </button>
        <div className="text-amber-400/70 font-mono text-[10px] text-center p-2 rounded-lg bg-amber-500/5 border border-amber-500/15">
          Establishing encrypted tunnel to Central Clearing House. Do not close this window.
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // RENDER STAGE 1 & 2: IDLE & HANDSHAKE — Cyan Laser
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleHoldAuthorization}
        disabled={isProcessing}
        className={`relative group w-full overflow-hidden rounded-xl bg-slate-950 p-px font-mono text-xs font-bold active:scale-[0.99] transition ${
          isProcessing
            ? 'text-textMuted cursor-not-allowed'
            : 'text-primary shadow-cyan-glow'
        }`}
      >
        {/* The Spinning Cybernetic Laser Perimeter */}
        {!isProcessing && (
          <span className="absolute inset-0 animate-laser-spin bg-conic-laser opacity-75 group-hover:opacity-100 transition" />
        )}

        {/* The Frosted Carbon Inner Core */}
        <span className={`relative flex w-full items-center justify-center gap-3 rounded-[11px] px-6 py-4 backdrop-blur-xl transition ${
          isProcessing
            ? 'bg-slate-800/90'
            : 'bg-slate-900/90 group-hover:bg-slate-900/70'
        }`}>
          {isProcessing ? (
            <>
              <span className="h-2 w-2 rounded-full bg-textMuted animate-pulse" />
              <span className="animate-pulse">WRITING MUTEX...</span>
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <span>AUTHORIZE 10% HOLD [ MAD {depositAmount.toLocaleString('en-US')} ]</span>
            </>
          )}
        </span>
      </button>

      {errorMessage && (
        <div className="text-error font-mono text-[10px] text-center p-2 rounded-lg bg-error/5 border border-error/15">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
