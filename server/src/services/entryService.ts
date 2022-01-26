import models from '../models';
import { logger } from '../utils/logger';

const MAX_NUMBER_OF_ENTRIES_RETURNED = 50;

export const getEntriesByPersonId = async (id: number) => {
  const entries = models.Entry.findAndCountAll({
    where: { personId: id }
  });
  return entries;
};

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