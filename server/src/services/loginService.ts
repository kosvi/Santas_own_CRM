import { sign } from 'jsonwebtoken';
import models from '../models';
import { LoginObject, toUserWithGroupsInLogin } from '../utils/apiValidators';
import { logger } from '../utils/logger';
import { ControllerError } from '../utils/customError';
import { SECRET } from '../utils/config';
import { validateToNumber } from '../utils/validators';
import { AccessTokenContent, UserWithGroupsInLogin } from '../types';

export const login = async (loginObject: LoginObject) => {
  let tokenContent: AccessTokenContent;
  let token: string;
  try {
    const userFromDatabase = await models.User.findOne({
      where: { username: loginObject.username },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: models.Group,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        through: { attributes: [] }
      }
    });
    if (!userFromDatabase || userFromDatabase.password !== loginObject.password) {
      // passwords don't match
      throw new ControllerError(401, 'invalid username or password');
    }
    if (userFromDatabase.disabled) {
      // account disabled
      throw new ControllerError(403, 'account has been disabled');
    }
    let activeGroup = 0;
    try {
      // This is one of the nastiest stuff I've done so far.
      // However, typescript insists that User.findOne return only 'UserAttributes' type even if I have the include there
      const tmp = userFromDatabase.toJSON();
      const userWithGroups = toUserWithGroupsInLogin(tmp as UserWithGroupsInLogin);
      // but with that nasty thing, we can pull the first groupId of the user
      if (userWithGroups.groups.length > 0) {
        activeGroup = userWithGroups.groups[0].id;
      }
    } catch (error) {
      // or in case there was none or we encountered an error, we'll go with default: 0
      logger.logError(error);
    }
    tokenContent = {
      username: userFromDatabase.username,
      name: userFromDatabase.name,
      id: validateToNumber(userFromDatabase.id),
      activeGroup: activeGroup,
      loginTime: Date.now()
    };
    if (!SECRET) {
      throw new ControllerError(500, 'server can\'t sign token');
    }
    token = sign(tokenContent, SECRET);
  } catch (error) {
    logger.logError(error);
    if (error instanceof ControllerError) {
      throw error;
    }
    // let's handle this better in next update
    throw error;
  }
  if (token && tokenContent) {
    await models.Session.create({ userId: tokenContent.id, token: token });
    return {
      ...tokenContent,
      token: token
    };
  }
  return undefined;
};