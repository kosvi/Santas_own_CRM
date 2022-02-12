import models from '../models';
import { FunctionalityAttributes, GroupAttributes, PermissionAttributes } from '../types';
import { toPermissionsWithFunctionality } from '../utils/apiValidators';
import { ControllerError } from '../utils/customError';
import { PermissionWithCode } from '../types';
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

export const getFunctionalities = async (): Promise<Array<FunctionalityAttributes>> => {
  try {
    const functionalities = await models.Functionality.findAll();
    return functionalities;
  } catch (error) {
    logger.logError(error);
    throw error;
  }
};

export const getFunctionality = async (name: string): Promise<FunctionalityAttributes> => {
  try {
    const functionality = await models.Functionality.findOne({ where: { name: name } });
    if (!functionality) {
      throw new ControllerError(404, 'functionality not found');
    }
    return functionality;
  } catch (error) {
    logger.logError(error);
    throw error;
  }
};

export const getPermissionsOfGroup = async (id: number): Promise<PermissionWithCode[]> => {
  const permissionsFromDatabase = await models.Permission.findAll({
    where: { groupId: id },
    attributes: { exclude: ['id', 'groupId', 'functionalityId'] },
    include: {
      model: models.Functionality,
      attributes: { exclude: ['id', 'name'] }
    }
  });
  // This must be really nasty again
  if (permissionsFromDatabase instanceof Array && permissionsFromDatabase.length > 0) {
    const rawPermissions = toPermissionsWithFunctionality(permissionsFromDatabase);
    const permissions = rawPermissions.map(rp => {
      return { code: rp.functionality.code, read: rp.read, write: rp.write };
    });
    return permissions;
  }
  return [];
};

