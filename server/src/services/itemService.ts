// import { Op } from 'sequelize';
import { sequelize } from '../utils/db';
import models from '../models';
// import { ControllerError } from '../utils/customError';

export const listMostCommonItems = async (amount: number) => {
  console.log(amount);
  try {
    const items = await models.Wish.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('*')), 'count']
      ],
      include: {
	model: models.Item
      },
      group: 'item.id',
      order: sequelize.literal('count DESC')
    });
    return items;
  } catch (error) {
    if(error instanceof Error) {
      console.error(error.name);
    }
    throw error;
  }
};
