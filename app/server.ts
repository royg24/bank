import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { connectDB } from './database.js';
import addRoutes from './Routes/routes.js';
import { handleError } from './errorHandler.js';
import { setup } from './socket.js';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
addRoutes(app);
app.use(handleError);

process.env.JWT_KEY = crypto.randomBytes(64).toString('hex');

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: [process.env.WEB_URL, process.env.LOCAL_WEB_URL].filter((url): url is string =>
      typeof url === 'string'
    ),
    methods: ['GET', 'POST'],
  },
});

setup(io);

const shutdown = async () => {
  console.log('\nShutting down server...');
  await mongoose.connection.close();
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

if (process.env.NODE_ENV !== 'test') {
  connectDB();
  httpServer.listen(port, () => {
    console.log(`Server with Socket.IO is running on http://localhost:${port}`);
  });

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

export { app, io };
