import { Router } from 'express';
import { ingestEvents } from '../controllers/eventController';
import { verifyApiKey } from '../middleware/authMiddleware';

export function createApiRouter(io: any) {
  const router = Router();
  router.post('/events', verifyApiKey, (req, res) => ingestEvents(req, res, io));
  
  router.post('/checkout', (req, res) => {
    res.status(500).json({ error: 'Database timeout during order creation' });
  });

  return router;
}