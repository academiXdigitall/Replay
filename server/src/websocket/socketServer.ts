import { Server } from 'socket.io';
import http from 'http';

export function setupWebSocket(server: http.Server) {
  const io = new Server(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    console.log('Dashboard connected:', socket.id);
  });
  return io;
}