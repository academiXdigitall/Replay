import express from 'express';
import http from 'http';
import cors from 'cors';
import { setupWebSocket } from './websocket/socketServer';
import { initDb } from './db/pool';
import { createEventController } from './controllers/eventController';
import { createAuthMiddleware } from './middleware/authMiddleware';

async function main() {
  const app = express();
  const server = http.createServer(app);
  const io = setupWebSocket(server);

  app.use(express.json());
  app.use(cors());

  // Initialize SQLite Database
  const db = await initDb();

  // Routes
  const ingestEvents = createEventController(db, io);
  const verifyApiKey = createAuthMiddleware(db);

  app.post('/api/events', verifyApiKey, ingestEvents);
  
  app.post('/api/checkout', (req, res) => {
    res.status(500).json({ error: 'Database timeout during order creation' });
  });

  server.listen(4000, () => {
    console.log('⚡ Replay Server running on port 4000 with SQLite');
  });
}

main().catch(console.error);