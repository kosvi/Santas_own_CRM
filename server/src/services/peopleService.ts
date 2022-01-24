import { Op } from 'sequelize';
import models from '../models';
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

export const displayPersonWithWishes = async (id: number) => {
  try {
    const person = await models.Person.findByPk(id, {
      include: {
        model: models.Wish,
        attributes: { exclude: ['personId', 'itemId'] },
        include: [models.Item]
      },
      rejectOnEmpty: true
    });
    return person;
  } catch (error) {
    console.error(error);
    throw error;
  }
};