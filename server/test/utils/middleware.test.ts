import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toLoginResult, toApiError } from '../helpers/toApiObject';
const api = supertest(app);

interface UserObj {
  username?: string,
  password?: string,
  id: number,
  token: string
}

const adminObj: UserObj = {
  username: 'admin',
  password: 'password',
  id: 0,
  token: ''
};

beforeAll(async () => {
  await connectionToDatabase();
  await api.post('/api/reset/full');
  // let's get admin token before rest of the tests
  const response = await api.post('/api/login').send({ username: adminObj.username, password: adminObj.password });
  const loginResult = toLoginResult(response.body);
  adminObj.id = loginResult.id;
  adminObj.token = loginResult.token;
});

describe('test authenticate from middleware', () => {

  test('invalid token gives 401', async () => {
    const response = await api.get('/api/entries')
      .set('Authorization', `bearer ${adminObj.token}foo`).expect(401).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('without permissions, access fails if authentication is needed', async () => {
    // nobody has no group -> no permissions set
    const loginResponse = await api.post('/api/login').send({ username: 'nobody', password: 'nobody' }).expect(200);
    const loginResult = toLoginResult(loginResponse.body);
    const nobodyObj = {
      id: loginResult.id,
      token: loginResult.token
    };
    const accessResponse = await api.get('/api/entries')
      .set('Authorization', `bearer ${nobodyObj.token}`).expect(403).expect('Content-Type', /application\/json/);
    expect(accessResponse.body).toHaveProperty('error');
  });

  test('without Authorization-header 401 is returned if auth needed', async () => {
    const response = await api.get('/api/entries').expect(401).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('if read permission is false, can\'t read api', async ()=>{
    const loginResponse = await api.post('/api/login').send({username: 'elf', password: 'elf'}).expect(200);
    const loginResult = toLoginResult(loginResponse.body);
    // elf:elf belongs to group 'scout' -> read / write are set to false on every endpoint
    const scoutObj = {
      id: loginResult.id,
      token: loginResult.token
    };
    const accessResponse = await api.get('/api/entries')
      .set('Authorization', `bearer ${scoutObj.token}`).expect(403).expect('Content-Type', /application\/json/);
    expect(accessResponse.body).toHaveProperty('error');
  });

  test('disabling user remove access instantly', async () => {
    const loginResponse = await api.post('/api/login').send({username: 'santa', password: 'santa'}).expect(200);
    const loginResult = toLoginResult(loginResponse.body);
    await api.get('/api/entries').set('Authorization', `bearer ${loginResult.token}`).expect(200);
    await api.put(`/api/users/disable/${loginResult.id}`).set('Authorization', `bearer ${adminObj.token}`).expect(200);
    // santa should be disabled now, we should get 403
    const deniedResponse = await api.get('/api/entries').set('Authorization', `bearer ${loginResult.token}`).expect(403);
    const denialError = toApiError(deniedResponse.body);
    expect(denialError.error).toBe('account disabled');
    // try to delete session 
    await api.delete(`/api/logout/session/${loginResult.token}`).set('Authorization', `bearer ${adminObj.token}`).expect(404);
    await api.put(`/api/users/enable/${loginResult.id}`).set('Authorization', `bearer ${adminObj.token}`).expect(200);
    const secondLoginResponse = await api.post('/api/login').send({username: 'santa', password: 'santa'}).expect(200);
    const secondLoginResult = toLoginResult(secondLoginResponse.body);
    // this token should be expired
    await api.get('/api/entries').set('Authorization', `bearer ${secondLoginResult.token}`).expect(200);
    // two lines below are just for debugging purposes, but should remain here for now...
    await api.delete(`/api/logout/session/${secondLoginResult.token}`).set('Authorization', `bearer ${adminObj.token}`).expect(204);
    await api.get('/api/entries').set('Authorization', `bearer ${secondLoginResult.token}`).expect(401);
    await api.get('/api/entries').set('Authorization', `bearer ${loginResult.token}`).expect(401); 
  });

});

afterAll(async () => {
  await sequelize.close();
});
