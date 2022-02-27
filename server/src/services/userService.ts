import models from '../models';
import { UserAttributes } from '../types';
import { ControllerError } from '../utils/customError';
import { Op } from 'sequelize';
// import { logger } from '../utils/logger';

/*
export const getAllUsers = async (): Promise<UserAttributes[]> => {
  const allUsers = await models.User.findAll();
  return allUsers;
};
*/

export const getUsersBySearchString = async (search: string): Promise<UserAttributes[]> => {
  // construct search options 
  const where = {
    [Op.or]: [
      { username: { [Op.iLike]: `%${search}%` } },
      { name: { [Op.iLike]: `%${search}%` } }
    ]
  };
  const users = await models.User.findAll({
    include: {
      model: models.Group,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      through: { attributes: [] }
    },
    where
  });
  return users;
};

export const getAllUsersWithGroups = async () => {
  const allUsersWithGroups = await models.User.findAll({
    include: {
      model: models.Group,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      through: { attributes: [] }
    }
  });
  return allUsersWithGroups;
};

export const getUserWithPermissions = async (id: number) => {
  const user = await models.User.findByPk(id, {
    include: {
      model: models.Group,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      through: { attributes: [] },
      include: [models.Functionality]
    }
  });
  return user;
};

export const disableSingleUser = async (id: number) => {
  const user = await models.User.findByPk(id);
  if(!user) {
    throw new ControllerError(404, 'user not found');
  }
  user.disabled = true;
  await user.save();
  return user;
};

export const enableDisabledUser = async (id: number) => {
  const user = await models.User.findByPk(id);
  if(!user) {
    throw new ControllerError(404, 'user not found');
  }
  user.disabled = false;
  await user.save();
  return user;
};
