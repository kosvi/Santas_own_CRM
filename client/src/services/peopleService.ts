/*
 *  This service handles all the fetching, posting & editing of people
 */


import axios from 'axios';
// import { logger } from '../utils/logger';
import { apiObjects } from './apiServices';
import { Person } from '../types';

const findPeople = async (name: string): Promise<Array<Person>> => {
  const response = await axios.get<Array<Person>>(`/people/?name=${name}`, apiObjects.axiosRequestConfigWithToken);
  return response.data;
};

export const peopleService = {
  findPeople
};
