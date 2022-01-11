import supertest from 'supertest';
import app from '../src/app';
const api = supertest(app);

test('simple test', async () => {
  await api.get('/api').expect(200);
});
