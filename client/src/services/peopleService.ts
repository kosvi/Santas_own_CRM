/*
 *  This service handles all the fetching, posting & editing of people
 */


import axios from 'axios';
// import { logger } from '../utils/logger';
import { apiObjects } from './apiServices';
import { Person } from '../types';
import { logger } from '../utils/logger';

const findPeople = async (name: string): Promise<Array<Person>> => {
  // We don't search if key is shorter then 1 character
  if (name.length < 1) {
    return [];
  }
  try {
    const response = await axios.get<Array<Person>>(`/people/?name=${name}`, apiObjects.axiosRequestConfigWithToken);
    return response.data;
  } catch (error) {
    logger.logError(error);
    return [];
  }
};

export const peopleService = {
  findPeople
};
