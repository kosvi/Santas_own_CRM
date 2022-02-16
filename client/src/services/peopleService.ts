/*
 *  This service handles all the fetching, posting & editing of people
 */


import axios from 'axios';
// import { logger } from '../utils/logger';
import { apiServices } from './apiServices';
import { FullPerson, Person } from '../types';
import { logger } from '../utils/logger';
import { testHelpers } from '../utils/testHelpers/testHelpers';

const findPeople = async (name: string): Promise<Array<Person>> => {
  // We don't search if key is shorter then 1 character
  if (name.length < 1) {
    return [];
  }
  try {
    const response = await axios.get<Array<Person>>(`/people/?name=${name}`, apiServices.getAxiosRequestConfigWithToken());
    return response.data;
  } catch (error) {
    logger.logError(error);
    return [];
  }
};

const finfPersonById = async (id: number): Promise<FullPerson> => {
  await testHelpers.waitGivenTime(3000);
  const response = await axios.get<FullPerson>(`/people/${id}`, apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

export const peopleService = {
  findPeople, finfPersonById
};
