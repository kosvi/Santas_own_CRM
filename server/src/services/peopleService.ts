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
