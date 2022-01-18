import supertest from 'supertest';
import app from '../../src/app';
import { connectionToDatabase } from '../../src/utils/db';
const api = supertest(app);

beforeAll(async () => {
  await connectionToDatabase();
  await api.post('/api/reset/full');
});

describe('groups controller', () => {
  test('all groups', async () => {
    const allGroupsResult = await api.get('/api/groups').expect(200).expect('Content-Type', /application\/json/);
    expect(allGroupsResult.body).toHaveLength(3);
  });
});
