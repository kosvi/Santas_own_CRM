import models from '../models';
import { AccessTokenContent } from '../types';

export const logoutAllSessionsOfCurrentUser = async (decodedToken: AccessTokenContent | undefined) => {
  // if no token is set, we cannot log out anyone - user is already not logged in
  if (!decodedToken) {
    return;
  }
  await models.Session.destroy({ where: { userId: decodedToken.id } });
};

export const logoutAllSessionsOfAnotherUser = async (id: number): Promise<number> => {
  const deletedSessions = await models.Session.destroy({ where: { userId: id } });
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