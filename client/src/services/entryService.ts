import { FullEntry, NewEntry } from '../types';
import { apiRequest } from '../utils/delayedAxios';
import { apiServices } from './apiServices';

const addEntry = async (entry: NewEntry): Promise<FullEntry> => {
  const response = await apiRequest<FullEntry, NewEntry>('post', '/entries', apiServices.getAxiosRequestConfigWithToken(), entry);
  return response.data;
};

export const entryServices = {
  addEntry
};