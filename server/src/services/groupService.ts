import models from '../models';
import { GroupAttributes, PermissionAttributes } from '../types';
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
  const group = await models.Group.findOne({
    where: { name: name },
    include: {
      model: models.Functionality,
      through: {
        attributes: ['read', 'write']
      }
    }
  });
  return group;
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

export const addPermission = async (permission: PermissionAttributes): Promise<GroupAttributes | Error | undefined> => {
  try {
    const newPermission = await models.Permission.create(permission);
    const group = await models.Group.findOne({
      where: { id: newPermission.groupId },
      include: {
        model: models.Functionality,
        through: {
          attributes: ['read', 'write']
        }
      }
    });
    if (group) {
      return group;
    }
    throw new Error('no group found with groupId');
  } catch (error) {
    logger.logError(error);
    if (error instanceof Error) {
      return error;
    }
    return undefined;
  }
};
