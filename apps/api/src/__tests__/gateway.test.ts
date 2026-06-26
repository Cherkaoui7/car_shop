import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import inventoryRoutes from '../routes/inventory.routes';

// Instantiate an isolated test instance of our router
const app = express();
app.use(express.json());
app.use('/api/v1/inventory', inventoryRoutes);

describe('Aurora Backend API Gateway', () => {
  
  it('GET /api/v1/inventory -> Should return 200 and a catalog array', async () => {
    const response = await request(app).get('/api/v1/inventory');
  
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/v1/inventory/vin/INVALID_VIN -> Should return 404 optical panic', async () => {
    const response = await request(app).get('/api/v1/inventory/vin/FAKE0000000000000');
  
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('OPTICAL_VIN_NOT_REGISTERED');
  });

});
