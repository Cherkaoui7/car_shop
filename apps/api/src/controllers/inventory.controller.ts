// apps/api/src/controllers/inventory.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { CatalogFilterSchema } from '@carshop/schema';
import crypto from 'crypto';
import { dispatchSyntheticBankClearing } from '../lib/mock-bank';

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

    const intentToken = `INTENT-${crypto.randomBytes(16).toString('hex').toUpperCase()}`;
    const orderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await prisma.$transaction(async (tx) => {
      const targetVehicle = await tx.vehicleInventory.findUnique({ where: { id: vehicleId } });

      if (!targetVehicle || targetVehicle.status !== 'AVAILABLE') {
        throw new Error("VEHICLE_UNAVAILABLE_FOR_RESERVATION");
      }

      // Optimistic Mutex Lock - Atomic Update
      const updateResult = await tx.vehicleInventory.updateMany({
        where: { id: vehicleId, status: 'AVAILABLE' },
        data: { status: 'PENDING_RESERVATION' }
      });

      if (updateResult.count === 0) {
        throw new Error("VEHICLE_UNAVAILABLE_FOR_RESERVATION");
      }

      return await tx.reservationOrder.create({
        data: {
          orderNumber: orderNum,
          userId,
          vehicleId,
          depositAmount,
          finalPrice: targetVehicle.price,
          intentToken,
          status: 'PENDING_GATEWAY',
          expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
        }
      });
    });

    // Unleash the asynchronous clearing house robot
    dispatchSyntheticBankClearing(intentToken, orderNum);

    return res.status(200).json({ success: true, order });
  } catch (error: any) {
    return res.status(409).json({ error: error.message });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehicleInventory.findUnique({
      where: { id },
      include: { location: true }
    });

    if (!vehicle) return res.status(404).json({ error: "VEHICLE_NOT_FOUND_IN_RELATIONAL_REGISTRY" });

    return res.status(200).json({ success: true, data: vehicle });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getVehicleByVin = async (req: Request, res: Response) => {
  try {
    const { vin } = req.params;
    const vehicle = await prisma.vehicleInventory.findUnique({
      where: { vin },
      include: { location: true }
    });

    if (!vehicle) return res.status(404).json({ error: "OPTICAL_VIN_NOT_REGISTERED" });

    return res.status(200).json({ success: true, data: vehicle });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const probeOrderStatus = async (req: Request, res: Response) => {
  try {
    const { intentToken } = req.params;

    const order = await prisma.reservationOrder.findUnique({
      where: { intentToken },
      select: {
        status: true,
        orderNumber: true,
        depositAmount: true,
        finalPrice: true,
        expiresAt: true
      }
    });

    if (!order) return res.status(404).json({ error: "UNINDEXED_INTENT_TOKEN" });

    return res.status(200).json({ success: true, data: order });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
