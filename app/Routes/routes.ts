
import type { Application, Router } from 'express';
import signUp from '../Controllers/sign-up.js';
import validateCode from '../Controllers/validate.js';
import login from '../Controllers/login.js';
import getBalance from '../Controllers/balance.js';
import {makeTransaction} from '../Controllers/transactions.js';
import {getTransactions} from '../Controllers/transactions.js';
import {logout} from '../Controllers/logout.js';
import cors from 'cors';

const prefix = 'api'
export default function addRoutes(app : Application) {
    app.use(prefix, (router : Router) => {
        router.use('/auth/sign-up', signUp());
        router.use('/auth/sign-up/validate', validateCode());
        router.use('/auth/login', login());
        router.use('/balances', getBalance());
        router.use('/transactions', getTransactions());
        router.use('/transactions', makeTransaction());
        router.use('/logout', logout());
    });
}