import models from '../models';
import { GroupAttributes } from '../types';
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

export const addGroup = async (group: GroupAttributes): Promise<GroupAttributes | undefined> => {
  try {
    const newGroup = await models.Group.create(group);
    return newGroup;
  } catch (error) {
    logger.logError(error);
    return undefined;
  }
};
