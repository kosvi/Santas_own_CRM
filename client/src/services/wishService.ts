import { NewWish, ReturnWish } from '../types';
import { apiRequest } from '../utils/delayedAxios';
import { apiServices } from './apiServices';

const addWish = async (wish: NewWish): Promise<ReturnWish> => {
  const response = await apiRequest<ReturnWish, NewWish>('post', '/wishes', apiServices.getAxiosRequestConfigWithToken(), wish);
  return response.data;
};

export const wishService = {
  addWish
};