import { sign } from 'jsonwebtoken';
import models from '../models';
import { verify } from 'jsonwebtoken';
import { LoginObject, toUserWithGroupsInLogin } from '../utils/apiValidators';
import { logger } from '../utils/logger';
import { ControllerError } from '../utils/customError';
import { SECRET } from '../utils/config';
import { validateToNumber, validateToString, validateToTokenContent } from '../utils/validators';
import { AccessTokenContent, UserWithGroupsInLogin } from '../types';
import { getPermissionsOfGroup } from './groupService';
import { hashPassword } from '../utils/hashPasswords';

export const login = async (loginObject: LoginObject) => {
  let tokenContent: AccessTokenContent;
  let groupList: Array<{ id: number, name: string }> = [];
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
    if (!userFromDatabase || userFromDatabase.password !== hashPassword(loginObject.password)) {
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
      groupList = userWithGroups.groups;
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
    const permissionsWithCode = await getPermissionsOfGroup(tokenContent.activeGroup);
    await models.Session.create({ userId: tokenContent.id, token: token });
    return {
      ...tokenContent,
      token: token,
      permissions: permissionsWithCode,
      groups: groupList
    };
  }
  return undefined;
};

export const changeGroup = async (groupId: number, token: string) => {
  let tokenContent: AccessTokenContent;
  try {
    const result = await models.Session.destroy({ where: { token: token } });
    if (result < 1) {
      throw new Error('session expired');
    }
    const decodedToken = verify(token, validateToString(SECRET)) as AccessTokenContent & { iat?: number };
    if (validateToTokenContent(decodedToken)) {
      delete decodedToken.iat;
      tokenContent = decodedToken;
    } else {
      throw new Error('token validation failed');
    }
  } catch (error) {
    logger.logError(error);
    return undefined;
  }
  try {
    const userFromDatabase = await models.User.findByPk(tokenContent.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: models.Group,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        through: { attributes: [] }
      }
    });
    if (userFromDatabase) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const userWithGroups = toUserWithGroupsInLogin(userFromDatabase.toJSON() as UserWithGroupsInLogin);
      let found = false;
      userWithGroups.groups.some(g => {
        found = g.id === groupId;
        return found;
      });
      if (found) {
        tokenContent.activeGroup = groupId;
        const permissionsWithCode = await getPermissionsOfGroup(tokenContent.activeGroup);
        const newToken = sign(tokenContent, validateToString(SECRET));
        await models.Session.create({ userId: tokenContent.id, token: newToken });
        return {
          ...tokenContent,
          token: newToken,
          permissions: permissionsWithCode,
          groups: userWithGroups.groups
        };
      }
    }
  } catch (error) {
    logger.logError(error);
  }
  return undefined;
};
