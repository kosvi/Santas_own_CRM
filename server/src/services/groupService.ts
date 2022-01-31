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
    // I see no reason why we would end up to this line
    return undefined;
  }
};

export const addPermission = async (permission: PermissionAttributes): Promise<GroupAttributes> => {
  try {
    // first check if a group exists with the groupId
    await models.Group.findByPk(permission.groupId, { rejectOnEmpty: true });
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
    logger.logError(error);
    if (error instanceof Error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ControllerError(403, 'this group already has permission set to this functionality');
      }
      if (error.name === 'SequelizeEmptyResultError') {
        throw new ControllerError(404, `no group found with id: ${permission.groupId}`);
      }
      if (error.name === 'SequelizeForeignKeyConstraintError')
        throw new ControllerError(400, `no functionality exists with id: ${permission.functionalityId}`);
    }
    throw (error);
  }
};

/*
REMOVE THIS AFTER GETTING THE FEATURE TO WORK!
*/

export const getPermissionsOfGroup = async (id: number) => {
  const result = await models.Permission.findAll({
    where: { groupId: id },
    include: {
      model: models.Functionality
    }
  });
  return result;
};