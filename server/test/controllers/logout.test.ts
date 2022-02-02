import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toLoginResult } from '../helpers/toApiObject';
const api = supertest(app);

interface UserObj {
  username?: string,
  password?: string,
  id: number,
  token: string
}

const santaObj: UserObj = {
  username: 'santa',
  password: 'santa',
  id: 0,
  token: ''
};

beforeAll(async () => {
  await connectionToDatabase();
});

describe('logout controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
    const loginResponse = await api.post('/api/login').send({ username: santaObj.username, password: santaObj.password });
    const loginResult = toLoginResult(loginResponse.body);
    santaObj.id = loginResult.id;
    santaObj.token = loginResult.token;
  });

  test('logout deletes session from current user', async () => {
    // first make sure token is valid = can read entries
    await api.get('/api/entries').set('Authorization', `bearer ${santaObj.token}`).expect(200);
    // now logout
    await api.delete('/api/logout').set('Authorization', `bearer ${santaObj.token}`).expect(200).expect('Content-Type', /application\/json/);
    // now accessing with that token should fail
    await api.get('/api/entries').set('Authorization', `bearer ${santaObj.token}`).expect(401);
  });

  test('logout single session by admin removes access', async () => {
    // first make sure token is valid = can read entries
    await api.get('/api/entries').set('Authorization', `bearer ${santaObj.token}`).expect(200);
    // now logout
    const adminLoginResponse = await api.post('/api/login').send({ username: 'admin', password: 'password' }).expect(200);
    const adminResult = toLoginResult(adminLoginResponse.body);
    await api.delete(`/api/logout/session/${santaObj.token}`).set('Authorization', `bearer ${adminResult.token}`).expect(204);
    // now accessing with that token should fail
    await api.get('/api/entries').set('Authorization', `bearer ${santaObj.token}`).expect(401);
  });

});

afterAll(async () => {
  await sequelize.close();
});
