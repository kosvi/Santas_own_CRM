import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiPerson, toLoginResult } from '../helpers/toApiObject';
const api = supertest(app);

const NONEXISTENT_PERSON_ID = 100000;

const adminObj = {
  username: 'admin',
  password: 'password',
  id: 0,
  token: ''
};

beforeAll(async () => {
  await connectionToDatabase();
});

describe('people controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
    const response = await api.post('/api/login').send({ username: adminObj.username, password: adminObj.password });
    const loginResult = toLoginResult(response.body);
    adminObj.id = loginResult.id;
    adminObj.token = loginResult.token;
  });

  test('GET without keyword gives 400', async () => {
    const response = await api.get('/api/people').set('Authorization', `bearer ${adminObj.token}`).expect(400).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('error');
  });

  test('Searching by name returns valid responses', async () => {
    const rawResult = await api.get('/api/people/?name=mikko').set('Authorization', `bearer ${adminObj.token}`).expect(200).expect('Content-Type', /application\/json/);
    if (rawResult.body instanceof Array) {
      expect(rawResult.body.length).toBeGreaterThan(0);
      rawResult.body.map(p => {
        toApiPerson(p);
      });
    } else {
      expect('error').toBe('result was not an Array!');
    }
  });

  test('Displaying single person gives list of wishes', async () => {
    const rawResult = await api.get('/api/people/1').set('Authorization', `bearer ${adminObj.token}`).expect(200).expect('Content-Type', /application\/json/);
    const person = toApiPerson(rawResult.body);
    expect(person.wishes).toBeInstanceOf(Array);
    if (person.wishes && person.wishes.length > 0) {
      expect(person.wishes[0].item).toHaveProperty('id');
    } else {
      expect('error').toBe('for some reason wishes was not returned as expected');
    }
  });

  test('Incorrect ID returns 404', async () => {
    const rawResult = await api.get(`/api/people/${NONEXISTENT_PERSON_ID}`).set('Authorization', `bearer ${adminObj.token}`).expect(404).expect('Content-Type', /application\/json/);
    expect(rawResult.body).toHaveProperty('error');
  });

  test('Malformed ID return 400', async () => {
    const rawResult = await api.get('/api/people/foo').set('Authorization', `bearer ${adminObj.token}`).expect(400).expect('Content-Type', /application\/json/);
    expect(rawResult.body).toHaveProperty('error');
  });

  test('A new person can be added', async () => {
    const emptyResponse = await api.get('/api/people/?name=person').set('Authorization', `bearer ${adminObj.token}`).expect(200);
    expect(emptyResponse.body).toHaveLength(0);
    const response = await api.post('/api/people').set('Authorization', `bearer ${adminObj.token}`).send({ name: 'Persons Name', birthdate: '2010-10-10', address: 'TheStreet 30' }).expect(201).expect('Content-Type', /application\/json/);
    try {
      const person = toApiPerson(response.body);
      expect(person).toHaveProperty('id');
      expect(person.name).toBe('Persons Name');
    } catch (error) {
      expect('error').toBe('couldn\'t parse result');
    }
    const getResponse = await api.get('/api/people/?name=person').set('Authorization', `bearer ${adminObj.token}`);
    expect(getResponse.body).toHaveLength(1);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const person = toApiPerson(getResponse.body[0]);
      expect(person.name).toBe('Persons Name');
    } catch (error) {
      expect('error').toBe('wrong result');
    }
  });

  test('A person can be updated', async () => {
    const firstResponse = await api.get('/api/people/1').set('Authorization', `bearer ${adminObj.token}`).expect(200);
    const person = toApiPerson(firstResponse.body);
    expect(person.name).not.toBe('John');
    expect(person.address).not.toBe('TestStreet 12');
    person.name = 'John';
    person.address = 'TestStreet 12';
    const { name, birthdate, address } = person;
    const putResponse = await api.put('/api/people/1').set('Authorization', `bearer ${adminObj.token}`).send({ name, birthdate, address }).expect(200);
    const putPerson = toApiPerson(putResponse.body);
    expect(putPerson.name).toBe('John');
    expect(putPerson.address).toBe('TestStreet 12');
    const secondResponse = await api.get('/api/people/1').set('Authorization', `bearer ${adminObj.token}`).expect(200);
    const newPerson = toApiPerson(secondResponse.body);
    expect(newPerson.name).toBe('John');
    expect(newPerson.address).toBe('TestStreet 12');
  });

  test('401 is returned if no token is given', async () => {
    const response = await api.get('/api/people/').expect(401);
    expect(response.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
