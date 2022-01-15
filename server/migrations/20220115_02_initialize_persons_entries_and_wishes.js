/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('persons', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
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
    await queryInterface.createTable('entrys', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'persons', key: 'id' }
      },
      niceness: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
    await queryInterface.createTable('items', {
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
    await queryInterface.createTable('wishs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'persons', key: 'id' }
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'items', key: 'id' }
      },
      description: {
        type: DataTypes.TEXT
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('entrys');
    await queryInterface.dropTable('wishs');
    await queryInterface.dropTable('items');
    await queryInterface.dropTable('persons');
  }
};
