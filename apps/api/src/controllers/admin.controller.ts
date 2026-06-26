// apps/api/src/controllers/admin.controller.ts
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { prisma } from '../lib/prisma';
import { CreateVehicleSchema } from '@carshop/schema';

// 1. Bare-Metal Disk Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `FLEET-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

export const uploadMiddleware = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error("MISSION_ABORT: Only JPEG, PNG, or WEBP images authorized."));
  }
}).single('image'); // note: the blueprint expects single('image') instead of 'photo'

// 2. The Ingestion Route Handler
export const ingestVehicle = async (req: Request, res: Response) => {
  try {
    // Multer parses the text fields into req.body, and the file into req.file
    const rawData = {
      ...req.body,
      year: Number(req.body.year),
      price: Number(req.body.price),
      mileage: Number(req.body.mileage),
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };

    const validatedData = CreateVehicleSchema.parse(rawData);

    const vehicle = await prisma.vehicleInventory.create({
      data: validatedData
    });

    return res.status(201).json({ success: true, data: vehicle });
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message });
  }
};
