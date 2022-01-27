import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiEntry } from '../helpers/toApiObject';
const api = supertest(app);

beforeAll(async () => {
  await connectionToDatabase();
});

describe('entries controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
  });

  test('entries are ordered by updatedAt DESC', async () => {
    // let's first add an entry that get's atleast a bit different updatedAt timestamp
    await api.post('/api/entries').send({
      personId: 1,
      niceness: 10,
      description: 'Was really kind to old lady!'
    }).expect(201).expect('Content-Type', /application\/json/);
    const response = await api.get('/api/entries').expect(200).expect('Content-Type', /application\/json/);
    expect(response.body).toBeInstanceOf(Array);
    if(response.body instanceof Array && response.body.length>1) {
      // make sure latest entry has bigger timestamp compared to second timestamp
      const latestEntry = toApiEntry(response.body[0]);
      const secondEntry = toApiEntry(response.body[1]);
      const latestTimestamp = latestEntry.updatedAt.getTime();
      const secondTimestamp = secondEntry.updatedAt.getTime();
      expect(latestTimestamp).toBeGreaterThan(secondTimestamp);
    } else {
      expect('error').toBe('response was not an Array');
    }
  });

  test('amount of entries returned is limited by limit', async () => {
    const response = await api.get('/api/entries/?limit=1').expect(200).expect('Content-Type', /application\/json/);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
  });

  test('Malformed limit returns 200', async () => {
    const rawResult = await api.get('/api/entries/?limit=foo').expect(200).expect('Content-Type', /application\/json/);
    expect(rawResult.body).toBeInstanceOf(Array);
    if(rawResult.body instanceof Array) {
      expect(rawResult.body.length).toBeGreaterThan(0);
    } else {
      expect('error').toBe('entries not returned in an Array');
    }
  });

});

afterAll(async () => {
  await sequelize.close();
});
