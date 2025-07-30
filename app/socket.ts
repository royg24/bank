import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { getIdFromEmail } from './database.js';
import { AuthenticationError } from './errorHandler.js';

const connectedUsers = new Map<string, string>();

export function setup(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on('register', (accessToken: string) => {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_KEY!) as { id: string };

        const userId = decoded.id;
        connectedUsers.set(userId, socket.id);

        console.log(`Registered user ${userId} with socket ID ${socket.id}`);
      } catch (err) {
        socket.disconnect();
        throw new AuthenticationError(`Invalid token from socket ${socket.id}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);

      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
    });
  });
}

export function notifyUser(io: Server, userId: string, data: any) {
  const socketId = connectedUsers.get(userId);

  if (socketId) {
    io.to(socketId).emit('new transaction', data);
    console.log(`Notification sent to user ${userId}`);
  } else {
    console.log(`User ${userId} not connected`);
  }
}
