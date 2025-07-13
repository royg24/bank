import request from 'supertest';
import { app } from '../server.js';


describe('Sign Up API Tests', () => {
  const email1 = 'test@doe.edu';
  const email2 = 'test_doe@gamil.com';

  it('should successfully sign up a new user', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: email1,
        password: '12345678',
        phoneNumber: '054-1234567',
       });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User signed up successfully');
  });

  it('should successfully sign up a new user', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: email2,
        password: 'abcd1234',
        phoneNumber: '052-4508234',
       });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User signed up successfully');
  });

  it('should return 400 for missing email', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: '',
        password: '12345678',
        phoneNumber: '054-1234567'
       });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(`The email field is required`);
  });

  it('should return 400 for missing phone number', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: 'james@doe.com',
        password: '12345678',
        phoneNumber: ''
       });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(`The phone number field is required`);
  });

  it('should return 400 for invalid email format', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: 'john.doe.com',
        password: '12345678',
        phoneNumber: '054-1234567'
       });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });

  it('should return 400 for invalid email format', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: 'john_doe@gmail.comm',
        password: '12345678',
        phoneNumber: '054-1234567'
       });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });

  it('should return 400 for invalid password length', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: 'jeff_doe@gmail.com',
        password: '1234',
        phoneNumber: '054-1234567'
       });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Password must be between 8 and 20 characters long');
  });

  it('should return 400 for invalid phone number format', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: 'josh@doe.net',
        password: '12345678',
        phoneNumber: '0541234567'
       });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid phone number format');
  });

  it('should return 400 for invalid phone number format', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: 'josh@doe.co.il',
        password: '12345678',
        phoneNumber: '54-1234567'
       });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid phone number format');
  });

  it('should return 400 for invalid phone number format', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .send({ 
        email: 'jeff@doe.co.il',
        password: '12345678',
        phoneNumber: '054-123456'
       });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid phone number format');
  });

  it('should return 409 for taken email', async () => {
  const response = await request(app)
    .post('/auth/sign-up')
    .send({ 
      email: email1,
      password: '12345678',
      phoneNumber: '054-1234567'
    });
  
  expect(response.status).toBe(409);
  expect(response.body.error).toBe(`email ${email1} is taken`);
  });

});
