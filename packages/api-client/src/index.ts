// packages/api-client/src/index.ts
import axios from 'axios';
import { VehicleDTO } from '@carshop/schema';

// Fallback to local network IP so physical phones and browsers share the exact same Gateway
const LOCAL_GATEWAY = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: LOCAL_GATEWAY,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
export const fetchCatalog = async (filters?: any): Promise<VehicleDTO[]> => {
  const response = await apiClient.get('/inventory', { params: filters });
  return response.data.data;
};

export const reserveVehicle = async (data: { vehicleId: string, userId: string, depositAmount: number }) => {
  const response = await apiClient.post('/inventory/reserve', data);
  return response.data;
};

export const ingestVehicle = async (formData: FormData, token: string): Promise<VehicleDTO> => {
  const response = await apiClient.post('/admin/ingest', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.vehicle;
};

// Extracts the root domain (http://localhost:5000) by stripping the /api/v1 suffix
export const STATIC_ASSET_BASE = LOCAL_GATEWAY.replace(/\/api\/v1\/?$/, '');

/**
 * Transforms relative "/uploads/photo.jpg" into absolute bare-metal Gateway URLs
 */
export const resolveImageUrl = (path?: string | null): string => {
  if (!path) return 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'; // Fallback silhouette
  if (path.startsWith('http')) return path;
  return `${STATIC_ASSET_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const fetchVehicleById = async (id: string): Promise<VehicleDTO> => {
  const response = await apiClient.get(`/inventory/${id}`);
  return response.data.data;
};
