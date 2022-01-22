import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase, sequelize } from '../../src/utils/db';
import { toApiUser } from '../helpers/toApiObject/toApiUser';
const api = supertest(app);

const NUMBER_OF_DEFAULT_USERS = 4;

beforeAll(async () => {
  await connectionToDatabase();
});

describe('users controller', () => {

  beforeEach(async () => {
    await api.post('/api/rest/full');
  });

  test('list all users', async () => {
    const rawAllUsers = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/);
    expect(rawAllUsers.body).toHaveLength(NUMBER_OF_DEFAULT_USERS);
    // Validate each user to be a valid user object (with valid groups)
    if (rawAllUsers.body instanceof Array) {
      rawAllUsers.body.map(user => {
        const apiUser = toApiUser(user);
        expect(apiUser).toHaveProperty('username');
        expect(apiUser).toHaveProperty('name');
      });
    } else {
      // Nasty, but I can't come up with any better solution
      expect('error').toBe('api didn\'t return an Array');
    }
  });
});

afterAll(async () => {
  await sequelize.close();
});