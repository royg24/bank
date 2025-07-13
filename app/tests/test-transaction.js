import request from 'supertest';
import { app } from '../server.js';

describe('Transaction API Tests', () => {
    let token1 = null;
    let token2 = null;

    const email1 = 'test@test.com';
    const email2 = 'test@test.edu';
    const wrongEmail = 'james@doe.net';

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

    it('should successfully make a transaction', async () => {
        const response = await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: email2,
                amount: 100,
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Transaction completed successfully');
        expect(response.body.updatedBalance).toBe(999900);
    });

    it('should successfully make a transaction', async () => {
        const response = await request(app)
            .post('/transactions')
            .set('Authorization', token2)
            .send({ 
                receiverEmail: email1,
                amount: 250,
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Transaction completed successfully');
        expect(response.body.updatedBalance).toBe(999850);
    });

    it('should return 400 for missing receiver email', async () => {
        const response = await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: '',
                amount: 100,
            });
            
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('The receiver email field is required');
    });

    it('should return 400 for not positive amount', async () => {
        const response = await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: email1,
                amount: -20,
            });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Amount must be a positive number'); 
    });

    it('should return 401 for unauthorized request', async () => {
        const response = await request(app)
            .post('/transactions')
            .send({ 
                receiverEmail: email2,
                amount: 100,
            });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Unauthorized');
    });

    it('should return 404 for non-existing user', async () => {
        const response = await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: wrongEmail,
                amount: 100,
            });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Receiver not found');
    });

    it('should return 409 for insufficient balance', async () => {
        const response = await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: email2,
                amount: 2000000,
            });

        expect(response.status).toBe(409);
        expect(response.body.error).toBe('Insufficient amount for transaction');
    });

    it('should return 409 for self transaction', async () => {
        const response = await request(app)
            .post('/transactions')
            .set('Authorization', token1)
            .send({ 
                receiverEmail: email1,
                amount: 1000,
            });

        expect(response.status).toBe(409);
        expect(response.body.error).toBe('Cannot make a self transaction');
    });

});