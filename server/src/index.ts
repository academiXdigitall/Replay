import express from 'express';
import http from 'http';
import cors from 'cors';
import { setupWebSocket } from './websocket/socketServer';
import { createApiRouter } from './routes/apiRoutes';

const app = express();
const server = http.createServer(app);
const io = setupWebSocket(server);

app.use(express.json());
app.use(cors());

app.use('/api', createApiRouter(io));

server.listen(4000, () => {
  console.log('⚡ Replay Server running on port 4000');
});