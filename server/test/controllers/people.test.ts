import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
const api = supertest(app);

beforeAll(async () => {
  await connectionToDatabase();
});

describe('people controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
  });

  test('get without keyword gives 400', async () => {
    const response = await api.get('/api/people').expect(400).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});