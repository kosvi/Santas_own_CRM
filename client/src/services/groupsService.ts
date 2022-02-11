import axios from 'axios';
import { logger } from '../utils/logger';
import { GroupWithFunctionalities } from '../types';
import { apiObjects } from './apiServices';

const getAllGroups = async (): Promise<Array<GroupWithFunctionalities>> => {
  const response = await axios.get<Array<GroupWithFunctionalities>>('/groups', apiObjects.axiosRequestConfigWithToken);
  return response.data;
};

const getSingleGroup = async (name: string): Promise<GroupWithFunctionalities> => {
  const response = await axios.get(`/groups/${name}`, apiObjects.axiosRequestConfigWithToken);
  return response.data;
};

export const groupsService = {
  getAllGroups, getSingleGroup
};