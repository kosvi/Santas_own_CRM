import { sign } from 'jsonwebtoken';
import models from '../models';
import { LoginObject } from '../utils/apiValidators';
import { logger } from '../utils/logger';
import { ControllerError } from '../utils/customError';
import { SECRET } from '../utils/config';
import { validateToNumber } from '../utils/validators';

export const login = async (loginObject: LoginObject) => {
  let tokenContent: { username: string, name: string, id: number };
  let token: string;
  try {
    const userFromDatabase = await models.User.findOne({
      where: { username: loginObject.username },
      rejectOnEmpty: true
    });
    if (userFromDatabase.password !== loginObject.password) {
      // passwords don't match
      throw new ControllerError(401, 'invalid username or password');
    }
    if (userFromDatabase.disabled) {
      // account disabled
      throw new ControllerError(403, 'account has been disabled');
    }
    tokenContent = {
      username: userFromDatabase.username,
      name: userFromDatabase.name,
      id: validateToNumber(userFromDatabase.id),
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
      id: tokenContent.id,
      name: tokenContent.name,
      token: token
    };
  }
  return undefined;
};
