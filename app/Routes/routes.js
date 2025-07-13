
import signUp from '../Controllers/sign-up.js';
import validateCode from '../Controllers/validate.js';
import login from '../Controllers/login.js';
import getBalance from '../Controllers/balance.js';
import {makeTransaction} from '../Controllers/transactions.js';
import {getTransactions} from '../Controllers/transactions.js';
import {logout} from '../Controllers/logout.js';
import cors from 'cors';

export default function addRoutes(app) {
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
    app.use('/auth/sign-up', signUp());
    app.use('/auth/sign-up/validate', validateCode());
    app.use('/auth/login', login());
    app.use('/balances', getBalance());
    app.use('/transactions', getTransactions());
    app.use('/transactions', makeTransaction());
    app.use('/logout', logout());   
}