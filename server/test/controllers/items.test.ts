import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiItem } from '../helpers/toApiObject';
const api = supertest(app);

beforeAll(async () => {
  await connectionToDatabase();
});

describe('items controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
  });

  test('items are ordered by count DESC', async () => {
    const response = await api.get('/api/items').expect(200).expect('Content-Type', /application\/json/);
    expect(response.body).toBeInstanceOf(Array);
    if(response.body instanceof Array) {
      // take the count of the first item in the array in 'current'
      let current: number;
      if(response.body.length>0) {
	const item = toApiItem(response.body[0]);
	current = item.count;
      } else {
	current = 0;
      }
      // make sure that count never becomes greater (ORDER BY count DESC)
      response.body.map(i => {
	const item = toApiItem(i);
	expect(item.count).not.toBeGreaterThan(current);
	expect(item.count).toBeLessThanOrEqual(current);
	current = item.count;
      });
    } else {
      expect('error').toBe('response was not an Array');
    }
  });

  test('amount of items returned is limited by count', async () => {
    const response = await api.get('/api/items/?limit=3').expect(200).expect('Content-Type', /application\/json/);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(3);
  });

  test('Malformed limit return 400', async () => {
    const rawResult = await api.get('/api/items/?limit=foo').expect(400).expect('Content-Type', /application\/json/);
    expect(rawResult.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
