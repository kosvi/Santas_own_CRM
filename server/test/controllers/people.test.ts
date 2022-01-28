import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiPerson } from '../helpers/toApiObject/toApiPerson';
const api = supertest(app);

const NONEXISTENT_PERSON_ID = 100000;

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

  test('Displaying single person gives list of wishes', async () => {
    const rawResult = await api.get('/api/people/1').expect(200).expect('Content-Type', /application\/json/);
    const person = toApiPerson(rawResult.body);
    expect(person.wishes).toBeInstanceOf(Array);
    if (person.wishes && person.wishes.length > 0) {
      expect(person.wishes[0].item).toHaveProperty('id');
    } else {
      expect('error').toBe('for some reason wishes was not returned as expected');
    }
  });

  test('Incorrect ID returns 404', async () => {
    const rawResult = await api.get(`/api/people/${NONEXISTENT_PERSON_ID}`).expect(404).expect('Content-Type', /application\/json/);
    expect(rawResult.body).toHaveProperty('error');
  });

  test('Malformed ID return 400', async () => {
    const rawResult = await api.get('/api/people/foo').expect(400).expect('Content-Type', /application\/json/);
    expect(rawResult.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
