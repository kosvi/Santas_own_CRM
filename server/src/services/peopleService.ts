import { Op } from 'sequelize';
import models from '../models';
import { ControllerError } from '../utils/customError';
import { PersonAttributes } from '../types';

export const findPeopleByName = async (search: string): Promise<PersonAttributes[]> => {
  // construct search options
  const where = {
    name: { [Op.iLike]: `%${search}%` }
  };
  const people = await models.Person.findAll({
    where
  });
  return people;
};

export const displayPersonWithWishesAndEntries = async (id: number) => {
  try {
    const person = await models.Person.findByPk(id, {
      include: [{
        model: models.Wish,
        attributes: { exclude: ['personId', 'itemId'] },
        include: [models.Item]
      },
      {
        model: models.Entry,
        attributes: { exclude: ['personId'] }
      }
      ],
      rejectOnEmpty: true
    });
    return person;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'SequelizeEmptyResultError') {
        throw new ControllerError(404, `no person found with id: ${id}`);
      }
    }
    throw error;
  }
};

export const addNewPerson = async (person: PersonAttributes): Promise<PersonAttributes> => {
  try {
    const newPerson = await models.Person.create(person);
    return newPerson;
  } catch (error) {
    throw new ControllerError(500, 'couldn\'t create new database entry');
  }
};

export const updatePerson = async (person: PersonAttributes): Promise<PersonAttributes> => {
  try {
    const oldPerson = await models.Person.findByPk(person.id);
    if (!oldPerson) {
      throw new ControllerError(404, 'no person found with id');
    }
    oldPerson.name = person.name;
    oldPerson.address = person.address;
    await oldPerson.save();
    return oldPerson;
  } catch (error) {
    if (error instanceof ControllerError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new ControllerError(500, 'Failed to save changes to person');
    }
    throw error;
  }
};
