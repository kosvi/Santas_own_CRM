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
