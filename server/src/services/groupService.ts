import models from '../models';

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
