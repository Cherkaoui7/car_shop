// apps/api/src/controllers/inventory.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { CatalogFilterSchema } from '@carshop/schema';

export const getCatalog = async (req: Request, res: Response) => {
  try {
    const filters = CatalogFilterSchema.parse(req.query);

    const whereClause: any = { status: filters.status || 'AVAILABLE' };
    if (filters.make) whereClause.make = { equals: filters.make, mode: 'insensitive' };
    if (filters.model) whereClause.model = { equals: filters.model, mode: 'insensitive' };
    if (filters.maxPrice) whereClause.price = { lte: filters.maxPrice };

    const vehicles = await prisma.vehicleInventory.findMany({
      where: whereClause,
      include: { location: true },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({ success: true, count: vehicles.length, data: vehicles });
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message });
  }
};

export const reserveVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId, userId, depositAmount } = req.body;

    // Execute atomic transaction to prevent double-booking race conditions
    const order = await prisma.$transaction(async (tx) => {
      const targetVehicle = await tx.vehicleInventory.findUnique({ where: { id: vehicleId } });

      if (!targetVehicle || targetVehicle.status !== 'AVAILABLE') {
        throw new Error("VEHICLE_UNAVAILABLE_FOR_RESERVATION");
      }

      // Lock vehicle
      await tx.vehicleInventory.update({
        where: { id: vehicleId },
        data: { status: 'PENDING_RESERVATION' }
      });

      // Issue Order
      return await tx.reservationOrder.create({
        data: {
          orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          userId,
          vehicleId,
          depositAmount,
          finalPrice: targetVehicle.price,
          expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 Hour hold
        }
      });
    });

    return res.status(200).json({ success: true, order });
  } catch (error: any) {
    return res.status(409).json({ error: error.message });
  }
};

import { CreateVehicleSchema } from '@carshop/schema';

export const ingestVehicle = async (req: Request, res: Response) => {
  try {
    const data = CreateVehicleSchema.parse(req.body);
    
    let imageUrl = null;
    if (req.file) {
      // The file was saved to apps/api/uploads
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newVehicle = await prisma.vehicleInventory.create({
      data: {
        ...data,
        imageUrl,
      }
    });

    return res.status(201).json({ success: true, vehicle: newVehicle });
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message });
  }
};
