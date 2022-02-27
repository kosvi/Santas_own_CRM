import models from '../models';
import { WishAttributes } from '../types';
import { ControllerError } from '../utils/customError';
import { logger } from '../utils/logger';
import { validateToNumber } from '../utils/validators';
import { addNewItem } from './itemService';

export const addWishToPerson = async (personId: number, itemName: string, description: string): Promise<WishAttributes> => {
  // First make sure item exists in database and get ID for it
  // If error is thrown, controller will handle it and pass it to middleware
  const item = await addNewItem({ name: itemName });
  const wish: WishAttributes = {
    personId: personId,
    itemId: validateToNumber(item.id),
    description: description
  };
  try {
    const newWish = await models.Wish.create(wish);
    return newWish;
  } catch (error) {
    logger.logError(error);
    if (error instanceof Error) {
      if (error.message.includes('wishes_person_id_fkey')) {
        throw new ControllerError(404, 'no person found with given id');
      }
    }
    throw new ControllerError(500, 'Server couldn\'t save the wish');
  }
};