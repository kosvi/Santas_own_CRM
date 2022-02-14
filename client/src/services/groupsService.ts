import axios from 'axios';
import { Functionality, GroupFunctionality, GroupWithFunctionalities } from '../types';
import { apiObjects } from './apiServices';

const getAllGroups = async (): Promise<Array<GroupWithFunctionalities>> => {
  const response = await axios.get<Array<GroupWithFunctionalities>>('/groups', apiObjects.axiosRequestConfigWithToken);
  return response.data;
};

const getSingleGroup = async (name: string): Promise<GroupWithFunctionalities> => {
  const response = await axios.get(`/groups/${name}`, apiObjects.axiosRequestConfigWithToken);
  return response.data;
};

const addPermission = async (permission: GroupFunctionality): Promise<GroupWithFunctionalities> => {
  const id = permission.groupId;
  const payload = {
    functionalityId: permission.functionalityId,
    read: permission.read,
    write: permission.write
  };
  const response = await axios.post<GroupWithFunctionalities>(`/groups/${id}`, payload, apiObjects.axiosRequestConfigWithToken);
  return response.data;
};

const updatePermission = async (permission: GroupFunctionality): Promise<GroupWithFunctionalities> => {
  const id = permission.groupId;
  const payload = {
    functionalityId: permission.functionalityId,
    read: permission.read,
    write: permission.write
  };
  const response = await axios.put<GroupWithFunctionalities>(`/groups/${id}`, payload, apiObjects.axiosRequestConfigWithToken);
  return response.data;
};

const getFunctionalities = async (): Promise<Array<Functionality>> => {
  const response = await axios.get('/groups/functionalities', apiObjects.axiosRequestConfigWithToken);
  return response.data;
};

export const groupsService = {
  getAllGroups, getSingleGroup, addPermission, updatePermission, getFunctionalities
};
