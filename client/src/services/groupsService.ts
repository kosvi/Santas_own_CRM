import axios from 'axios';
import { Functionality, Group, GroupFunctionality, GroupWithFunctionalities } from '../types';
import { apiServices } from './apiServices';

const getAllGroups = async (): Promise<Array<GroupWithFunctionalities>> => {
  console.log(apiServices.getAxiosRequestConfigWithToken);
  const response = await axios.get<Array<GroupWithFunctionalities>>('/groups', apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const getSingleGroup = async (name: string): Promise<GroupWithFunctionalities> => {
  const response = await axios.get(`/groups/${name}`, apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const addGroup = async (name: string): Promise<Group> => {
  const response = await axios.post('/groups', { name: name }, apiServices.getAxiosRequestConfigWithToken());
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
  getAllGroups, getSingleGroup, addGroup, addPermission, updatePermission, getFunctionalities
};
