import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../server.js';

describe('Transaction API Tests', () => {
    let token1 = null;
    let token2 = null;

    const email1 = 'testtest@gmail.com';
    const email2 = 'testdoe@doe.net';
 
    const wrongToken = jwt.sign({ email: 'james@doe.net' }, process.env.JWT_KEY, 
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

    it('makes 2 transactions, not a test', async() => {
        await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: email2,
                amount: 100,
            });

        await request(app)
            .post('/transactions')
            .set('Authorization', token2)
            .send({ 
                receiverEmail: email1,
                amount: 250,
            });
    });

    it('should successfully get transactions for user1', async () => {
        const response = await request(app)
            .get('/transactions')
            .set('Authorization', token1)
            .query({ index: 1 });

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
        
        expect(response.body[0].amount).toBe(250);
        expect(response.body[0].participantEmail).toBe(email2);
        expect(response.body[0]).toHaveProperty('timestamp');

        expect(response.body[1].amount).toBe(-100);
        expect(response.body[1].participantEmail).toBe(email2);
        expect(response.body[1]).toHaveProperty('timestamp');

    });

    it('should successfully get transactions for user2', async () => {
        const response = await request(app)
            .get('/transactions')
            .set('Authorization', token2)
            .query({ index: 1 });

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
        
        expect(response.body[0].amount).toBe(-250);
        expect(response.body[0].participantEmail).toBe(email1);
        expect(response.body[0]).toHaveProperty('timestamp');

        expect(response.body[1].amount).toBe(100);
        expect(response.body[1].participantEmail).toBe(email1);
        expect(response.body[1]).toHaveProperty('timestamp');
    });

    it('makes another transaction, no test here', async () => {
        await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: email2,
                amount: 50,
            });
    });

    it('should return another transaction for user1', async () => {
        const response = await request(app)
            .get('/transactions')
            .set('Authorization', token1)
            .query({ index: 1 });

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(3);
        
        expect(response.body[0].amount).toBe(-50);
        expect(response.body[0].participantEmail).toBe(email2);
        expect(response.body[0]).toHaveProperty('timestamp');
    });

    it('should return another transaction for user2', async () => {
        const response = await request(app)
            .get('/transactions')
            .set('Authorization', token2)
            .query({ index: 1 });

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(3);
        
        expect(response.body[0].amount).toBe(50);
        expect(response.body[0].participantEmail).toBe(email1);
        expect(response.body[0]).toHaveProperty('timestamp');
    });

    it('should return 3 transactions', async () => {
        const response = await request(app)
            .get('/transactions')
            .set('Authorization', token2)
            .query({ index: 1 });

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
        
        expect(response.body[0].amount).toBe(50);
        expect(response.body[0].participantEmail).toBe(email1);
        expect(response.body[0]).toHaveProperty('timestamp');

        expect(response.body[1].amount).toBe(-250);
        expect(response.body[1].participantEmail).toBe(email1);
        expect(response.body[1]).toHaveProperty('timestamp');

        expect(response.body[2].amount).toBe(100);
        expect(response.body[2].participantEmail).toBe(email1);
        expect(response.body[2]).toHaveProperty('timestamp');
    });

    it('should return 401 for invalid token', async () => {
        const response = await request(app)
            .get('/transactions')
            .set('Authorization', 'invalid_token');

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should return 401 for missing token', async () => {
        const response = await request(app)
            .get('/transactions')

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
    });

    it ('should return 404 for user not found', async () => {
        const response = await request(app)
            .get('/transactions')
            .set('Authorization', wrongToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('User not found');
    });
    
});