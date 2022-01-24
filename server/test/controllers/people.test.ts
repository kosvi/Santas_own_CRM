import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiPerson } from '../helpers/toApiObject/toApiPerson';
const api = supertest(app);

beforeAll(async () => {
  await connectionToDatabase();
});

describe('people controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
  });

  test('GET without keyword gives 400', async () => {
    const response = await api.get('/api/people').expect(400).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('Searching by name returns valid responses', async () => {
    const rawResult = await api.get('/api/people/?name=mikko').expect(200).expect('Content-Type', /application\/json/);
    if (rawResult.body instanceof Array) {
      expect(rawResult.body.length).toBeGreaterThan(0);
      rawResult.body.map(p => {
        toApiPerson(p);
      });
    } else {
      expect('error').toBe('result was not an Array!');
    }
  });

});

afterAll(async () => {
  await sequelize.close();
});
