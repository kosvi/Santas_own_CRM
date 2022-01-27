import models from '../models';
import { logger } from '../utils/logger';
import { EntryAttributes, NewEntry } from '../types';

const MAX_NUMBER_OF_ENTRIES_RETURNED = 50;

export const getLatestEntries = async (amount: number) => {
  try {
    const limit = Number.isNaN(amount) ? { limit: MAX_NUMBER_OF_ENTRIES_RETURNED } : { limit: Math.min(amount, MAX_NUMBER_OF_ENTRIES_RETURNED) };
    const entries = models.Entry.findAll({
      order: [
        ['updated_at', 'DESC']
      ],
      ...limit
    });
    return entries;
  } catch (error) {
    logger.logError(error);
    throw error;
  }
};

export const addNewEntry = async (newEntry: NewEntry): Promise<EntryAttributes> => {
  try {
    const entry = await models.Entry.create(newEntry);
    return entry;
  } catch (error) {
    logger.logError(error);
    throw error;
  }
};
