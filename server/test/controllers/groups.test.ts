import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase, sequelize } from '../../src/utils/db';
import { toApiGroup } from '../helpers/toApiGroup';
const api = supertest(app);

beforeAll(async () => {
  await connectionToDatabase();
  // await sequelize.close();
  //await api.post('/api/reset/full');
});

describe('groups controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
  });

  test('all groups are returned', async () => {
    // test that /api/groups returns 200 and content-type is application/json
    const allGroupsResult = await api.get('/api/groups').expect(200).expect('Content-Type', /application\/json/);
    // test that all 3 groups (in default data) are returned in a nice array
    expect(allGroupsResult.body).toHaveLength(3);
    if (allGroupsResult.body instanceof Array) {
      allGroupsResult.body.map(group => {
        // test that all groups have property 'name'
        expect(group).toHaveProperty('name');
        // We will just take the risk and forward unknown data to toApiGroup parser. It should fail if data is invalid. 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const apiGroup = toApiGroup(group);
        // if this is admin group, it should have all permissions (total of five!)
        if (apiGroup.name === 'admin') {
          expect(apiGroup.functionalities).toHaveLength(5);
        }
      });
    } else {
      fail('result was not an array');
    }
  });

});

afterAll(async () => {
  await sequelize.close();
});