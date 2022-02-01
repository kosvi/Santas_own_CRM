import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase, sequelize } from '../../src/utils/db';
import { toApiUser } from '../helpers/toApiObject/toApiUser';
const api = supertest(app);

const NUMBER_OF_DEFAULT_USERS = 5;
const NONEXISTING_USER_ID = 1000000;

beforeAll(async () => {
  await connectionToDatabase();
});

describe('users controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
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
        expect(apiUser.groups).toBeInstanceOf(Array);
      });
    } else {
      // Nasty, but I can't come up with any better solution
      expect('error').toBe('api didn\'t return an Array');
    }
  });

  test('single user is returned with valid id', async () => {
    // Let's get all users to find the ID of admin
    let adminID = 0;
    const rawUsers = await api.get('/api/users');
    if (rawUsers.body instanceof Array) {
      rawUsers.body.map(user => {
        const apiUser = toApiUser(user);
        if (apiUser.username === 'admin') {
          adminID = apiUser.id;
        }
      });
    }
    const rawUser = await api.get(`/api/users/${adminID}`).expect(200).expect('Content-Type', /application\/json/);
    const user = toApiUser(rawUser.body);
    // seems user could be validated by toApiUser-parser so we can be pretty sure it has all the attributes we wanted
    // Main difference is that with single user the groups SHOULD also contain functionalities 
    // we will be happy if the group just contains a functionality array
    expect(user.groups[0]).toHaveProperty('functionalities');
    expect(user.groups[0]).not.toHaveProperty('permissions');
    expect(user.groups[0].functionalities).toBeInstanceOf(Array);
  });

  test('non-existent id returns 404', async () => {
    const response = await api.get(`/api/users/${NONEXISTING_USER_ID}`).expect(404).expect('Content-Type', /application\/json/);
    expect(response).toHaveProperty('error');
  });

  test('invalid id gives proper error', async () => {
    const response = await api.get('/api/users/foo').expect(400).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('searching by keyword works', async () => {
    const firstResponse = await api.get('/api/users/?name=ELF').expect(200).expect('Content-Type', /application\/json/);
    expect(firstResponse.body).toBeInstanceOf(Array);
    expect(firstResponse.body).toHaveLength(2);
    // also a part of the name should work
    const secondResponse = await api.get('/api/users/?name=el').expect(200);
    expect(secondResponse.body).toHaveLength(2);
    // even if only single object is returned, it should be in an array
    const thirdResponse = await api.get('/api/users/?name=saNta').expect(200).expect('Content-Type', /application\/json/);
    expect(thirdResponse.body).toBeInstanceOf(Array);
    expect(thirdResponse.body).toHaveLength(1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(() => { toApiUser(thirdResponse.body[0]); }).not.toThrow(Error);
  });

  test('no results on search gives 404', async () => {
    const rawResponse = await api.get('/api/users/?name=foo').expect(404).expect('Content-Type', /application\/json/);
    expect(rawResponse.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
