import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "UNAUTHORIZED_NO_TOKEN" });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "UNAUTHORIZED_INVALID_TOKEN" });
  }
};

export const requireRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "UNAUTHORIZED_NO_USER" });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: "FORBIDDEN_INSUFFICIENT_PERMISSIONS" });
    }
    
    next();
  };
};
