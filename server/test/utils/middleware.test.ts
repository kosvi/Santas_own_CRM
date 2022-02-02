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

  test('invalid token gives proper error and 403', async () => {
    const response = await api.get('/api/entries')
      .set('Authorization', `bearer ${adminObj.token}foo`).expect(403).expect('Content-Type', /application\/json/);
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

});

afterAll(async () => {
  await sequelize.close();
});
