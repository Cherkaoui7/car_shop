// apps/api/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { RegisterUserSchema, LoginCredentialsSchema } from '@carshop/schema';

const generateTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId, role }, process.env.REFRESH_SECRET!, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response) => {
  try {
    const data = RegisterUserSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      return res.status(409).json({ error: "EMAIL_ALREADY_REGISTERED" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      }
    });

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName },
      accessToken
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = LoginCredentialsSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName },
      accessToken
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message });
  }
};
