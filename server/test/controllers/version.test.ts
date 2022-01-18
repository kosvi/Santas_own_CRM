import supertest from 'supertest';
import app from '../../src/app';
const api = supertest(app);

describe('version controller', () => {
  test('health check', async () => {
    const healthCheckResult = await api.get('/api/version/health').expect(200);
    expect(healthCheckResult.text).toContain('OK!');
  });

  test('version information', async () => {
    const versionInfoResult = await api.get('/api/version').expect(200).expect('Content-Type', /application\/json/);
    expect(versionInfoResult.body).toHaveProperty('mode');
    expect(versionInfoResult.body).toHaveProperty('version');
    expect(versionInfoResult.body).toHaveProperty('license');
  });
});
