import type { Application, Router } from 'express';
import express from 'express';
import signUp from '../Controllers/sign-up.js';
import validateCode from '../Controllers/validate.js';
import sendCode from '../Controllers/send.js';
import login from '../Controllers/login.js';
import getBalance from '../Controllers/balance.js';
import { makeTransaction, getTransactions } from '../Controllers/transactions.js';
import { logout } from '../Controllers/logout.js';
import cors from 'cors';

const prefix = '/api';

export default function addRoutes(app: Application) {
  app.use(cors({ origin: process.env.WEB_URL, credentials: true }));

  const router: Router = express.Router();

  router.use('/auth/sign-up', signUp());
  router.use('/auth/sign-up/validate', validateCode());
  router.use('/auth/sign-up/send', sendCode());
  router.use('/auth/login', login());
  router.use('/balances', getBalance());
  router.use('/transactions', getTransactions());
  router.use('/transactions', makeTransaction());
  router.use('/logout', logout());

  app.use(prefix, router);
}
