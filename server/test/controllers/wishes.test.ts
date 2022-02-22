import { connectionToDatabase, sequelize } from '../../src/utils/db';
import app from '../../src/app';
import supertest from 'supertest';
import { toApiWish, toLoginResult, toApiPerson } from '../helpers/toApiObject';
const api = supertest(app);

// This should be imported from a common file between all tests...
const adminObj = {
  username: 'admin',
  password: 'password',
  id: 0,
  token: ''
};

beforeAll(async () => {
  await connectionToDatabase();
});

describe('wishes controller', () => {

  beforeEach(async () => {
    await api.post('/api/reset/full');
    const response = await api.post('/api/login').send({ username: adminObj.username, password: adminObj.password });
    const loginResult = toLoginResult(response.body);
    adminObj.id = loginResult.id;
    adminObj.token = loginResult.token;
  });

  test('a wish can be added with valid priviledges', async () => {
    const response = await api.post('/api/wishes').set('Authorization', `bearer ${adminObj.token}`).send({
      personId: 1,
      itemName: 'item',
      description: 'string'
    }).expect(201).expect('Content-Type', /application\/json/);
    const apiWish = toApiWish(response.body);
    expect(apiWish.personId).toBe(1);
    expect(apiWish.description).toBe('string');
  });

  test('new item is created when wish is posted', async () => {
    const newPerson = await api.post('/api/people').set('Authorization', `bearer ${adminObj.token}`).send({
      name: 'Foo Bar',
      address: 'Barstreet 100',
      birthdate: '2020-12-12'
    });
    const newPersonData = toApiPerson(newPerson.body);
    const wishResponse = await api.post('/api/wishes').set('Authorization', `bearer ${adminObj.token}`).send({
      personId: newPersonData.id,
      itemName: 'non-existing-item-name',
      description: 'description'
    }).expect(201);
    const newWish = toApiWish(wishResponse.body);
    expect(newWish).toHaveProperty('id');
    // now we have an id for a person and an wish added to him/her
    // let's make sure the wish is there
    const rePerson = await api.get(`/api/people/${newPersonData.id}`).set('Authorization', `bearer ${adminObj.token}`).expect(200);
    const rePersonData = toApiPerson(rePerson.body);
    expect(rePersonData.wishes).toBeInstanceOf(Array);
    expect(rePersonData.wishes).toHaveLength(1);
    expect(rePersonData.wishes).toEqual(expect.arrayContaining([
      { id: newWish.id, description: 'description', item: { id: newWish.itemId, name: 'non-existing-item-name' } }
    ]));
  });

  test('can\'t add wish without proper token', async () => {
    const response = await api.post('/api/wishes').send({
      personId: 1,
      itemName: 'item',
      description: 'string'
    }).expect(401);
    expect(response.body).toHaveProperty('error');
    const personResponse = await api.get('/api/people/1').set('Authorization', `bearer ${adminObj.token}`).expect(200);
    const person = toApiPerson(personResponse.body);
    expect(person.wishes).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ description: 'string' })
    ]));
  });

  test('malformed wish is rejected', async () => {
    const response = await api.post('/api/wishes').set('Authorization', `bearer ${adminObj.token}`).send({
      personId: 1,
      description: 'string'
    }).expect(400);
    expect(response.body).toHaveProperty('error');
  });

  test('non-existing personId return 404', async () => {
    const response = await api.post('/api/wishes').set('Authorization', `bearer ${adminObj.token}`).send({
      personId: -1,
      itemName: 'Shoe',
      description: 'just a one'
    }).expect(404);
    expect(response.body).toHaveProperty('error');
  });

});

afterAll(async () => {
  await sequelize.close();
});
