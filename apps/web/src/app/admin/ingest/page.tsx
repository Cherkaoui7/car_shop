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
      // Provide a default dealership ID for local testing since we don't have dynamic selection yet
      dealershipLocationId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d' 
    }
  });

  const onSubmit = async (data: CreateVehicleInput, event?: React.BaseSyntheticEvent) => {
    setIsSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const formData = new FormData();
      
      // Append text fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Append file
      const fileInput = event?.target.elements.image as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append('image', fileInput.files[0]);
      }

      // Hardcode a dummy admin token for local testing to bypass auth wall
      const dummyAdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0LWFkbWluIiwicm9sZSI6IkFETUlOIn0.xxx"; 
      
      await ingestVehicle(formData, dummyAdminToken);
      
      setSuccessMsg('Vehicle ingested successfully!');
      reset();
      if (fileInput) fileInput.value = ''; // Reset file input
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to ingest vehicle. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Fleet Ingestion Engine</h1>
      
      {successMsg && <div className="bg-green-100 text-green-700 p-4 rounded mb-6">{successMsg}</div>}
      {errorMsg && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{errorMsg}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">VIN</label>
            <input {...register('vin')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            {errors.vin && <p className="text-red-500 text-xs mt-1">{errors.vin.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Make</label>
            <input {...register('make')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            {errors.make && <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input {...register('model')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input type="number" {...register('year')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Trim</label>
            <input {...register('trim')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" step="0.01" {...register('price')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mileage</label>
            <input type="number" {...register('mileage')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            {errors.mileage && <p className="text-red-500 text-xs mt-1">{errors.mileage.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Exterior Color</label>
            <input {...register('exteriorColor')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            {errors.exteriorColor && <p className="text-red-500 text-xs mt-1">{errors.exteriorColor.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Dealership Location ID</label>
            <input {...register('dealershipLocationId')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            {errors.dealershipLocationId && <p className="text-red-500 text-xs mt-1">{errors.dealershipLocationId.message}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Vehicle Photo</label>
            <input type="file" name="image" accept="image/*" className="mt-1 block w-full" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting ? 'Ingesting...' : 'Ingest Vehicle'}
        </button>
      </form>
    </div>
  );
}
