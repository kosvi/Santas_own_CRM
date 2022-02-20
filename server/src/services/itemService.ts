import { sequelize } from '../utils/db';
import models from '../models';
import { ControllerError } from '../utils/customError';
import { ItemAttributes } from '../types';
import { logger } from '../utils/logger';

export const listMostCommonItems = async (amount: number) => {
  const limit = amount > 0 ? { limit: amount } : {};
  try {
    const items = await models.Wish.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('*')), 'count']
      ],
      include: {
        model: models.Item
      },
      group: 'item.id',
      order: sequelize.literal('count DESC'),
      ...limit
    });
    return items;
  } catch (error) {
    if (error instanceof Error) {
      throw new ControllerError(500, `something went wrong: ${error.name}`);
    }
    throw error;
  }
};

/*
 * This function adds the item if it doesn't exist. Otherwise it will
 * just return the already existing item from database
 */
export const addNewItem = async (item: ItemAttributes): Promise<ItemAttributes> => {
  try {
    const newItem = await models.Item.create({ name: item.name });
    return newItem;
  } catch (error) {
    // item probably already existed, we will just find & return it instead
    logger.logError(error);
  }
  try {
    const oldItem = await models.Item.findOne({ where: { name: item.name }, rejectOnEmpty: true });
    return oldItem;
  } catch (error) {
    if (error instanceof Error) {
      throw new ControllerError(500, 'Couldn\'t find or add item to database');
    }
    throw error;
  }
};
