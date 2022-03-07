import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase, sequelize } from '../../src/utils/db';
import { ApiUser, toApiGroup, toApiUser, toLoginResult } from '../helpers/toApiObject';
const api = supertest(app);

const NUMBER_OF_DEFAULT_GROUPS = 4;
const ADMIN_GROUP_FUNCTIONALITIES = 5;
const NONEXISTENT_GROUP_ID = 1000000;
const NONEXISTENT_USER_ID = 1000000;

const adminObj = {
  username: 'admin',
  password: 'password',
  id: 0,
  token: ''
};

beforeAll(async () => {
  await connectionToDatabase();
});

describe('groups controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
    const response = await api.post('/api/login').send({ username: adminObj.username, password: adminObj.password });
    const loginResult = toLoginResult(response.body);
    adminObj.id = loginResult.id;
    adminObj.token = loginResult.token;
  });

  test('all groups are returned', async () => {
    // test that /api/groups returns 200 and content-type is application/json
    const allGroupsResult = await api.get('/api/groups').set('Authorization', `bearer ${adminObj.token}`).expect(200).expect('Content-Type', /application\/json/);
    // test that all 3 groups (in default data) are returned in a nice array
    expect(allGroupsResult.body).toHaveLength(NUMBER_OF_DEFAULT_GROUPS);
    if (allGroupsResult.body instanceof Array) {
      allGroupsResult.body.map(group => {
        // test that all groups have property 'name'
        expect(group).toHaveProperty('name');
        // let try-catch to give proper failure if parsing the data fails
        try {
          const apiGroup = toApiGroup(group);
          // if this is admin group, it should have all permissions (total of five!)
          if (apiGroup.name === 'admin') {
            expect(apiGroup.functionalities).toHaveLength(ADMIN_GROUP_FUNCTIONALITIES);
          }
        } catch (error) {
          if (error instanceof Error) {
            // it seems fail() is no longer part of Jest
            expect('error').toBe(error.message);
          } else {
            expect('error').toBe('something went wrong');
          }
        }
      });
    } else {
      fail('result was not an array');
    }
  });

  test('single group is returned with valid group name', async () => {
    const response = await api.get('/api/groups/admin').set('Authorization', `bearer ${adminObj.token}`).expect(200).expect('Content-Type', /application\/json/);
    try {
      const group = toApiGroup(response.body);
      expect(group.name).toEqual('admin');
      expect(group.functionalities).toHaveLength(ADMIN_GROUP_FUNCTIONALITIES);
    } catch (error) {
      if (error instanceof Error) {
        expect('error').toBe(error.message);
      } else {
        expect('error').toBe('something went wrong');
      }
    }
  });

  test('no group is returned with non-existent name', async () => {
    const response = await api.get('/api/groups/foo').set('Authorization', `bearer ${adminObj.token}`).expect(404).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('new group can be created', async () => {
    const response = await api.post('/api/groups/').set('Authorization', `bearer ${adminObj.token}`).send({ name: 'foo' }).expect(201).expect('Content-Type', /application\/json/);
    const group = toApiGroup(response.body);
    expect(group).toHaveProperty('id');
    const newResponse = await api.get('/api/groups/foo').set('Authorization', `bearer ${adminObj.token}`).expect(200).expect('Content-Type', /application\/json/);
    const newGroup = toApiGroup(newResponse.body);
    expect(newGroup).toHaveProperty('id');
  });

  test('can\'t create a group without a valid name', async () => {
    const response = await api.post('/api/groups').set('Authorization', `bearer ${adminObj.token}`).send({ foo: 'bar' }).expect(400).expect('Content-Type', /application\/json/);
    // response should be json with { "error": "Error validating group: malformed or missing name" }
    expect(response.body).toHaveProperty('error');
    const newResponse = await api.get('/api/groups').set('Authorization', `bearer ${adminObj.token}`).expect(200);
    expect(newResponse.body).toHaveLength(NUMBER_OF_DEFAULT_GROUPS);
  });

  test('can\'t create a group with an already existing name', async () => {
    const response = await api.post('/api/groups').set('Authorization', `bearer ${adminObj.token}`).send({ name: 'scout' }).expect(403).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('a permission can be added to a group', async () => {
    const rawEmpty = await api.get('/api/groups/empty').set('Authorization', `bearer ${adminObj.token}`);
    const empty = toApiGroup(rawEmpty.body);
    const rawEmptyWithPermission = await api.post(`/api/groups/${empty.id}`).set('Authorization', `bearer ${adminObj.token}`).send({
      functionalityId: 1,
      read: true,
      write: false
    }).expect(201).expect('Content-Type', /application\/json/);
    const emptyWithPermission = toApiGroup(rawEmptyWithPermission.body);
    expect(emptyWithPermission.name).toEqual('empty');
    expect(emptyWithPermission.functionalities).toHaveLength(1);
    expect(emptyWithPermission.functionalities[0].permission.read).toBe(true);
    expect(emptyWithPermission.functionalities[0].permission.write).toBe(false);
  });

  test('can\'t create duplicate permission to same group', async () => {
    // let's get 'empty' group in play around with it
    const rawEmpty = await api.get('/api/groups/empty').set('Authorization', `bearer ${adminObj.token}`);
    const empty = toApiGroup(rawEmpty.body);
    // let's first add a permission
    await api.post(`/api/groups/${empty.id}`).set('Authorization', `bearer ${adminObj.token}`).send({
      functionalityId: 1,
      read: false,
      write: false
    }).expect(201);
    // now duplicate should fail!
    const rawResponse = await api.post(`/api/groups/${empty.id}`).set('Authorization', `bearer ${adminObj.token}`).send({
      functionalityId: 1,
      read: true,
      write: true
    }).expect(403).expect('Content-Type', /application\/json/);
    expect(rawResponse.body).toHaveProperty('error');
  });

  test('adding permission fails gracefully if data is invalid', async () => {
    const responseWithInvalidGroupId = await api.post(`/api/groups/${NONEXISTENT_GROUP_ID}`).set('Authorization', `bearer ${adminObj.token}`).send({
      functionalityId: 1,
      read: true,
      write: false
    }).expect(404).expect('Content-Type', /application\/json/);
    expect(responseWithInvalidGroupId.body).toHaveProperty('error');
    const rawScout = await api.get('/api/groups/scout').set('Authorization', `bearer ${adminObj.token}`);
    const scout = toApiGroup(rawScout.body);
    // We can safely think that there isn't 100000 functionalities and id's should start from 1 
    // as database is reset before each test
    const responseWithInvalidFunctionality = await api.post(`/api/groups/${scout.id}`).set('Authorization', `bearer ${adminObj.token}`).send({
      functionalityId: 100000,
      read: true,
      write: false
    }).expect(400).expect('Content-Type', /application\/json/);
    expect(responseWithInvalidFunctionality.body).toHaveProperty('error');
    const responseWithMissingPermission = await api.post(`/api/groups/${scout.id}`).set('Authorization', `bearer ${adminObj.token}`).send({
      functionalityId: 2,
      read: false
    }).expect(400).expect('Content-Type', /application\/json/);
    expect(responseWithMissingPermission).toHaveProperty('error');
  });

  test('make sure groups can not be read without valid authorization header', async () => {
    const response = await api.get('/api/groups').expect(401).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
    const invalidTokenResponse = await api.get('/api/groups').set('Authorization', 'bearer non-valid-token-string').expect(401);
    expect(invalidTokenResponse.body).toHaveProperty('error');
  });

  test('do not allow posting new group without valid token', async () => {
    const response = await api.post('/api/groups').send({ name: 'foo' }).expect(401);
    expect(response.body).toHaveProperty('error');
    const invalidTokenResponse = await api.post('/api/groups').set('Authorization', 'bearer non-valid-token-string').send({ name: 'foo' }).expect(401);
    expect(invalidTokenResponse.body).toHaveProperty('error');
  });

  test('non-existing user cannot be connected to non-existing group', async () => {
    const response = await api.post('/api/groups/connect').set('Authorization', `bearer ${adminObj.token}`).send({ userId: NONEXISTENT_USER_ID, groupId: NONEXISTENT_GROUP_ID }).expect(400);
    expect(response.body).toHaveProperty('error');
  });

  test('connecting existing user to existing group succeeds', async () => {
    const userResp = await api.get('/api/users?name=elf').set('Authorization', `bearer ${adminObj.token}`).expect(200);
    let userObj: ApiUser | undefined;
    if (userResp.body instanceof Array) {
      userObj = toApiUser(userResp.body[0]);
    }
    expect(userObj).not.toBe(undefined);
    const groupResp = await api.get('/api/groups/santa').set('Authorization', `bearer ${adminObj.token}`).expect(200);
    const groupObj = toApiGroup(groupResp.body);
    if (userObj) {
      const response = await api.post('/api/groups/connect').set('Authorization', `bearer ${adminObj.token}`).send({ userId: userObj.id, groupId: groupObj.id }).expect(201);
      expect(response.body).toHaveProperty('id');
    }
  });

});

afterAll(async () => {
  await sequelize.close();
});
