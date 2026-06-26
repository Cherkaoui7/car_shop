// apps/web/src/app/inventory/[id]/ReservationButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { reserveVehicle, probeOrderState } from '@carshop/api-client';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

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
          router.refresh(); // Locks the background server layout
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
  }, [activeIntent, ratifiedOrder, router]);

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
        :`SYSTEM_ALERT: ${errorMsg}`
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

    // --- Premium Voucher Layout ---
    
    // Header Background
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 45, "F");

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("AURORA LOGISTICS", 20, 24);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text("OFFICIAL PROFORMA HOLD VOUCHER", 20, 32);
    
    // Watermark / Status Badge in Header
    doc.setFillColor(16, 185, 129); // emerald-500
    doc.rect(145, 15, 45, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("RATIFIED", 157, 23);

    // Body content styling
    doc.setTextColor(15, 23, 42);
    
    // Vehicle Details Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("ASSET MANIFEST", 20, 65);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105); // slate-600
    
    // Key-Value Grid
    const startY = 75;
    const lineHeight = 10;
    
    doc.text("Ledger Ref No:", 20, startY);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(ratifiedOrder.orderNumber, 65, startY);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Vehicle:", 20, startY + lineHeight);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(vehicleName, 65, startY + lineHeight);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Optical VIN:", 20, startY + lineHeight * 2);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(vin, 65, startY + lineHeight * 2);

    // Divider Line
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(20, 105, 190, 105);

    // Financials Section (in a styled box)
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(20, 115, 170, 45, 3, 3, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.text("Hold Deposit Secured:", 30, 130);
    
    doc.setTextColor(16, 185, 129); // emerald-500
    doc.setFont("helvetica", "bold");
    doc.text(`MAD ${formatCurrency(Number(ratifiedOrder.depositAmount))}`, 130, 130);

    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Total Unit Valuation:", 30, 145);
    
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(`MAD ${formatCurrency(Number(ratifiedOrder.finalPrice))}`, 130, 145);

    // SLA Details
    const slaDate = new Date(ratifiedOrder.expiresAt).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(225, 29, 72); // rose-600
    doc.text(`MUTEX EXPIRATION SLA: ${slaDate}`, 20, 175);

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("LEGAL NOTICE: Unit locked in PostgreSQL database for 48 hours awaiting wire funds.", 20, 185);

    doc.save(`AURORA_${ratifiedOrder.orderNumber}_VOUCHER.pdf`);
  };

  // RENDER STAGE 4: RATIFIED
  if (ratifiedOrder) {
    return (
      <div className="flex flex-col gap-2 items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-200 text-emerald-900">
          CENTRAL BANK CLEARANCE RATIFIED
        </span>
        <button
          onClick={downloadProformaPDF}
          className="w-full mt-4 py-4 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs rounded-xl shadow-md transition flex justify-center items-center gap-2"
        >
          DOWNLOAD PROFORMA VOUCHER (PDF)
        </button>
      </div>
    );
  }

  // RENDER STAGE 3: THE SENTINEL (AMBER)
  if (activeIntent) {
    return (
      <div className="flex flex-col gap-2">
        <button
          disabled
          className="w-full py-4 text-white font-bold rounded-xl shadow-lg flex justify-center items-center gap-2 bg-amber-500 cursor-wait shadow-amber-500/20"
        >
          <span className="font-mono text-sm animate-pulse">NEGOTIATING INTERBANK RAILS...</span>
        </button>
        <div className="text-amber-600 font-mono text-xs mt-2 text-center p-2 bg-amber-50 border border-amber-200 rounded">
          Establishing encrypted tunnel to Central Clearing House. Do not close this window.
        </div>
      </div>
    );
  }

  // RENDER STAGE 1 & 2: IDLE & HANDSHAKE
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleHoldAuthorization}
        disabled={isProcessing}
        className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition transform active:scale-[0.99] flex justify-center items-center gap-2 ${
          isProcessing
            ? 'bg-slate-400 cursor-not-allowed shadow-none'
            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10'
        }`}
      >
        {isProcessing ? (
          <span className="font-mono text-sm animate-pulse">WRITING MUTEX...</span>
        ) : (
          <span>AUTHORIZE 10% HOLD (MAD {depositAmount.toLocaleString()})</span>
        )}
      </button>
      {errorMessage && (
        <div className="text-red-500 font-mono text-xs mt-2 text-center p-2 bg-red-50 border border-red-200 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
