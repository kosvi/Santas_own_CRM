import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiLogin } from '../helpers/toApiObject';
const api = supertest(app);

beforeAll(async () => {
  await connectionToDatabase();
});

describe('login controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
  });

  test('login succeeds with valid credentiels', async () => {
    const rawResponse = await api.post('/api/login').send({
      username: 'santa',
      password: 'santa'
    }).expect(200).expect('Content-Type', /application\/json/);
    expect(() => { toApiLogin(rawResponse.body); }).not.toThrow(Error);
    const loginObject = toApiLogin(rawResponse.body);
    expect(loginObject).toHaveProperty('name');
    expect(loginObject).toHaveProperty('username');
    expect(loginObject).toHaveProperty('id');
    expect(loginObject).toHaveProperty('token');
  });

  test('login fails with incorrect username', async () => {
    const rawResponse = await api.post('/api/login').send({
      username: 'santa2',
      password: 'santa'
    }).expect(401).expect('Content-Type', /application\/json/);
    expect(() => { toApiLogin(rawResponse.body); }).toThrow(Error);
    expect(rawResponse.body).toHaveProperty('error');
  });

  test('login fails with incorrect password', async () => {
    const rawResponse = await api.post('/api/login').send({
      username: 'santa',
      password: 'santa2'
    }).expect(401).expect('Content-Type', /application\/json/);
    expect(() => { toApiLogin(rawResponse.body); }).toThrow(Error);
    expect(rawResponse.body).toHaveProperty('error');
  });

  test('login fails with malformed payload', async () => {
    const responseWithMissingUsername = await api.post('/api/login').send({
      password: 'santa'
    }).expect(400).expect('Content-Type', /application\/json/);
    const responseWithMissingPassword = await api.post('/api/login').send({
      username: 'santa'
    }).expect(400).expect('Content-Type', /application\/json/);
    expect(() => { toApiLogin(responseWithMissingPassword.body); }).toThrow(Error);
    expect(() => { toApiLogin(responseWithMissingUsername.body); }).toThrow(Error);
    expect(responseWithMissingPassword.body).toHaveProperty('error');
    expect(responseWithMissingUsername.body).toHaveProperty('error');
  });

  test('disabled user receives 403', async () => {
    const response = await api.post('/api/login').send({
      username: 'mickey',
      password: 'mouse'
    }).expect(403).expect('Content-Type', /application\/json/);
    expect(() => { toApiLogin(response.body); }).toThrow(Error);
    expect(response.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
