import request from 'supertest'; import { app } from '../src/index.js';
describe('health',()=>{it('reports service health',async()=>{const r=await request(app).get('/api/health');expect(r.status).toBe(200);expect(r.body.status).toBe('ok')})});
