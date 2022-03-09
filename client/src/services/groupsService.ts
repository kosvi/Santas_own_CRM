import axios from 'axios';
import { Functionality, Group, GroupFunctionality, GroupWithFunctionalities } from '../types';
import { apiRequest } from '../utils/delayedAxios';
import { logger } from '../utils/logger';
import { apiServices } from './apiServices';

const getAllGroups = async (): Promise<Array<GroupWithFunctionalities>> => {
  const response = await apiRequest<Array<GroupWithFunctionalities>, undefined>('get', '/groups', apiServices.getAxiosRequestConfigWithToken());
  // const response = await axios.get<Array<GroupWithFunctionalities>>('/groups', apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const getSingleGroup = async (name: string): Promise<GroupWithFunctionalities> => {
  const response = await apiRequest<GroupWithFunctionalities, undefined>('get', `/groups/${name}`, apiServices.getAxiosRequestConfigWithToken());
  // const response = await axios.get(`/groups/${name}`, apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const addGroup = async (name: string): Promise<Group> => {
  // For some reason tests fail if we use apiRequest instead of axios.post here. Dunno why, can't figure out...
  // const response = await apiRequest<Group, { name: string }>('post', '/groups', apiServices.getAxiosRequestConfigWithToken(), { name: name });
  const response = await axios.post('/groups', { name: name }, apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const deleteGroup = async (groupId: number): Promise<boolean> => {
  try {
    await apiRequest<undefined, undefined>('delete', `/groups/${groupId}`, apiServices.getAxiosRequestConfigWithToken());
    return true;
  } catch (error) {
    logger.logError(error);
    return false;
  }
};

const connectUserToGroup = async (groupId: number, userId: number): Promise<{ id: number, groupId: number, userId: number }> => {
  const response = await apiRequest<{ id: number, groupId: number, userId: number }, { groupId: number, userId: number }>('post', '/groups/connect', apiServices.getAxiosRequestConfigWithToken(), { groupId, userId });
  return response.data;
};

const addPermission = async (permission: GroupFunctionality): Promise<GroupWithFunctionalities> => {
  const id = permission.groupId;
  const payload = {
    functionalityId: permission.functionalityId,
    read: permission.read,
    write: permission.write
  };
  const response = await axios.post<GroupWithFunctionalities>(`/groups/${id}`, payload, apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const updatePermission = async (permission: GroupFunctionality): Promise<GroupWithFunctionalities> => {
  const id = permission.groupId;
  const payload = {
    functionalityId: permission.functionalityId,
    read: permission.read,
    write: permission.write
  };
  const response = await axios.put<GroupWithFunctionalities>(`/groups/${id}`, payload, apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const getFunctionalities = async (): Promise<Array<Functionality>> => {
  const response = await axios.get('/groups/functionalities', apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

export const groupsService = {
  getAllGroups, getSingleGroup, addGroup, deleteGroup, connectUserToGroup, addPermission, updatePermission, getFunctionalities
};
