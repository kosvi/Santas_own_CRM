import { NewUser, User, UserWithGroups } from '../types';
import { apiRequest } from '../utils/delayedAxios';
import { apiServices } from './apiServices';

const getUsers = async (): Promise<Array<UserWithGroups>> => {
  const response = await apiRequest<Array<UserWithGroups>, undefined>('get', '/users', apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const getSingleUser = async (id: number): Promise<UserWithGroups> => {
  const response = await apiRequest<UserWithGroups, undefined>('get', `/users/${id}`, apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const addUser = async (user: NewUser): Promise<User> => {
  const response = await apiRequest<User, NewUser>('post', '/users', apiServices.getAxiosRequestConfigWithToken(), user);
  return response.data;
};

export const userService = {
  getUsers, getSingleUser, addUser
};