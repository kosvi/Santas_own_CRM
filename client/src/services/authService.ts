/*
 *  This service handles all the fetching & posting of data involving user authentication
 */


import { AuthUserDTO, AuthUser, Permission, Permissions, MsgResponse, PermissionCode } from '../types';
import { apiRequest } from '../utils/delayedAxios';
import { logger } from '../utils/logger';
import { apiServices } from './apiServices';

const USER_DATA_KEY = 'loggedInUser';


/*
 * storeUse stores userdata to localstorage where it can be loaded if user
 * closes browser or refreshes page
 */

const storeUser = (user: AuthUser): void => {
  window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  apiServices.setToken(user.token);
};

/*
 * loadUser reads userdata from localstorage in case page is reloaded
 */

const loadUser = (): AuthUser | undefined => {
  const userJSON = window.localStorage.getItem(USER_DATA_KEY);
  if (userJSON) {
    const user = JSON.parse(userJSON);
    apiServices.setToken(user.token);
    return user;
  }
  return undefined;
};

const deleteUser = (): void => {
  window.localStorage.removeItem(USER_DATA_KEY);
  apiServices.setToken('null');
};

const login = async (username: string, password: string): Promise<AuthUser> => {
  // const response = await axios.post<AuthUserDTO>('/login', { username, password }, apiServices.getAxiosRequestConfigWithoutToken());
  const response = await apiRequest<AuthUserDTO, { username: string, password: string }>('post', '/login', apiServices.getAxiosRequestConfigWithoutToken(), { username, password });
  return userDTOtoAuthUser(response.data);
};

const logout = async (): Promise<MsgResponse | undefined> => {
  try {
    // const response = await axios.delete<MsgResponse>('/logout', apiServices.getAxiosRequestConfigWithToken());
    const response = await apiRequest<MsgResponse, undefined>('delete', '/logout', apiServices.getAxiosRequestConfigWithToken());
    return response.data;
  } catch (error) {
    logger.logError(error);
    return undefined;
  }
};

const switchGroup = async (payload: { token: string, groupId: number }): Promise<AuthUser> => {
  const response = await apiRequest<AuthUserDTO, { token: string, groupId: number }>('put', '/login', apiServices.getAxiosRequestConfigWithoutToken(), payload);
  return userDTOtoAuthUser(response.data);
};

const userDTOtoAuthUser = (dto: AuthUserDTO): AuthUser => {
  const authPermissions: Permissions = {
    users: makePermission(dto, 'users'),
    people: makePermission(dto, 'people'),
    permissions: makePermission(dto, 'permissions'),
    wishes_and_items: makePermission(dto, 'wishes_and_items'),
    entries: makePermission(dto, 'entries')
  };
  return { ...dto, permissions: authPermissions };
};

const makePermission = (dto: AuthUserDTO, code: PermissionCode): Omit<Permission, 'code'> => {
  const defaultPermission = { read: false, write: false };
  const foundPermission = dto.permissions.find(p => p.code === code);
  if (foundPermission) {
    return toAuthPermission(foundPermission);
  }
  return defaultPermission;
};

const toAuthPermission = ({ read, write }: Permission): { read: boolean, write: boolean } => {
  return { read, write };
};

export const authService = {
  storeUser, loadUser, deleteUser, login, logout, switchGroup
};
