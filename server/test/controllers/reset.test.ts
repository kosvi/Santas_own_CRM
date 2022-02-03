/*
 *  These tests are not really thorough as this is an test/dev -endpoint only
 */

import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import models from '../../src/models';
import { toApiLogin } from '../helpers/toApiObject';
const api = supertest(app);

const NUMBER_OF_DEFAULT_USERS = 5;

beforeAll(async () => {
  await connectionToDatabase();
  await api.post('/api/reset/full');
});

describe('people controller', () => {

  test('clear will remove everything and populate will re-populate database', async () => {
    await api.delete('/api/reset/clear').expect(204);
    const allUsers = await models.User.findAndCountAll();
    // const response = await api.get('/api/users').expect(200);
    expect(allUsers.count).toBe(0);
    // expect(response.body).toHaveLength(0);
    const populateResponse = await api.post('/api/reset/populate').expect(201);
    expect(populateResponse.body).toHaveProperty('msg');
    const loginResponse = await api.post('/api/login').send({ username: 'admin', password: 'password' }).expect(200);
    const loginResult = toApiLogin(loginResponse.body);
    const populatedUsers = await api.get('/api/users').set('Authorization', `bearer ${loginResult.token}`);
    expect(populatedUsers.body).toHaveLength(NUMBER_OF_DEFAULT_USERS);
  });

  test('GET /api/reset will return list of functionalities', async () => {
    const response = await api.get('/api/reset').expect(200);
    expect(response.text).toContain('Functionalities:');
  });

});

afterAll(async () => {
  await sequelize.close();
});
