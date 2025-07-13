import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

import express from 'express';
import { Server } from 'http'
import bodyParser from 'body-parser';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { connectDB } from './database.js';
import addRoutes from './Routes/routes.js'
import { handleError } from './errorHandler.js';

const app = express();
const port = process.env.BACKEND_PORT;

app.use(bodyParser.json());
addRoutes(app);
app.use(handleError);

process.env.JWT_KEY = crypto.randomBytes(64).toString('hex');

const shutdown = async () => {
  console.log('\nShutting down server...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};


let server : Server;
if (process.env.NODE_ENV !== 'test') {
  connectDB();
  server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });
  process.on('SIGINT', shutdown); 
  process.on('SIGTERM', shutdown);
}

export {app};