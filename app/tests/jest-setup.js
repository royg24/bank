import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { testCleanUp } from '../database.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await testCleanUp();
  await mongoose.disconnect();
  await mongoServer.stop();
});
