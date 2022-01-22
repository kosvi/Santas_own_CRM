import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase, sequelize } from '../../src/utils/db';
import { toApiGroup } from '../helpers/toApiGroup';
const api = supertest(app);

const NUMBER_OF_DEFAULT_GROUPS = 3;
const ADMIN_GROUP_FUNCTIONALITIES = 5;

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
            console.error(error.message);
            fail('');
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
        console.error(error.message);
        fail('');
      }
    }
  });

  test('no group is returned with non-existent name', async () => {
    const response = await api.get('/api/groups/foo').expect(404).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('new group can be created', async () => {
    const response = await api.post('/api/groups').send({ name: 'foo' }).expect(201).expect('Content-Type', /application\/json/);
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

});

afterAll(async () => {
  await sequelize.close();
});
