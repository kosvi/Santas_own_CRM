/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('groups', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
    await queryInterface.createTable('pages', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    await queryInterface.createTable('permissions', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'groups', key: 'id' }
      },
      page_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'pages', key: 'id' }
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      write: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
    await queryInterface.createTable('usergroups', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'groups', key: 'id' }
      }    
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('usergroups');
    await queryInterface.dropTable('groups');
    await queryInterface.dropTable('pages');
    await queryInterface.dropTable('sessions');
  }
};
