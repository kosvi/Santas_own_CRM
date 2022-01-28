import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase, sequelize } from '../../src/utils/db';
import { toApiGroup } from '../helpers/toApiObject';
const api = supertest(app);

const NUMBER_OF_DEFAULT_GROUPS = 3;
const ADMIN_GROUP_FUNCTIONALITIES = 5;
const NONEXISTENT_GROUP_ID = 1000000;

beforeAll(async () => {
  await connectionToDatabase();
});

describe('groups controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
  });

  test('all groups are returned', async () => {
    // test that /api/groups returns 200 and content-type is application/json
    const allGroupsResult = await api.get('/api/groups').expect(200).expect('Content-Type', /application\/json/);
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
    const response = await api.get('/api/groups/admin').expect(200).expect('Content-Type', /application\/json/);
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
    const response = await api.get('/api/groups/foo').expect(404).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('new group can be created', async () => {
    const response = await api.post('/api/groups/').send({ name: 'foo' }).expect(201).expect('Content-Type', /application\/json/);
    const group = toApiGroup(response.body);
    expect(group).toHaveProperty('id');
    const newResponse = await api.get('/api/groups/foo').expect(200).expect('Content-Type', /application\/json/);
    const newGroup = toApiGroup(newResponse.body);
    expect(newGroup).toHaveProperty('id');
  });

  test('can\'t create a group without a valid name', async () => {
    const response = await api.post('/api/groups').send({ foo: 'bar' }).expect(400).expect('Content-Type', /application\/json/);
    // response should be json with { "error": "Error validating group: malformed or missing name" }
    expect(response.body).toHaveProperty('error');
    const newResponse = await api.get('/api/groups').expect(200);
    expect(newResponse.body).toHaveLength(NUMBER_OF_DEFAULT_GROUPS);
  });

  test('can\'t create a group with an already existing name', async () => {
    const response = await api.post('/api/groups').send({ name: 'scout' }).expect(403).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('a permission can be added to a group', async () => {
    const rawScout = await api.get('/api/groups/scout');
    const scout = toApiGroup(rawScout.body);
    const rawScoutWithPermission = await api.post(`/api/groups/${scout.id}`).send({
      functionalityId: 1,
      read: true,
      write: false
    }).expect(201).expect('Content-Type', /application\/json/);
    const scoutWithPermission = toApiGroup(rawScoutWithPermission.body);
    expect(scoutWithPermission.name).toEqual('scout');
    expect(scoutWithPermission.functionalities).toHaveLength(1);
    expect(scoutWithPermission.functionalities[0].permission.read).toBe(true);
    expect(scoutWithPermission.functionalities[0].permission.write).toBe(false);
  });

  test('can\'t create duplicate permission to same group', async () => {
    // let's get 'scout' group in play around with it
    const rawScout = await api.get('/api/groups/scout');
    const scout = toApiGroup(rawScout.body);
    // let's first add a permission
    await api.post(`/api/groups/${scout.id}`).send({
      functionalityId: 1,
      read: false,
      write: false
    }).expect(201);
    // now duplicate should fail!
    const rawResponse = await api.post(`/api/groups/${scout.id}`).send({
      functionalityId: 1,
      read: true,
      write: true
    }).expect(403).expect('Content-Type', /application\/json/);
    expect(rawResponse.body).toHaveProperty('error');
  });

  test('adding permission fails gracefully if data is invalid', async () => {
    const responseWithInvalidGroupId = await api.post(`/api/groups/${NONEXISTENT_GROUP_ID}`).send({
      functionalityId: 1,
      read: true,
      write: false
    }).expect(404).expect('Content-Type', /application\/json/);
    expect(responseWithInvalidGroupId.body).toHaveProperty('error');
    const rawScout = await api.get('/api/groups/scout');
    const scout = toApiGroup(rawScout.body);
    // We can safely think that there isn't 100000 functionalities and id's should start from 1 
    // as database is reset before each test
    const responseWithInvalidFunctionality = await api.post(`/api/groups/${scout.id}`).send({
      functionalityId: 100000,
      read: true,
      write: false
    }).expect(400).expect('Content-Type', /application\/json/);
    expect(responseWithInvalidFunctionality.body).toHaveProperty('error');
    const responseWithMissingPermission = await api.post(`/api/groups/${scout.id}`).send({
      functionalityId: 2,
      read: false
    }).expect(400).expect('Content-Type', /application\/json/);
    expect(responseWithMissingPermission).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
