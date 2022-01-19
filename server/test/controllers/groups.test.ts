import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase, sequelize } from '../../src/utils/db';
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
    const allGroupsResult = await api.get('/api/groups').expect(200).expect('Content-Type', /application\/json/);
    expect(allGroupsResult.body).toHaveLength(3);
    if (allGroupsResult.body instanceof Array) {
      allGroupsResult.body.map(group => {
        expect(group).toHaveProperty('name');
      });
    } else {
      fail('result was not an array');
    }
  });

});

afterAll(async () => {
  await sequelize.close();
});