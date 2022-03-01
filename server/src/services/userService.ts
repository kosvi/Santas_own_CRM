import models from '../models';
import { UserAttributes } from '../types';
import { ControllerError } from '../utils/customError';
import { Op, ValidationError } from 'sequelize';
import { validateToNumber } from '../utils/validators';
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
  if (!user) {
    throw new ControllerError(404, 'user not found');
  }
  user.disabled = true;
  await user.save();
  return user;
};

export const enableDisabledUser = async (id: number) => {
  const user = await models.User.findByPk(id);
  if (!user) {
    throw new ControllerError(404, 'user not found');
  }
  user.disabled = false;
  await user.save();
  return user;
};

export const addNewUser = async (user: UserAttributes, groupId: number | undefined) => {
  let newUser: Omit<UserAttributes, 'password'>;
  try {
    const result = await models.User.create(user);
    // Remove password from user-object so we won't accidentally send it back in the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = result.get();
    newUser = userData;
  } catch (error) {
    let msg = 'cannot create user';
    if (error instanceof ValidationError) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ControllerError(400, `${msg}: username already exists`);
      }
      msg = `${msg}: ${error.name}`;
      throw new ControllerError(500, msg);
    }
    if (error instanceof Error) {
      msg = `${msg}: ${error.message}`;
    }
    throw new ControllerError(500, msg);
  }
  // if no group needs to be added, we are done
  if (!groupId) {
    return newUser;
  }
  try {
    await models.UserGroup.create({ userId: validateToNumber(newUser.id), groupId: validateToNumber(groupId) });
  } catch (error) {
    let msg = 'cannot add group for user';
    if (error instanceof Error) {
      msg = `${msg}: ${error.message}`;
    }
    throw new ControllerError(500, msg);
  }
  return newUser;
};
