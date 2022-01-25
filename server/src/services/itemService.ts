import { sequelize } from '../utils/db';
import models from '../models';
import { ControllerError } from '../utils/customError';

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
