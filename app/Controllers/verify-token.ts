import { Router } from 'express';
import { verifyToken } from '../utils/utils.js';

export default function verifyUserToken() {
    const router = Router();

    router.get('/', async (req, res) => {
        await verifyToken(req.headers.authorization);
        return res.status(200).json({ verified: true });
    });

    return router;
}