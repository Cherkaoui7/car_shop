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

export const ingestVehicle = async (formData: FormData, token: string): Promise<VehicleDTO> => {
  const response = await apiClient.post('/admin/ingest', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.vehicle;
};
