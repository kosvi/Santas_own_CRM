import models from '../models';
import { UserAttributes } from '../types';
// import { logger } from '../utils/logger';

export const getAllUsers = async (): Promise<UserAttributes[]> => {
  const allUsers = await models.User.findAll();
  return allUsers;
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
