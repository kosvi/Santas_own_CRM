/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('functionalities', [
      {
        code: 'users',
        name: 'Users'
      },
      {
        code: 'permissions',
        name: 'Groups and permissions'
      },
      {
        code: 'people',
        name: 'People'
      },
      {
        code: 'wishes_and_items',
        name: 'Wishes and items'
      },
      {
        code: 'entries',
        name: 'Entries to person'
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('functionalities', { [Op.or]: [{ code: 'users' }, { code: 'permissions' }, { code: 'people' }, { code: 'wishes_and_items' }, { code: 'entries' }] });
  }
};