import request from 'supertest';
import { app } from '../server.js';
import jwt from 'jsonwebtoken';

describe('Login API Tests', () => {
    const email1 = 'test@gmail.com';
    const email2 = 'test@doe.net';
    let token1 = null;
    let token2 = null;
    const otherToken = jwt.sign({ email: 'james@doe.com' }, process.env.JWT_KEY, 
        { expiresIn: '24h' });

    beforeAll(async () => {
        // Sign up a users to test balance
        await request(app)
            .post('/auth/sign-up')
            .send({ 
                email: email1,
                password: 'abcd1234',
                phoneNumber: '052-4508234'
            });

        const response1 = await request(app)
            .post('/auth/login')
            .send({
                email: email1,
                password: 'abcd1234'
            });
        token1 = response1.body.accessToken;

        await request(app)
            .post('/auth/sign-up')
            .send({ 
                email: email2,
                password: '12345678',
                phoneNumber: '054-1234567',
            });
            
        const response2 = await request(app)
            .post('/auth/login')
            .send({
                email: email2,
                password: '12345678'
            });
        token2 = response2.body.accessToken;
    });

    it('should return the balance of the user', async () => {
        const response1 = await request(app)
            .get('/balances')
            .set('Authorization', token1);

        expect(response1.status).toBe(200);
        expect(response1.body.balance).toBe(1000000);

        const response2 = await request(app)
            .get('/balances')
            .set('Authorization', token2);

        expect(response2.status).toBe(200);
        expect(response2.body.balance).toBe(1000000);
    });

    it('should return updated balance after transaction', async () => {
        await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: email2,
                amount: 400,
            });
        
        const response1 = await request(app)
            .get('/balances')
            .set('Authorization', token1);

        expect(response1.status).toBe(200);
        expect(response1.body.balance).toBe(999600);

        const response2 = await request(app)
            .get('/balances')
            .set('Authorization', token2);

        expect(response2.status).toBe(200);
        expect(response2.body.balance).toBe(1000400);
    });

    it('should return 401 for missing token', async () => {
        const response = await request(app)
            .get('/balances')

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should return 401 for wrong token', async () => {
        const response = await request(app)
            .get('/balances')
            .set('Authorization', 'invalid_token');

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should return 404 for non-existing user', async () => {
        const response = await request(app)
            .get('/balances')
            .set('Authorization', otherToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('User not found');
    });
});