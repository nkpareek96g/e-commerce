import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { PrismaClient } from '@prisma/client';

let io: Server;

export const initializeWebSocket = (server: HttpServer): void => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket: any) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

export const broadcastStockUpdate = (product: any): void => {
  if (io) {
    io.emit('stockUpdate', product);
  }
}; 