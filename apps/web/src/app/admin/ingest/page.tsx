// apps/web/src/app/admin/ingest/page.tsx
// PROJECT OBSIDIAN — Fleet Ingestion Engine
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateVehicleSchema, CreateVehicleInput } from '@carshop/schema';
import { ingestVehicle } from '@carshop/api-client';
import { useState } from 'react';

export default function AdminIngestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateVehicleInput>({
    resolver: zodResolver(CreateVehicleSchema),
    defaultValues: {
      status: 'AVAILABLE',
      dealershipLocationId: 'cbee7a2d-8907-4422-bcd0-94480b389063' // HQ-RABAT (Aurora Premium Auto)
    }
  });

  const onSubmit = async (data: CreateVehicleInput, event?: React.BaseSyntheticEvent) => {
    setIsSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      const fileInput = event?.target.elements.image as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append('image', fileInput.files[0]);
      }

      const dummyAdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0LWFkbWluIiwicm9sZSI6IkFETUlOIn0.xxx";

      await ingestVehicle(formData, dummyAdminToken);

      setSuccessMsg('Vehicle ingested successfully into PostgreSQL registry.');
      reset();
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      console.error(err);
      setErrorMsg('INGESTION_FAILURE: Check API Gateway console for diagnostic trace.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "mt-1 block w-full rounded-lg bg-surface border border-surfaceBorder text-text font-mono text-sm p-2.5 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition placeholder:text-textDim";
  const labelClass = "block text-[10px] font-mono font-semibold text-textMuted tracking-widest uppercase";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="glass-panel-elevated p-8">
        <h1 className="text-xl font-bold font-grotesk text-text mb-1">FLEET INGESTION ENGINE</h1>
        <p className="text-textDim font-mono text-xs mb-8">Register new automotive asset into the relational registry</p>

        {successMsg && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 p-3 rounded-lg bg-error/10 border border-error/20 text-error font-mono text-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-error" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>VIN</label>
              <input {...register('vin')} className={inputClass} placeholder="17-char identifier" />
              {errors.vin && <p className="text-error text-[10px] font-mono mt-1">{errors.vin.message}</p>}
            </div>

            <div>
              <label className={labelClass}>MAKE</label>
              <input {...register('make')} className={inputClass} placeholder="e.g. Volkswagen" />
              {errors.make && <p className="text-error text-[10px] font-mono mt-1">{errors.make.message}</p>}
            </div>

            <div>
              <label className={labelClass}>MODEL</label>
              <input {...register('model')} className={inputClass} placeholder="e.g. Golf R" />
              {errors.model && <p className="text-error text-[10px] font-mono mt-1">{errors.model.message}</p>}
            </div>

            <div>
              <label className={labelClass}>YEAR</label>
              <input type="number" {...register('year')} className={inputClass} placeholder="2026" />
              {errors.year && <p className="text-error text-[10px] font-mono mt-1">{errors.year.message}</p>}
            </div>

            <div>
              <label className={labelClass}>TRIM</label>
              <input {...register('trim')} className={inputClass} placeholder="Optional trim" />
            </div>

            <div>
              <label className={labelClass}>PRICE (MAD)</label>
              <input type="number" step="0.01" {...register('price')} className={inputClass} placeholder="620000" />
              {errors.price && <p className="text-error text-[10px] font-mono mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className={labelClass}>MILEAGE (KM)</label>
              <input type="number" {...register('mileage')} className={inputClass} placeholder="0" />
              {errors.mileage && <p className="text-error text-[10px] font-mono mt-1">{errors.mileage.message}</p>}
            </div>

            <div>
              <label className={labelClass}>EXTERIOR COLOR</label>
              <input {...register('exteriorColor')} className={inputClass} placeholder="e.g. Lapiz Blue" />
              {errors.exteriorColor && <p className="text-error text-[10px] font-mono mt-1">{errors.exteriorColor.message}</p>}
            </div>

            <div>
              <label className={labelClass}>DEALERSHIP LOCATION ID</label>
              <input {...register('dealershipLocationId')} className={inputClass} />
              {errors.dealershipLocationId && <p className="text-error text-[10px] font-mono mt-1">{errors.dealershipLocationId.message}</p>}
            </div>

            <div>
              <label className={labelClass}>VEHICLE PHOTO</label>
              <input type="file" name="image" accept="image/*" className="mt-1 block w-full text-textMuted font-mono text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border file:border-surfaceBorder file:text-xs file:font-mono file:font-semibold file:bg-surface file:text-textMuted hover:file:bg-surfaceLight hover:file:text-primary file:transition file:cursor-pointer" />
            </div>
          </div>

          {/* Submit — Laser Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative group w-full overflow-hidden rounded-xl bg-slate-950 p-px font-mono text-xs font-bold active:scale-[0.99] transition ${
              isSubmitting ? 'text-textMuted cursor-not-allowed' : 'text-primary'
            }`}
          >
            {!isSubmitting && (
              <span className="absolute inset-0 animate-laser-spin bg-conic-laser opacity-60 group-hover:opacity-100 transition" />
            )}
            <span className={`relative flex w-full items-center justify-center gap-2 rounded-[11px] px-6 py-3.5 backdrop-blur-xl transition ${
              isSubmitting ? 'bg-slate-800/90' : 'bg-slate-900/90 group-hover:bg-slate-900/70'
            }`}>
              {isSubmitting ? (
                <span className="animate-pulse">INGESTING INTO REGISTRY...</span>
              ) : (
                <span>INGEST VEHICLE INTO FLEET</span>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
