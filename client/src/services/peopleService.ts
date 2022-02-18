/*
 *  This service handles all the fetching, posting & editing of people
 */


import { apiServices } from './apiServices';
import { FullPerson, NewPerson, Person } from '../types';
import { logger } from '../utils/logger';
import { apiRequest } from '../utils/delayedAxios';

const findPeople = async (name: string): Promise<Array<Person>> => {
  // We don't search if key is shorter then 1 character
  if (name.length < 1) {
    return [];
  }
  try {
    // const response = await axios.get<Array<Person>>(`/people/?name=${name}`, apiServices.getAxiosRequestConfigWithToken());
    const response = await apiRequest<Array<Person>, undefined>('get', `/people/?name=${name}`, apiServices.getAxiosRequestConfigWithToken());
    return response.data;
  } catch (error) {
    logger.logError(error);
    return [];
  }
};

const findPersonById = async (id: number): Promise<FullPerson> => {
  // const response = await axios.get<FullPerson>(`/people/${id}`, apiServices.getAxiosRequestConfigWithToken());
  const response = await apiRequest<FullPerson, undefined>('get', `/people/${id}`, apiServices.getAxiosRequestConfigWithToken());
  return response.data;
};

const addNewPerson = async (person: NewPerson): Promise<Person> => {
  const response = await apiRequest<Person, NewPerson>('post', '/people', apiServices.getAxiosRequestConfigWithToken(), person);
  return response.data;
};

export const peopleService = {
  findPeople, findPersonById, addNewPerson
};
