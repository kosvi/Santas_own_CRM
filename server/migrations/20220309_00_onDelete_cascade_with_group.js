/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query();
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query();
  }
};