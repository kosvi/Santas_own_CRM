/*
 * This service will reset database and populate it with default data found in ../data folder
 * This service should NEVER BE USED IN PRODUCTION ENVIRONMENT
 * -> it's only made for testing purposes to make developing and testien easier
 * 
 * In production environment this service could cause SEVERE HARM!
 */

import Models from '../models';
import { logger } from '../utils/logger';
import { users, groups, people, entries } from '../data';
import { EntryAttributes, GroupAttributes, PersonAttributes, UserAttributes } from '../types';
import { runMigration } from '../utils/db';
import { validateToNumber, validateToString } from '../utils/validators';

// For some reason async await caused mystic problems with this function
// After a re-write to this format, it's working as intended
// I wonder if it had some typo or something??
export const resetDB = () =>
  runMigration('down')
    .then(() => {
      runMigration('up')
        .catch(error => logError(error));
    })
    .catch(error => logError(error));


// This one is for populating the database
// It uses all the functions below it to do it's job. 
export const addData = async (): Promise<boolean> => {
  try {
    const newUsers = await addUsers();
    await addGroups();
    await connectGroupsAndUsers();
    const newPeople = await addPeople();
    await addEntries(newUsers, newPeople);
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

const addGroups = async (): Promise<GroupAttributes[]> => {
  try {
    const createdGroups = await Models.Group.bulkCreate(groups);
    return createdGroups;
  } catch (error) {
    logError(error);
    return [];
  }
};

const connectGroupsAndUsers = async () => {
  try {
    const userSanta = await Models.User.findOne({ where: { username: 'santa' } });
    const userAdmin = await Models.User.findOne({ where: { username: 'admin' } });
    const groupSanta = await Models.Group.findOne({ where: { name: 'santa' } });
    const groupAdmin = await Models.Group.findOne({ where: { name: 'admin' } });
    if (userSanta && groupSanta) {
      await Models.UserGroup.create({ userId: validateToNumber(userSanta.id), groupId: validateToNumber(groupSanta.id) });
    }
    if (userAdmin && groupAdmin) {
      await Models.UserGroup.create({ userId: validateToNumber(userAdmin.id), groupId: validateToNumber(groupAdmin.id) });
    }
  } catch (error) {
    logError(error);
  }
};

const addPeople = async (): Promise<PersonAttributes[]> => {
  try {
    const peopleCreated = await Models.Person.bulkCreate(people);
    return peopleCreated;
  } catch (error) {
    logError(error);
    return [];
  }
};

const addEntries = async (newUsers: UserAttributes[], newPeople: PersonAttributes[]): Promise<EntryAttributes[]> => {
  // Add all entries to first user in the user-table and first person in the people-table
  const userId = validateToNumber(newUsers[0].id);
  const personId = validateToNumber(newPeople[0].id);
  // Remember that 'entries' is in the form of NewEntry and is missing foreign keys, 
  // let's add them first and then add them to database
  const newEntries: EntryAttributes[] = entries.map(e => {
    return {
      ...e,
      userId: userId,
      personId: personId
    };
  });
  try {
    const createdEntries = await Models.Entry.bulkCreate(newEntries);
    return createdEntries;
  } catch (error) {
    logError(error);
    return [];
  }
};

const logError = (error: unknown) => {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    try {
      logger.error(validateToString(error));
    } catch (error) {
      logger.error('unknown error');
    }
  }
};