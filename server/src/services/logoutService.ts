import models from '../models';
import { AccessTokenContent } from '../types';
import { ControllerError } from '../utils/customError';
import { validateToNumber } from '../utils/validators';

export const logoutAllSessionsOfCurrentUser = async (decodedToken: AccessTokenContent | undefined) => {
  // if no token is set, we cannot log out anyone - user is already not logged in
  if (!decodedToken) {
    return;
  }
  await models.Session.destroy({ where: { userId: decodedToken.id } });
};

export const logoutAllSessionsOfAnotherUser = async (id: string): Promise<number> => {
  let userId: number;
  try {
    userId = validateToNumber(Number(id));
  } catch (error) {
    throw new ControllerError(400, 'invalid id');
  }
  const deletedSessions = await models.Session.destroy({ where: { userId: userId } });
  return deletedSessions;
};

export const logoutSingleSession = async (sessionToken: string | undefined): Promise<boolean> => {
  if (!sessionToken) {
    return false;
  }
  const deletedSessions = await models.Session.destroy({ where: { token: sessionToken } });
  if (deletedSessions > 0) {
    return true;
  }
  return false;
};
