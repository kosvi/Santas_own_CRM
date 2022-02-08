/*
 *  This service handles all the fetching & posting of data involving user authentication
 */


import axios from 'axios';
// import { API_BASE } from '../utils/config';
import { AuthUser } from '../types';
import { logger } from '../utils/logger';
import { apiObjects, apiServices } from './apiServices';
import { MsgResponse } from '../types';

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
  const response = await axios.post<AuthUser>('/login', { username, password }, apiObjects.AxiosRequestConfigWithoutToken);
  return response.data;
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

export const authService = {
  storeUser, loadUser, deleteUser, login, logout
};
