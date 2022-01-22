import models from '../models';
import { GroupAttributes, PermissionAttributes } from '../types';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';

export const getAllGroupsWithPermissions = async () => {
  const groupsWithPermissions = await models.Group.findAll({
    include: {
      model: models.Functionality,
      through: {
        attributes: ['read', 'write']
      }
    }
  });
  return groupsWithPermissions;
};

export const getSingleGroupWithPermissions = async (name: string) => {
  try {
    const group = await models.Group.findOne({
      where: { name: name },
      include: {
        model: models.Functionality,
        through: {
          attributes: ['read', 'write']
        }
      },
      rejectOnEmpty: true
    });
    return group;
  } catch (error) {
    throw new ControllerError(404, `${name} was not found`);
  }
};

export const addGroup = async (group: GroupAttributes): Promise<GroupAttributes | Error | undefined> => {
  try {
    const newGroup = await models.Group.create(group);
    return newGroup;
  } catch (error) {
    logger.logError(error);
    if (error instanceof Error) {
      return error;
    }
    return undefined;
  }
};

export const addPermission = async (permission: PermissionAttributes): Promise<GroupAttributes> => {
  try {
    const newPermission = await models.Permission.create(permission);
    const group = await models.Group.findOne({
      where: { id: newPermission.groupId },
      include: {
        model: models.Functionality,
        through: {
          attributes: ['read', 'write']
        }
      },
      rejectOnEmpty: true
    });
    return group;
  } catch (error) {
    if (error instanceof Error) {
      logger.logError(error);
      if (error.name === 'SequelizeEmptyResultError') {
        throw new ControllerError(404, `no group found with id: ${permission.groupId}`);
      }
      if (error.name === 'SequelizeForeignKeyConstraintError')
        throw new ControllerError(400, `no functionality exists with id: ${permission.functionalityId}`);
    }
    throw (error);
  }
};
