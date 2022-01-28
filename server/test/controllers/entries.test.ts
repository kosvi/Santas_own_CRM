import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiEntry } from '../helpers/toApiObject';
const api = supertest(app);

const INVALID_PERSON_ID = 100000;

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
    if (response.body instanceof Array && response.body.length > 1) {
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

  // malformed or missing limit should revert to default limit
  test('Malformed limit returns 200', async () => {
    const rawResult = await api.get('/api/entries/?limit=foo').expect(200).expect('Content-Type', /application\/json/);
    expect(rawResult.body).toBeInstanceOf(Array);
    if (rawResult.body instanceof Array) {
      expect(rawResult.body.length).toBeGreaterThan(0);
    } else {
      expect('error').toBe('entries not returned in an Array');
    }
  });

  test('new entry can be posted', async () => {
    const resultFromPost = await api.post('/api/entries').send({
      personId: 1,
      niceness: 10,
      description: 'Was really kind to old lady!'
    }).expect(201).expect('Content-Type', /application\/json/);
    // the result should be a valid entry object
    expect(() => { toApiEntry(resultFromPost.body); }).not.toThrow(Error);
    const postResultEntry = toApiEntry(resultFromPost.body);
    expect(postResultEntry.personId).toBe(1);
    expect(postResultEntry.niceness).toBe(10);
    expect(postResultEntry.description).toBe('Was really kind to old lady!');
    // let's also check that the entry is returned as the latest entry
    const resultFromGet = await api.get('/api/entries/?limit=1');
    expect(resultFromGet.body).toBeInstanceOf(Array);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const getResultEntry = toApiEntry(resultFromGet.body[0]);
    expect(getResultEntry.personId).toBe(1);
    expect(getResultEntry.niceness).toBe(10);
    expect(getResultEntry.description).toBe('Was really kind to old lady!');
  });

  test('invalid entry returns proper status codes', async () => {
    const firstInvalidResult = await api.post('/api/entries').send({
      personId: INVALID_PERSON_ID,
      niceness: 10,
      description: 'foobar'
    }).expect(400).expect('Content-Type', /application\/json/);
    expect(firstInvalidResult.body).toHaveProperty('error');
    const secondInvalidResult = await api.post('/api/entries').send({
      personId: 1,
      niceness: 'string',
      description: ''
    }).expect(400);
    expect(secondInvalidResult.body).toHaveProperty('error');
    const thirdInvalidResult = await api.post('/api/entries').send({
      personId: 1,
      niceness: 10
    }).expect(400);
    expect(thirdInvalidResult.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
