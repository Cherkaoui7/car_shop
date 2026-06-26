// packages/schema/src/vehicle.schema.ts
import { z } from 'zod';

export const VehicleStatusSchema = z.enum([
  'AVAILABLE', 'PENDING_RESERVATION', 'RESERVED', 'SOLD', 'IN_TRANSIT', 'MAINTENANCE'
]);

export const VehicleSchema = z.object({
  id: z.string().uuid(),
  vin: z.string().length(17, "VIN must be exactly 17 characters"),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1),
  trim: z.string().nullable().optional(),
  price: z.coerce.number().positive("Price must be greater than zero"),
  mileage: z.coerce.number().int().nonnegative(),
  exteriorColor: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
  status: VehicleStatusSchema,
  dealershipLocationId: z.string().uuid(),
});

export const CreateVehicleSchema = VehicleSchema.omit({ id: true, status: true }).extend({
  status: VehicleStatusSchema.optional().default('AVAILABLE'),
});

export const CatalogFilterSchema = z.object({
  make: z.string().optional(),
  model: z.string().optional(),
  maxPrice: z.number().positive().optional(),
  status: VehicleStatusSchema.optional(),
});

export type VehicleDTO = z.infer<typeof VehicleSchema>;
export type CreateVehicleInput = z.infer<typeof CreateVehicleSchema>;
export type CatalogFilterInput = z.infer<typeof CatalogFilterSchema>;
