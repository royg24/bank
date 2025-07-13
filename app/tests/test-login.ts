import request from 'supertest';
import { app } from '../server.js';

describe('Login API Tests', () => {
    const email = 'test@doe_gmail.com';
    const password = 'abcd1234';
    const wrongEmail = 'john_doe#gmail.com';
    const nonExistentEmail = 'jane@doe.net';
    const wrongPassword = 'wrongpassword';   

    beforeAll(async () => {
        // Sign up a user to test login
        await request(app)
            .post('/auth/sign-up')
            .send({ 
                email: email,
                password: password,
                phoneNumber: '052-4508234',
            });
    });

    it('should successfully log in with valid email and password', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ 
                email: email,
                password: password
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body).toHaveProperty('accessToken');
    });

    it('should return 400 for missing email', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ 
                email: '',
                password: password
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('The email field is required');
    });

    it('should return 400 for missing password', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ 
                email: email,
                password: ''
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('The password field is required');
    });

    it('should return 400 for wrong format email', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ 
                email: wrongEmail,
                password: password
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid email format');
    });

    it('should return 401 for incorrect email', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ 
                email: nonExistentEmail,
                password: password
            });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Incorrect email or password');
    });

    it('should return 401 for incorrect password', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ 
                email: email,
                password: wrongPassword
            });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Incorrect email or password');
    });

});