/*
 *  This service handles all the fetching & posting of data involving user authentication
 */


import axios from 'axios';
// import { API_BASE } from '../utils/config';
import { AuthUserDTO, AuthUser, Permission, Permissions, MsgResponse, PermissionCode } from '../types';
import { logger } from '../utils/logger';
import { apiObjects, apiServices } from './apiServices';

const USER_DATA_KEY = 'loggedInUser';

const storeUser = (user: AuthUser): void => {
  window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  apiServices.setToken(user.token);
};

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
  const response = await axios.post<AuthUserDTO>('/login', { username, password }, apiObjects.AxiosRequestConfigWithoutToken);
  return userDTOtoAuthUser(response.data);
};

const logout = async (): Promise<MsgResponse | undefined> => {
  try {
    const response = await axios.delete<MsgResponse>('/logout', apiObjects.axiosRequestConfigWithToken);
    return response.data;
  } catch (error) {
    logger.logError(error);
    return undefined;
  }
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
  const foundPermission = dto.permissions.find(p => p.code===code);
  if(foundPermission) {
    return toAuthPermission(foundPermission);
  }
  return defaultPermission;
};

const toAuthPermission = ({ read, write }: Permission): { read: boolean, write: boolean } => {
  return { read, write };
};

export const authService = {
  storeUser, loadUser, deleteUser, login, logout
};
