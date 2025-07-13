import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from './database.js';
import signUp from './routes/sign-up.js';
import validateCode from './routes/validate.js';
import login from './routes/login.js';
import getBalance from './routes/balance.js';
import makeTransaction from './routes/transaction.js';
import getTransactions from './routes/transactions.js';
import {logout} from './routes/logout.js'

const app = express();
const port = process.env.BACKEND_PORT;

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use('/auth/sign-up', signUp());
app.use('/auth/sign-up/validate', validateCode());
app.use('/auth/login', login());
app.use('/balances', getBalance());
app.use('/transactions', getTransactions());
app.use('/transactions', makeTransaction());
app.use('/logout', logout());

process.env.JWT_KEY = crypto.randomBytes(64).toString('hex');

const shutdown = async () => {
  console.log('\nShutting down server...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};


let server;
if (process.env.NODE_ENV !== 'test') {
  connectDB();
  server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });
  process.on('SIGINT', shutdown); 
  process.on('SIGTERM', shutdown);
}

export {app};