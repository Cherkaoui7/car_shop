// packages/api-client/src/index.ts
import axios from 'axios';
import { VehicleDTO } from '@carshop/schema';

export const apiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1', withCredentials: true });

export const fetchCatalog = async (filters?: any): Promise<VehicleDTO[]> => {
  const response = await apiClient.get('/inventory', { params: filters });
  return response.data.data;
};
