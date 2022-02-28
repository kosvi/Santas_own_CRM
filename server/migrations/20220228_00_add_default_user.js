/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        password: 'password',
        name: 'Admin Elf',
        disabled: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
    await queryInterface.bulkInsert('groups', [
      {
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
    const user = await queryInterface.sequelize.query('SELECT id FROM users WHERE username = ?', { replacements: ['admin'], type: queryInterface.sequelize.QueryTypes.SELECT });
    const group = await queryInterface.sequelize.query('SELECT id FROM groups WHERE name = ?', { replacements: ['admin'], type: queryInterface.sequelize.QueryTypes.SELECT });
    const functionality = await queryInterface.sequelize.query('SELECT id FROM functionalities WHERE code = ?', { replacements: ['permissions'], type: queryInterface.sequelize.QueryTypes.SELECT });
    await queryInterface.bulkInsert('usergroups', [
      {
        user_id: user[0].id,
        group_id: group[0].id
      }
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        group_id: group[0].id,
        functionality_id: functionality[0].id,
        read: true,
        write: true
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('usergroups', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('groups', null, {});
  }
};