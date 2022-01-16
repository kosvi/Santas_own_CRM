/*
 * This service will reset database and populate it with default data found in ../data folder
 * This service should NEVER BE USED IN PRODUCTION ENVIRONMENT
 * -> it's only made for testing purposes to make developing and testien easier
 * 
 * In production environment this service could cause SEVERE HARM!
 */

import Models from '../models';
import Logger from '../utils/logger';
import { users, persons, entries } from '../data';
import { EntryAttributes, PersonAttributes, UserAttributes } from '../types';
import { runMigration, sequelize } from '../utils/db';
import { validateToNumber, validateToString } from '../utils/validators';

export const resetDB = async (): Promise<boolean> => {
  try {
    Logger.log('reverting all migrations');
    await runMigration('down');
    Logger.log('removing SequelizeMeta');
    await sequelize.drop();
    Logger.log('running migrations');
    await runMigration('up');
    return true;
  } catch (error) {
    logError(error);
    return false;
  }
};

const addUsers = async (): Promise<UserAttributes[]> => {
  try {
    const createdUsers = await Models.User.bulkCreate(users);
    return createdUsers;
  } catch (error) {
    logError(error);
    return [];
  }
};

const addPersons = async (): Promise<PersonAttributes[]> => {
  try {
    const personsCreated = await Models.Person.bulkCreate(persons);
    return personsCreated;
  } catch (error) {
    logError(error);
    return [];
  }
};

const addEntries = async (newUsers: UserAttributes[], newPersons: PersonAttributes[]): Promise<EntryAttributes[]> => {
  // I am fairly confident here is data and if not, we are still in dev environment after all
  const userId = validateToNumber(newUsers[0].id);
  const personId = validateToNumber(newPersons[0].id);
  try {
    const newEntries = entries.map(e => {
      const newEntry: EntryAttributes = {
        ...e,
        userId: userId,
        personId: personId
      };
      return Models.Entry.create(newEntry);
    });
    await Promise.all(newEntries);
    console.log(newEntries);
    return [];
  } catch (error) {
    logError(error);
    return [];
  }
};

export const addData = async (): Promise<boolean> => {
  try {
    const newUsers = await addUsers();
    const newPersons = await addPersons();
    const newEntries = await addEntries(newUsers, newPersons);
    console.log(newEntries);
    return true;
  } catch (error) {
    logError(error);
    return false;
  }
};

const logError = (error: unknown) => {
  if (error instanceof Error) {
    Logger.error(error.message);
  } else {
    try {
      Logger.error(validateToString(error));
    } catch (error) {
      Logger.error('unknown error');
    }
  }
};