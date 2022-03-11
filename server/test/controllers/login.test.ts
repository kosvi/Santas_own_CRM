import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiGroup, toApiLogin, toLoginResult } from '../helpers/toApiObject';
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
    expect(loginObject).toHaveProperty('permissions');
    expect(loginObject.permissions).toBeInstanceOf(Array);
    expect(loginObject.permissions[0]).toHaveProperty('code');
    expect(loginObject).toHaveProperty('groups');
    expect(loginObject.groups).toBeInstanceOf(Array);
    expect(loginObject.groups).toHaveLength(1);
    expect(loginObject.groups[0]).toHaveProperty('name');
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

  test('Allow switching active group', async () => {
    const adminLoginResult = await api.post('/api/login').send({
      username: 'admin',
      password: 'password'
    }).expect(200);
    const firstAdminLoginObj = toLoginResult(adminLoginResult.body);
    const santaGroupResponse = await api.get('/api/groups/santa').set('Authorization', `bearer ${firstAdminLoginObj.token}`).expect(200);
    const santaGroup = toApiGroup(santaGroupResponse.body);
    // Add santagroup to admin
    await api.post('/api/groups/connect').set('Authorization', `bearer ${firstAdminLoginObj.token}`).send({
      userId: firstAdminLoginObj.id,
      groupId: santaGroup.id
    }).expect(201);
    // re-login as admin
    const newAdminLoginResponse = await api.post('/api/login').send({
      username: 'admin',
      password: 'password'
    }).expect(200);
    const secondAdminLoginObj = toLoginResult(newAdminLoginResponse.body);
    expect(secondAdminLoginObj.groups).toHaveLength(2);
    // now we can change to active group
    const response = await api.put('/api/login').send({
      token: secondAdminLoginObj.token,
      groupId: secondAdminLoginObj.groups[0].id === secondAdminLoginObj.activeGroup ? secondAdminLoginObj.groups[1].id : secondAdminLoginObj.groups[0].id
    }).expect(200);
    const newGroupResult = toLoginResult(response.body);
    expect(newGroupResult.activeGroup).not.toBe(secondAdminLoginObj.activeGroup);
  });

});

afterAll(async () => {
  await sequelize.close();
});
