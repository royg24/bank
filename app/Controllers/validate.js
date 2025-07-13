import {Router} from 'express';

//TODO
export default function validateCode() {
    const router = Router();

    router.post('/', (req, res) => {
        res.status(200).json({ message: 'validate' });
    });

    return router;
}