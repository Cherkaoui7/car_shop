// apps/web/src/app/inventory/[id]/ReservationButton.tsx
'use client';

import React, { useState } from 'react';
import { reserveVehicle } from '@carshop/api-client';
import { useRouter } from 'next/navigation';

interface ReservationProps {
  vehicleId: string;
  userId: string;
  depositAmount: number;
}

export default function ReservationButton({ vehicleId, userId, depositAmount }: ReservationProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleHoldAuthorization = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const response = await reserveVehicle({
        vehicleId,
        userId,
        depositAmount
      });

      if (response.success) {
        // Trigger a fresh Next.js Server Component re-validation to lock the screen instantly
        router.refresh();
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
          <span className="font-mono text-sm animate-pulse">EXECUTING ATOMIC TRANSACTION...</span>
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
