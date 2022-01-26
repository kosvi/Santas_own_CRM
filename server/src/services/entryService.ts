import models from '../models';

export const getEntriesByPersonId = async (id: number) => {
  const entries = models.Entry.findAndCountAll({
    where: { personId: id }
  });
  return entries;
};

