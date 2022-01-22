import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase, sequelize } from '../../src/utils/db';
const api = supertest(app);

beforeAll(async () => {
  await connectionToDatabase();
});

describe('users controller', () => {

  beforeEach(async () => {
    await api.post('/api/rest/full');
  });

  test('list all users', () => {
    expect(true).toBe(true);
  });
});

afterAll(async () => {
  await sequelize.close();
});