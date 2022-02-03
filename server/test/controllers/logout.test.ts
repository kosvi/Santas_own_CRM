import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toLoginResult, toApiMsg } from '../helpers/toApiObject';
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

  test('logout user by admin removes all sessions from user', async () => {
    // let's give second session for santa
    await api.post('/api/login').send({username: 'santa', password: 'santa'}).expect(200);
    const adminLoginResponse = await api.post('/api/login').send({username: 'admin', password: 'password'}).expect(200);
    const adminResult = toLoginResult(adminLoginResponse.body);
    const response = await api.delete(`/api/logout/user/${santaObj.id}`).set('Authorization', `bearer ${adminResult.token}`).expect(200);
    expect(response.body).toHaveProperty('msg');
    const apiMsg = toApiMsg(response.body);
    expect(apiMsg.msg).toBe('2 sessions deleted');
    await api.get('/api/entries').set('Authorization', `bearer ${santaObj.token}`).expect(401);
  });

  test('try to logout user with incorrect id gives 400', async () => {
    const adminLoginResponse = await api.post('/api/login').send({username: 'admin', password: 'password'}).expect(200);
    const adminResult = toLoginResult(adminLoginResponse.body);
    const response = await api.delete('/api/logout/user/foo').set('Authorization', `bearer ${adminResult.token}`).expect(400);
    expect(response.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
